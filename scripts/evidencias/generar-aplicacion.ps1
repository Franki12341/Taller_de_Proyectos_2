param([switch]$UseSyntheticData,[switch]$KeepServicesRunning)
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$appRoot = Join-Path $repoRoot "smartsched-uc"
$evidenceDir = Join-Path $repoRoot "docs\cierre\evidencias\aplicacion"
$simDir = Join-Path $evidenceDir "simulacion"
New-Item -ItemType Directory -Force -Path $evidenceDir, $simDir | Out-Null
$node = (Get-Command node).Source

function Wait-HttpReady {
  param([string]$Url,[int]$Retries = 45,[int]$DelaySeconds = 2)
  for ($i = 0; $i -lt $Retries; $i++) {
    try {
      $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 5
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) { return $true }
    } catch {}
    Start-Sleep -Seconds $DelaySeconds
  }
  return $false
}

function Write-EvidenceMd {
  param(
    [string]$Code,
    [string]$Title,
    [string]$Scenario,
    [string]$Action,
    [string]$Expected,
    [string]$Obtained,
    [string]$Requirement,
    [string]$TestCode,
    [string]$Status,
    [string]$DataLabel,
    [string]$TargetDir
  )
  $content = @"
# $Code — $Title

- Fecha: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
- Módulo: Aplicación web
- Escenario: $Scenario
- Datos utilizados: $DataLabel
- Acción realizada: $Action
- Resultado esperado: $Expected
- Resultado obtenido: $Obtained
- Requisito relacionado: $Requirement
- Prueba relacionada: $TestCode
- Estado: $Status
- Alcance: evidencia funcional para SmartSched-UC; no representa una matrícula institucional real.
"@
  Set-Content -Path (Join-Path $TargetDir "$Code.md") -Value $content -Encoding UTF8
}

$serverOut = Join-Path $appRoot "server-evidence.out.log"
$serverErr = Join-Path $appRoot "server-evidence.err.log"
$clientOut = Join-Path $appRoot "client-evidence.out.log"
$clientErr = Join-Path $appRoot "client-evidence.err.log"
$serverProcess = Start-Process -FilePath $node -ArgumentList "src/app.js" -WorkingDirectory (Join-Path $appRoot "server") -RedirectStandardOutput $serverOut -RedirectStandardError $serverErr -WindowStyle Hidden -PassThru
$env:BROWSER = "none"
$clientScript = Join-Path $appRoot "client\node_modules\react-scripts\bin\react-scripts.js"
$clientProcess = Start-Process -FilePath $node -ArgumentList $clientScript, "start" -WorkingDirectory (Join-Path $appRoot "client") -RedirectStandardOutput $clientOut -RedirectStandardError $clientErr -WindowStyle Hidden -PassThru

