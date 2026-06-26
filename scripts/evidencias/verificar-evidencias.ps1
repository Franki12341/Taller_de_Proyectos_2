param()
$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$evidenceRoot = Join-Path $repoRoot "docs\cierre\evidencias"
$reportPath = Join-Path $evidenceRoot "99_validacion_evidencias.md"
$files = Get-ChildItem $evidenceRoot -Recurse -File
$empty = $files | Where-Object { $_.Length -eq 0 }
$jsonInvalid = @()
foreach ($file in ($files | Where-Object { $_.Extension -eq ".json" })) {
  try { Get-Content $file.FullName -Raw | ConvertFrom-Json | Out-Null } catch { $jsonInvalid += $file.FullName }
}
$secretHits = @()
$scanTargets = @("sonar.token=", "DATABASE_URL=postgres://", "SONAR_TOKEN=")
foreach ($file in $files) {
  $raw = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
  foreach ($pattern in $scanTargets) {
    if ($raw -and $raw.Contains($pattern)) { $secretHits += "$($file.FullName) => $pattern" }
  }
}
$synthetic = $files | Where-Object { $_.FullName -match '\\simulacion\\' }
$md = @"
# Validación de evidencias

- Fecha: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
- Evidencias generadas: $($files.Count)
- Evidencias con datos sintéticos: $($synthetic.Count)
- Archivos vacíos: $($empty.Count)
- JSON inválidos: $($jsonInvalid.Count)
- Secretos detectados en evidencias: $($secretHits.Count)

## Resultado final

$(if ($empty.Count -eq 0 -and $jsonInvalid.Count -eq 0 -and $secretHits.Count -eq 0) { "Verificación técnica completada sin hallazgos bloqueantes en los artefactos generados." } else { "La verificación detectó observaciones que deben revisarse antes de la entrega." })

## Observaciones

$(if ($jsonInvalid.Count) { ($jsonInvalid | ForEach-Object { "- JSON inválido: $_" }) -join "`n" } else { "- No se detectaron JSON inválidos." })
$(if ($secretHits.Count) { ($secretHits | ForEach-Object { "- Posible secreto: $_" }) -join "`n" } else { "- No se detectaron patrones de secretos en las evidencias." })
"@
Set-Content $reportPath $md -Encoding UTF8
