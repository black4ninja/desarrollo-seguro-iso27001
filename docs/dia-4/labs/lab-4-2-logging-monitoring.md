# Lab 4.2: Logging y Monitoring de Seguridad (60 min)

## 🎯 Objetivo
Implementar logging estructurado de eventos de seguridad con Serilog y Application Insights.

## 📋 Actividades

### Parte 1: Setup Serilog (15 min)
```bash
dotnet add package Serilog.AspNetCore
dotnet add package Serilog.Sinks.ApplicationInsights
```

```csharp
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/security-.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();
```

### Parte 2: Security Events (20 min)
```csharp
public void LogLoginFailure(string email, string ip)
{
    _logger.LogWarning(
        "Login failed for {Email} from {IpAddress}",
        email, ip);
}
```

Implementar:
- Login success/failure
- Access denied
- Privilege escalation attempt
- Suspicious activity

### Parte 3: Testing (15 min)
- Generar eventos de seguridad
- Verificar logs en archivo
- Query en Application Insights (si disponible)

### Parte 4: Alertas (10 min)
- Configurar alerta de brute force (>5 intentos fallidos)

## 📦 Entregables
- Código con Serilog configurado
- Logs generados con eventos de seguridad
- KQL query para detectar brute force

## 🔗 Mapeo
- ISO 27002:2022 Control 8.16 (Monitoring activities)
