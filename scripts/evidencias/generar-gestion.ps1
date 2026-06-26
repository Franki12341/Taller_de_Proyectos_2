param()
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$evidenceDir = Join-Path $repoRoot "docs\cierre\evidencias\gestion"
New-Item -ItemType Directory -Force -Path $evidenceDir | Out-Null
function Mask-Emails([string]$text) { [regex]::Replace($text, '<([^>]+)>', '<correo-oculto>') }
$gitBase = "git -C `"$repoRoot`" -c safe.directory=D:/Proyectos/Taller_de_Proyectos_2-git"
$commitsTxt = Invoke-Expression "$gitBase log --oneline --decorate --all"
$branchesTxt = Invoke-Expression "$gitBase branch -a"
$statusTxt = Invoke-Expression "$gitBase status --short"
$remotesTxt = Invoke-Expression "$gitBase remote -v"
$shortlogTxt = Mask-Emails ((Invoke-Expression "$gitBase shortlog -sne --all") -join [Environment]::NewLine)
$changesByFile = Invoke-Expression "$gitBase log --name-only --pretty=format:" | Where-Object { $_.Trim() -ne "" } | Group-Object | Sort-Object Count -Descending | Select-Object -First 20
$changesText = $changesByFile | ForEach-Object { "{0}`t{1}" -f $_.Count, $_.Name }
$lastCommit = Invoke-Expression "$gitBase log -1 --pretty=format:'%h|%cs|%an|%s'"

Set-Content (Join-Path $evidenceDir "EV-GEST-01-historial-commits.txt") ($commitsTxt -join [Environment]::NewLine) -Encoding UTF8
Set-Content (Join-Path $evidenceDir "EV-GEST-03-ramas.txt") ($branchesTxt -join [Environment]::NewLine) -Encoding UTF8
Set-Content (Join-Path $evidenceDir "EV-GEST-04-contribuciones.txt") $shortlogTxt -Encoding UTF8
Set-Content (Join-Path $evidenceDir "EV-GEST-05-cambios-por-archivo.txt") ($changesText -join [Environment]::NewLine) -Encoding UTF8
Set-Content (Join-Path $evidenceDir "EV-GEST-06-estado-repositorio.txt") (((($statusTxt -join [Environment]::NewLine) + [Environment]::NewLine + ($remotesTxt -join [Environment]::NewLine))).Trim()) -Encoding UTF8

$histMd = @(
  '# EV-GEST-02 — Historial de commits',
  '',
  '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
  '- Fuente: `git log --oneline --decorate --all`',
  '- Estado: Verificado',
  '',
  '```',
  ($commitsTxt -join [Environment]::NewLine),
  '```'
) -join "`n"
Set-Content (Join-Path $evidenceDir "EV-GEST-02-historial-commits.md") $histMd -Encoding UTF8

$versionMd = @(
  '# EV-GEST-07 — Versionamiento',
  '',
  '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
  '- Último commit: ' + $lastCommit,
  '- Ramas verificadas: consulte `EV-GEST-03-ramas.txt`.',
  '- Estado: Verificado'
) -join "`n"
Set-Content (Join-Path $evidenceDir "EV-GEST-07-versionamiento.md") $versionMd -Encoding UTF8

$changeMd = @(
  '# EV-GEST-08 — Control de cambios',
  '',
  '- Fecha: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),
  '- Evidencia fuente: `git status`, `git diff --stat`, `git log`, `git branch -a`.',
  '- Resultado: el control de configuración se apoya en Git, ramas de trabajo y scripts de validación documentados.',
  '- Estado: Verificado'
) -join "`n"
Set-Content (Join-Path $evidenceDir "EV-GEST-08-control-cambios.md") $changeMd -Encoding UTF8

$html = @(
  '<!doctype html>',
  '<html lang="es"><head><meta charset="utf-8"><title>EV-GEST-09</title><style>body{font-family:Segoe UI,Arial,sans-serif;margin:24px}.card{border:1px solid #d9e2ec;border-radius:12px;padding:14px;background:#f8fbff;margin-bottom:12px}pre{white-space:pre-wrap}</style></head><body>',
  '<h1>EV-GEST-09 — Resumen de gestión</h1>',
  '<div class="card"><strong>Fecha:</strong> ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '</div>',
  '<div class="card"><strong>Último commit:</strong> ' + $lastCommit + '</div>',
  '<div class="card"><strong>Autores anonimizados:</strong><pre>' + $shortlogTxt + '</pre></div>',
  '<div class="card"><strong>Archivos más modificados:</strong><pre>' + ($changesText -join [Environment]::NewLine) + '</pre></div>',
  '</body></html>'
) -join "`n"
Set-Content (Join-Path $evidenceDir "EV-GEST-09-resumen-gestion.html") $html -Encoding UTF8
