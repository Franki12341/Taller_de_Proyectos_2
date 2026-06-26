param([switch]$SkipApplication,[switch]$SkipDatabase,[switch]$SkipSonar,[switch]$UseSyntheticData,[switch]$KeepServicesRunning)
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$requiredPaths = @(
  (Join-Path $repoRoot "smartsched-uc\client"),
  (Join-Path $repoRoot "smartsched-uc\server"),
  (Join-Path $repoRoot "docs\cierre\evidencias")
)
foreach ($path in $requiredPaths) {
  if (-not (Test-Path $path)) { throw "Ruta requerida no encontrada: $path" }
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Node.js no está disponible en PATH." }
if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) { throw "npm.cmd no está disponible en PATH." }

$evidenceDirs = @(
  "docs\cierre\evidencias\aplicacion",
  "docs\cierre\evidencias\aplicacion\simulacion",
  "docs\cierre\evidencias\base-datos",
  "docs\cierre\evidencias\base-datos\simulacion",
  "docs\cierre\evidencias\gestion",
  "docs\cierre\evidencias\sonarqube"
) | ForEach-Object { Join-Path $repoRoot $_ }
New-Item -ItemType Directory -Force -Path $evidenceDirs | Out-Null

PowerShell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "generar-gestion.ps1")
if (-not $SkipApplication) {
  $args = @()
  if ($UseSyntheticData) { $args += "-UseSyntheticData" }
  if ($KeepServicesRunning) { $args += "-KeepServicesRunning" }
  PowerShell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "generar-aplicacion.ps1") @args
}
if (-not $SkipDatabase) {
  $args = @()
  if ($UseSyntheticData) { $args += "-UseSyntheticData" }
  PowerShell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "generar-base-datos.ps1") @args
}
if (-not $SkipSonar) {
  PowerShell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "generar-sonarqube.ps1")
}

node (Join-Path $PSScriptRoot "capture-local.js") --target=file:///$((Join-Path $repoRoot 'docs\cierre\evidencias\gestion\EV-GEST-09-resumen-gestion.html').Replace('\','/')) --output=$((Join-Path $repoRoot 'docs\cierre\evidencias\gestion\EV-GEST-09-resumen-gestion.png'))
if (Test-Path (Join-Path $repoRoot "docs\cierre\evidencias\base-datos\EV-DB-07-reporte-base-datos.html")) {
  node (Join-Path $PSScriptRoot "capture-local.js") --target=file:///$((Join-Path $repoRoot 'docs\cierre\evidencias\base-datos\EV-DB-07-reporte-base-datos.html').Replace('\','/')) --output=$((Join-Path $repoRoot 'docs\cierre\evidencias\base-datos\EV-DB-07-reporte-base-datos.png'))
}
if (Test-Path (Join-Path $repoRoot "docs\cierre\evidencias\sonarqube\EV-SONAR-08-reporte.html")) {
  node (Join-Path $PSScriptRoot "capture-local.js") --target=file:///$((Join-Path $repoRoot 'docs\cierre\evidencias\sonarqube\EV-SONAR-08-reporte.html').Replace('\','/')) --output=$((Join-Path $repoRoot 'docs\cierre\evidencias\sonarqube\EV-SONAR-08-reporte.png'))
}
node (Join-Path $PSScriptRoot "generar-manifiesto.js")
PowerShell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "verificar-evidencias.ps1")
Write-Host "Evidencias generadas en docs/cierre/evidencias" -ForegroundColor Green
