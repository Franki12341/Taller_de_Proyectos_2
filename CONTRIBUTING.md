# Contribucion

## Comando principal

```powershell
npm test
```

Este comando ejecuta:

- pruebas del backend;
- pruebas del frontend.

## Validacion completa

```powershell
npm run quality:full
```

Este comando ejecuta:

- pruebas del backend;
- pruebas del frontend;
- build del frontend.

## Flujo Git

```powershell
git status
git add .
git commit -m "tipo(alcance): descripcion"
git push origin nombre-rama
```

Hooks y validaciones:

- `pre-commit` ejecuta `npm test`;
- `commit-msg` valida Conventional Commits;
- `pre-push` ejecuta `npm run quality:full`;
- GitHub Actions repite la validacion.
