param()
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$evidenceDir = Join-Path $repoRoot "docs\cierre\evidencias\sonarqube"
$sonarStart = "C:\Users\franc\Downloads\sonarqube-26.6.0.123539\sonarqube-26.6.0.123539\bin\windows-x86-64\StartSonar.bat"
New-Item -ItemType Directory -Force -Path $evidenceDir | Out-Null

function Get-SonarStatus {
  try { return Invoke-RestMethod -Uri "http://localhost:9000/api/system/status" -TimeoutSec 10 } catch { return $null }
}

$status = Get-SonarStatus
if (-not $status -and (Test-Path $sonarStart)) {
  Start-Process -FilePath $sonarStart -WindowStyle Hidden | Out-Null
  for ($i = 0; $i -lt 90; $i++) {
    Start-Sleep -Seconds 2
    $status = Get-SonarStatus
    if ($status -and $status.status -eq 'UP') { break }
  }
}

if ($status) {
  $status | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $evidenceDir 'EV-SONAR-01-system-status.json') -Encoding UTF8
} else {
  @{ status = 'UNAVAILABLE'; checkedAt = (Get-Date).ToString('s'); detail = 'No fue posible obtener /api/system/status' } | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $evidenceDir 'EV-SONAR-01-system-status.json') -Encoding UTF8
}

if (-not $env:SONAR_TOKEN) {
  @{ status = 'PENDING'; reason = 'SONAR_TOKEN_MISSING' } | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $evidenceDir 'EV-SONAR-02-metricas.json') -Encoding UTF8
  @('metrica,valor_real,interpretacion','status,,SONAR_TOKEN ausente; métricas no consultadas') | Set-Content (Join-Path $evidenceDir 'EV-SONAR-03-metricas.csv') -Encoding UTF8
  @{ status = 'PENDING'; reason = 'SONAR_TOKEN_MISSING' } | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $evidenceDir 'EV-SONAR-05-issues.json') -Encoding UTF8
  @{ status = 'PENDING'; reason = 'SONAR_TOKEN_MISSING' } | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $evidenceDir 'EV-SONAR-06-security-hotspots.json') -Encoding UTF8
  @{ status = 'PENDING'; reason = 'SONAR_TOKEN_MISSING' } | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $evidenceDir 'EV-SONAR-07-actividad.json') -Encoding UTF8
  'Scanner no ejecutado: SONAR_TOKEN no definido en el entorno.' | Set-Content (Join-Path $evidenceDir 'EV-SONAR-09-ejecucion-scanner.txt') -Encoding UTF8
  $summary = @(
    '# EV-SONAR-04 — Resumen SonarQube',
    '',
    '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
    '- Estado del servidor: ' + $(if ($status) { $status.status } else { 'No disponible' }),
    '- Token: No disponible en variables de entorno',
    '- Resultado: solo se generó evidencia real de disponibilidad del servicio.',
    '- Pendiente: [PENDIENTE MANUAL: capturar las pantallas de SonarQube]',
    '',
    '| Métrica | Valor real | Interpretación | Evidencia |',
    '| --- | ---: | --- | --- |',
    ('| Estado del sistema | {0} | Verificación de disponibilidad de SonarQube | EV-SONAR-01 |' -f $(if ($status) { $status.status } else { 'No disponible' })),
    '| Métricas del proyecto | [PENDIENTE MANUAL: definir SONAR_TOKEN] | La API requiere autenticación | EV-SONAR-02 |'
  ) -join "`n"
  Set-Content (Join-Path $evidenceDir 'EV-SONAR-04-resumen.md') $summary -Encoding UTF8
} else {
  'Scanner pendiente de implementación completa con SONAR_TOKEN presente.' | Set-Content (Join-Path $evidenceDir 'EV-SONAR-09-ejecucion-scanner.txt') -Encoding UTF8
  $summary = @(
    '# EV-SONAR-04 — Resumen SonarQube',
    '',
    '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
    '- Estado del servidor: ' + $(if ($status) { $status.status } else { 'No disponible' }),
    '- Token: Disponible en entorno',
    '- Resultado: [PENDIENTE MANUAL: ejecutar scanner y recopilar métricas autenticadas]'
  ) -join "`n"
  Set-Content (Join-Path $evidenceDir 'EV-SONAR-04-resumen.md') $summary -Encoding UTF8
}

$html = @(
  '<!doctype html>',
  '<html lang="es"><head><meta charset="utf-8"><title>EV-SONAR-08</title><style>body{font-family:Segoe UI,Arial,sans-serif;margin:24px}.card{border:1px solid #d9e2ec;border-radius:12px;padding:14px;background:#f8fbff;margin-bottom:12px}</style></head><body>',
  '<h1>EV-SONAR-08 — Reporte SonarQube</h1>',
  '<div class="card"><strong>Fecha:</strong> ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '</div>',
  '<div class="card"><strong>Estado del servidor:</strong> ' + $(if ($status) { $status.status } else { 'No disponible' }) + '</div>',
  '<div class="card"><strong>Token:</strong> ' + $(if ($env:SONAR_TOKEN) { 'Disponible' } else { 'Ausente' }) + '</div>',
  '<div class="card"><strong>Observación:</strong> No se generan métricas autenticadas sin credenciales de entorno.</div>',
  '</body></html>'
) -join "`n"
Set-Content (Join-Path $evidenceDir 'EV-SONAR-08-reporte.html') $html -Encoding UTF8
