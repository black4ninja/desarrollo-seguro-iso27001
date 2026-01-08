# Lab 4.3: Gestión de Secretos (60 min)

## 🎯 Objetivo
Migrar de hardcoded secrets a User Secrets (dev) y Key Vault (prod).

## 📋 Actividades

### Parte 1: Detectar Secretos Hardcodeados (15 min)
```bash
# Usar TruffleHog
docker run --rm -v "$PWD:/src" \
  trufflesecurity/trufflehog:latest \
  filesystem /src
```

### Parte 2: User Secrets (Desarrollo) (15 min)
```bash
dotnet user-secrets init
dotnet user-secrets set "Jwt:Key" "my-secret-key"
dotnet user-secrets set "ConnectionStrings:Default" "Server=..."
```

```csharp
// Acceder
var jwtKey = builder.Configuration["Jwt:Key"];
```

### Parte 3: Environment Variables (Testing) (15 min)
```bash
export JWT_KEY="my-test-key"
export CONNECTION_STRING="Server=..."
```

### Parte 4: Azure Key Vault (Producción) (15 min)
```csharp
builder.Configuration.AddAzureKeyVault(
    new Uri("https://myvault.vault.azure.net/"),
    new DefaultAzureCredential());
```

## 📦 Entregables
- Código sin secretos hardcodeados
- .gitignore actualizado
- User secrets configurados
- Documentación de Key Vault setup

## 🔗 Mapeo
- ISO 27002:2022 Control 8.24 (Use of cryptography)
- CWE-798 (Hard-coded credentials)
