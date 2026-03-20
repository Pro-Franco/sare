Param(
  [string]$BaseUrl = "http://localhost:3000",
  [string]$Email = "admin@example.com",
  [string]$Senha = "admin123"
)

function Login($base, $email, $senha) {
  $body = @{ email = $email; senha = $senha } | ConvertTo-Json
  try {
    $r = Invoke-RestMethod -Method Post -Uri "$base/auth/login" -Body $body -ContentType "application/json"
    return $r.token
  } catch {
    Write-Error "Login falhou: $($_.Exception.Message)"
    exit 1
  }
}

$token = Login -base $BaseUrl -email $Email -senha $Senha
Write-Output $token
