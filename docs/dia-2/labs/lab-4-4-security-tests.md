# Lab 4.4: Security Unit Tests (60 min)

## 🎯 Objetivo
Escribir tests unitarios que validen controles de seguridad.

## 📋 Actividades

### Parte 1: Setup Testing Framework (10 min)
```bash
dotnet add package xUnit
dotnet add package Moq
dotnet add package FluentAssertions
```

### Parte 2: Authorization Tests (15 min)
```csharp
[Fact]
[Trait("Category", "Security")]
public void GetOrder_UserCanOnlyAccessOwnOrders()
{
    // Arrange
    var user1Id = 1;
    var user2OrderId = 999;

    // Act
    var result = _controller.GetOrder(user2OrderId);

    // Assert
    result.Should().BeOfType<NotFoundResult>();
}
```

### Parte 3: Input Validation Tests (15 min)
```csharp
[Theory]
[InlineData("admin' OR '1'='1--")]
[InlineData("<script>alert('xss')</script>")]
[InlineData("../../../etc/passwd")]
[Trait("Category", "Security")]
public void Search_RejectsInjectionAttempts(string maliciousInput)
{
    // Act
    var result = _controller.Search(maliciousInput);

    // Assert
    result.Should().BeOfType<BadRequestResult>();
}
```

### Parte 4: Cryptography Tests (10 min)
```csharp
[Fact]
[Trait("Category", "Security")]
public void HashPassword_UsesSecureAlgorithm()
{
    var password = "TestPassword123!";
    var hash = _authService.HashPassword(password);

    hash.Should().NotContain("md5");
    hash.Should().NotContain("sha1");
    hash.Should().StartWith("$2a$"); // bcrypt
}
```

### Parte 5: Run Tests in Pipeline (10 min)
```yaml
- name: Run Security Tests
  run: dotnet test --filter "Category=Security"
```

## 📦 Entregables
- 10+ security tests escritos
- Tests passing ✅
- Pipeline ejecutando security tests

## 🔗 Mapeo
- ISO 27002:2022 Control 8.29 (Security testing)
- OWASP ASVS Level 2
