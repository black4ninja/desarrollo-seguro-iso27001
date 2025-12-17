# Lab 4.1: Security Gates en CI/CD Pipeline (90 min)

## 🎯 Objetivo
Implementar un pipeline CI/CD completo con security gates usando GitHub Actions.

## 📋 Actividades

### Parte 1: Setup (10 min)
- Fork repositorio de ejemplo
- Configurar secrets (SONAR_TOKEN)
- Habilitar GitHub Actions

### Parte 2: Secret Scanning (15 min)
```yaml
- name: TruffleHog Secret Scan
  uses: trufflesecurity/trufflehog@main
```

### Parte 3: SAST con SonarCloud (20 min)
```yaml
- uses: SonarSource/sonarcloud-github-action@master
  with:
    args: -Dsonar.qualitygate.wait=true
```

### Parte 4: SCA con Dependency-Check (15 min)
```yaml
- uses: dependency-check/Dependency-Check_Action@main
  with:
    args: --failOnCVSS 7
```

### Parte 5: DAST con OWASP ZAP (20 min)
```yaml
- uses: zaproxy/action-baseline@v0.7.0
  with:
    target: 'http://localhost:5000'
    fail_action: true
```

### Parte 6: Verificar Quality Gates (10 min)
- Intentar commit con vulnerabilidad → Build falla ✅
- Corregir → Build pasa ✅

## 📦 Entregables
- `.github/workflows/security-pipeline.yml`
- Screenshot de build fallido
- Screenshot de build exitoso

## 🔗 Mapeo
- ISO 27002:2022 Control 8.32 (Change management)
- OWASP SAMM: Build & Deployment Security
