param([switch]$UseSyntheticData)
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$appRoot = Join-Path $repoRoot "smartsched-uc"
$evidenceDir = Join-Path $repoRoot "docs\cierre\evidencias\base-datos"
$simDir = Join-Path $evidenceDir "simulacion"
New-Item -ItemType Directory -Force -Path $evidenceDir, $simDir | Out-Null
$node = (Get-Command node).Source

function Wait-Health {
  for ($i = 0; $i -lt 30; $i++) {
    try { return Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/health" -TimeoutSec 5 } catch { Start-Sleep -Seconds 2 }
  }
  throw "No fue posible obtener /api/health."
}

$serverOut = Join-Path $appRoot "server-db-evidence.out.log"
$serverErr = Join-Path $appRoot "server-db-evidence.err.log"
$serverProcess = Start-Process -FilePath $node -ArgumentList "src/app.js" -WorkingDirectory (Join-Path $appRoot "server") -RedirectStandardOutput $serverOut -RedirectStandardError $serverErr -WindowStyle Hidden -PassThru

try {
  $health = Wait-Health
  $isRealPg = $health.database -eq "postgresql" -and -not $health.usingFallback -and -not $UseSyntheticData
  $label = if ($isRealPg) { "Conexión PostgreSQL real verificada mediante /api/health" } else { "SIMULACIÓN DEMOSTRATIVA — NO REPRESENTA UNA CONEXIÓN POSTGRESQL REAL" }

  $health | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $evidenceDir "EV-DB-01-api-health.json") -Encoding UTF8
  $healthMd = @(
    '# EV-DB-01 — Estado de la API y base de datos',
    '',
    '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
    '- Estado API: ' + $health.status,
    '- Base de datos reportada: ' + $health.database,
    '- PostgreSQL habilitado: ' + $health.postgresEnabled,
    '- Fallback activo: ' + $health.usingFallback,
    '- Evidencia fuente: `EV-DB-01-api-health.json`'
  ) -join "`n"
  Set-Content (Join-Path $evidenceDir "EV-DB-01-api-health.md") $healthMd -Encoding UTF8

  & $node (Join-Path $appRoot "server\src\database\test-db.js") *> (Join-Path $evidenceDir "EV-DB-02-conexion-postgresql.txt")

  if ($isRealPg) {
    $inspectRaw = & $node (Join-Path $appRoot "server\src\database\inspect-schema.js") 2>&1
    $inspectText = ($inspectRaw | Out-String)
    Set-Content (Join-Path $evidenceDir "EV-DB-03-esquema-tablas.txt") $inspectText -Encoding UTF8
    $counts = [ordered]@{
      students = if ($health.counts.students -ne $null) { $health.counts.students } else { 'N/D' }
      courses = if ($health.counts.courses -ne $null) { $health.counts.courses } else { 'N/D' }
      teachers = if ($health.counts.teachers -ne $null) { $health.counts.teachers } else { 'N/D' }
      classrooms = if ($health.counts.classrooms -ne $null) { $health.counts.classrooms } else { 'N/D' }
    }
    $csvLines = @('tabla,total') + ($counts.GetEnumerator() | ForEach-Object { "$($_.Key),$($_.Value)" })
    Set-Content (Join-Path $evidenceDir "EV-DB-04-conteo-registros.csv") $csvLines -Encoding UTF8
    $integrityMd = @(
      '# EV-DB-05 — Integridad de datos',
      '',
      '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
      '- Estado: Verificado',
      '- Resultado: la API reportó PostgreSQL sin fallback y el esquema pudo inspeccionarse.',
      ('- Conteos verificados: cursos={0}, docentes={1}, aulas={2}, estudiantes={3}' -f $health.counts.courses, $health.counts.teachers, $health.counts.classrooms, $health.counts.students),
      '- Observación: no se exportan datos personales; solo conteos y estructura.'
    ) -join "`n"
    Set-Content (Join-Path $evidenceDir "EV-DB-05-integridad-datos.md") $integrityMd -Encoding UTF8
  } else {
    $fallbackMd = @(
      '# EV-DB-06 — Fallback y modo demostración',
      '',
      $label,
      '',
      '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
      '- Base reportada por /api/health: ' + $health.database,
      '- Fallback activo: ' + $health.usingFallback,
      '- Estado: Verificado con datos sintéticos',
      '- Alcance: la API siguió operativa aun sin una conexión PostgreSQL verificable para esta evidencia.'
    ) -join "`n"
    Set-Content (Join-Path $evidenceDir "EV-DB-06-fallback.md") $fallbackMd -Encoding UTF8
  }

  $html = @(
    '<!doctype html>',
    '<html lang="es"><head><meta charset="utf-8"><title>EV-DB-07</title><style>body{font-family:Segoe UI,Arial,sans-serif;margin:24px}.card{border:1px solid #d9e2ec;border-radius:12px;padding:16px;background:#f8fbff;margin-bottom:12px}</style></head>',
    '<body>',
    '<h1>EV-DB-07 — Reporte de base de datos</h1>',
    '<div class="card"><strong>Fecha:</strong> ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '</div>',
    '<div class="card"><strong>Estado API:</strong> ' + $health.status + '</div>',
    '<div class="card"><strong>Base de datos:</strong> ' + $health.database + '</div>',
    '<div class="card"><strong>Fallback:</strong> ' + $health.usingFallback + '</div>',
    ('<div class="card"><strong>Cursos:</strong> {0} · <strong>Docentes:</strong> {1} · <strong>Aulas:</strong> {2} · <strong>Estudiantes:</strong> {3}</div>' -f $health.counts.courses, $health.counts.teachers, $health.counts.classrooms, $health.counts.students),
    '<div class="card"><strong>Observación:</strong> ' + $label + '</div>',
    '</body></html>'
  ) -join "`n"
  Set-Content (Join-Path $evidenceDir "EV-DB-07-reporte-base-datos.html") $html -Encoding UTF8
} finally {
  if ($serverProcess -and (Get-Process -Id $serverProcess.Id -ErrorAction SilentlyContinue)) { Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue }
}
