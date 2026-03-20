Param(
  [string]$BaseUrl = "http://localhost:3000"
)

Write-Host "Using base URL: $BaseUrl"

function Check-Server {
  try {
    Invoke-RestMethod -Method GET -Uri "$BaseUrl/" -ErrorAction Stop | Out-Null
    Write-Host "Server: OK"
  } catch {
    Write-Error "Server not reachable at $BaseUrl"
    exit 2
  }
}

function Login($email, $senha) {
  $body = @{ email = $email; senha = $senha } | ConvertTo-Json
  try {
    $r = Invoke-RestMethod -Method Post -Uri "$BaseUrl/auth/login" -Body $body -ContentType "application/json"
    return $r.token
  } catch {
    Write-Error "Login failed for $email"
    return $null
  }
}

Check-Server

Write-Host "`n--- Login admin ---"
$adminToken = Login -email "admin@example.com" -senha "admin123"
Write-Host "admin token: $adminToken"

Write-Host "`n--- Perfil admin ---"
Invoke-RestMethod -Method Get -Uri "$BaseUrl/usuarios/perfil" -Headers @{ Authorization = "Bearer $adminToken" } | ConvertTo-Json | Write-Host

Write-Host "`n--- Reservas admin ---"
Invoke-RestMethod -Method Get -Uri "$BaseUrl/reservas" -Headers @{ Authorization = "Bearer $adminToken" } | ConvertTo-Json | Write-Host

Write-Host "`n--- Criar reserva como admin ---"
$body = @{ sala = 'Script Room'; data = '2026-04-02' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "$BaseUrl/reservas" -Headers @{ Authorization = "Bearer $adminToken" } -Body $body -ContentType "application/json" | ConvertTo-Json | Write-Host

Write-Host "`n--- Login user ---"
$userToken = Login -email "user@example.com" -senha "user123"
Write-Host "user token: $userToken"

Write-Host "`n--- Perfil user ---"
Invoke-RestMethod -Method Get -Uri "$BaseUrl/usuarios/perfil" -Headers @{ Authorization = "Bearer $userToken" } | ConvertTo-Json | Write-Host

Write-Host "`n--- Reservas user ---"
Invoke-RestMethod -Method Get -Uri "$BaseUrl/reservas" -Headers @{ Authorization = "Bearer $userToken" } | ConvertTo-Json | Write-Host

Write-Host "`nAll done."
