---
description: Run and manage PHP tests (PestPHP, PHPUnit)
---

# /test — Test Execution Flow

## How to Use

```
/test [scope]
```

Examples:

- `/test` — Run all tests
- `/test unit` — Run unit tests only
- `/test feature` — Run feature tests only
- `/test PartnerServiceTest` — Run specific test
- `/test coverage` — Run with coverage report

## Workflow

### Step 1: Detect Test Framework

```
→ Activate: @test-engineer
→ Detect:
   - Pest.php exists → PestPHP
   - phpunit.xml exists → PHPUnit
   - Neither → Offer to set up testing
```

### Step 2: Run Tests

```bash
# PestPHP
vendor/bin/pest

# PHPUnit
vendor/bin/phpunit

# Specific file
vendor/bin/pest tests/Unit/Services/PartnerServiceTest.php

# With coverage
vendor/bin/pest --coverage

# Filter by name
vendor/bin/pest --filter="partner"
```

### Step 3: Report Results

```markdown
## 🧪 Test Results

### Summary

| Metric   | Value |
| -------- | ----- |
| Total    | XX    |
| Passed   | ✅ XX |
| Failed   | ❌ XX |
| Skipped  | ⏭️ XX |
| Duration | X.Xs  |

### Failed Tests (if any)

| Test        | Error                 |
| ----------- | --------------------- |
| `test_name` | `Brief error message` |

### Coverage (if requested)

| Class            | Coverage |
| ---------------- | -------- |
| `PartnerService` | 85%      |
```

### Step 4: Fix Failures (If Any)

```
→ If tests fail:
   1. Analyze failure message
   2. Locate root cause
   3. Offer fix via @debugger
```