try {
  if (-not (Wait-HttpReady -Url "http://127.0.0.1:5000/api/health")) { throw "Backend no disponible para evidencias de aplicación." }
  if (-not (Wait-HttpReady -Url "http://127.0.0.1:3000")) { throw "Frontend no disponible para evidencias de aplicación." }

  $health = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/health" -TimeoutSec 10
  $syntheticMode = $UseSyntheticData -or $health.usingFallback -or $health.database -ne "postgresql"
  $targetDir = if ($syntheticMode) { $simDir } else { $evidenceDir }
  $dataLabel = if ($syntheticMode) { "MODO DEMOSTRACIÓN — DATOS SINTÉTICOS" } else { "Datos servidos desde PostgreSQL según /api/health" }
  $statusLabel = if ($syntheticMode) { "Verificado con datos sintéticos" } else { "Verificado" }

  $obs = Join-Path $targetDir "aplicacion-observations.json"
  $res = Join-Path $targetDir "resiliencia-observations.json"
  & $node (Join-Path $repoRoot "e2e\evidencias\aplicacion.spec.js") --baseUrl=http://127.0.0.1:3000 --outputDir=$targetDir --reportPath=$obs
  if ($LASTEXITCODE -ne 0) { throw "Falló la captura principal de la aplicación." }
  & $node (Join-Path $repoRoot "e2e\evidencias\resiliencia.spec.js") --baseUrl=http://127.0.0.1:3000 --outputDir=$targetDir --reportPath=$res
  if ($LASTEXITCODE -ne 0) { throw "Falló la captura de resiliencia." }

  $obsData = Get-Content $obs -Raw | ConvertFrom-Json
  $map = @(
    @{ Code = "EV-APP-01-pantalla-principal"; Title = "Pantalla principal"; Scenario = "Carga inicial del tablero"; Action = "Abrir la aplicación"; Expected = "Se muestra SmartSched-UC y navegación"; Obtained = "Captura generada de la pantalla principal."; Requirement = "RF-01"; TestCode = "PRB-12" },
    @{ Code = "EV-APP-02-listado-cursos"; Title = "Listado de asignaturas"; Scenario = "Visualización de cursos"; Action = "Ingresar a Proyecciones"; Expected = "Se muestra el listado de asignaturas"; Obtained = "Captura generada del listado de cursos."; Requirement = "RF-01"; TestCode = "PRB-12" },
    @{ Code = "EV-APP-03-seleccion-cursos"; Title = "Selección de cursos"; Scenario = "Detalle de horarios"; Action = "Presionar Ver horarios"; Expected = "Se habilita la selección de sección"; Obtained = "Captura generada tras abrir horarios del curso."; Requirement = "RF-02"; TestCode = "PRB-01" },
    @{ Code = "EV-APP-04-horario-generado"; Title = "Horario generado"; Scenario = "Generación automática"; Action = "Solicitar horario óptimo"; Expected = "Se genera una propuesta visible en la grilla"; Obtained = $obsData.horario; Requirement = "RF-03"; TestCode = "PRB-04" },
    @{ Code = "EV-APP-05-creditos-seleccionados"; Title = "Créditos seleccionados"; Scenario = "Resumen de créditos"; Action = "Agregar un curso al resumen"; Expected = "Se actualiza la cabecera con créditos"; Obtained = $obsData.creditosSeleccionados; Requirement = "RF-04"; TestCode = "PRB-05" },
    @{ Code = "EV-APP-06-conflicto-horario"; Title = "Conflicto horario"; Scenario = "Resiliencia demostrativa"; Action = "Simular cruce de horario"; Expected = "Se registra el conflicto y se notifica"; Obtained = "La vista de demostración mostró el caso de conflicto."; Requirement = "RF-05"; TestCode = "PRB-01" },
    @{ Code = "EV-APP-07-capacidad-aula"; Title = "Capacidad de aula"; Scenario = "Resiliencia demostrativa"; Action = "Simular aula sobreocupada"; Expected = "Se evidencia el riesgo por aforo"; Obtained = "La vista de demostración mostró el caso de aula sobreocupada."; Requirement = "RF-08"; TestCode = "PRB-10" },
    @{ Code = "EV-APP-08-notificacion"; Title = "Notificación del sistema"; Scenario = "Retroalimentación al usuario"; Action = "Simular un caso demostrativo"; Expected = "Se muestra una notificación visible"; Obtained = "Se capturó la notificación dentro del tablero."; Requirement = "RF-11"; TestCode = "PRB-12" },
    @{ Code = "EV-APP-09-resumen-matricula"; Title = "Resumen de matrícula"; Scenario = "Resumen académico"; Action = "Abrir la pestaña Resumen"; Expected = "Se visualizan cursos agregados y estado"; Obtained = "Captura generada del resumen de matrícula."; Requirement = "RF-12"; TestCode = "PRB-12" },
    @{ Code = "EV-APP-10-modo-demostracion"; Title = "Modo demostración"; Scenario = "Vista docente"; Action = "Abrir Modo demostración"; Expected = "Se muestran auditoría, notificaciones y casos"; Obtained = $obsData.demo; Requirement = "RF-13"; TestCode = "PRB-12" }
  )

  foreach ($item in $map) {
    $png = Join-Path $targetDir ($item.Code + ".png")
    if (Test-Path $png) {
      Write-EvidenceMd -Code $item.Code -Title $item.Title -Scenario $item.Scenario -Action $item.Action -Expected $item.Expected -Obtained $item.Obtained -Requirement $item.Requirement -TestCode $item.TestCode -Status $statusLabel -DataLabel $dataLabel -TargetDir $targetDir
    }
  }
} finally {
  if (-not $KeepServicesRunning) {
    if ($serverProcess -and (Get-Process -Id $serverProcess.Id -ErrorAction SilentlyContinue)) { Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($clientProcess -and (Get-Process -Id $clientProcess.Id -ErrorAction SilentlyContinue)) { Stop-Process -Id $clientProcess.Id -Force -ErrorAction SilentlyContinue }
  }
}
