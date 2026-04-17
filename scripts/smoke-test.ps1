$process = $null
$stdoutPath = Join-Path $env:TEMP "portfolio-smoke-stdout.log"
$stderrPath = Join-Path $env:TEMP "portfolio-smoke-stderr.log"

try {
  Add-Type -AssemblyName System.Net.Http

  $nodePath = (Get-Command node).Source
  $nextBin = Join-Path "$PSScriptRoot\.." "node_modules\next\dist\bin\next"

  if (Test-Path $stdoutPath) { Remove-Item $stdoutPath -Force }
  if (Test-Path $stderrPath) { Remove-Item $stderrPath -Force }

  $process = Start-Process -FilePath $nodePath `
    -ArgumentList $nextBin, "start", "--port", "3100" `
    -WorkingDirectory "$PSScriptRoot\\.." `
    -PassThru `
    -WindowStyle Hidden `
    -RedirectStandardOutput $stdoutPath `
    -RedirectStandardError $stderrPath

  $baseUrl = "http://127.0.0.1:3100"
  $ready = $false
  $handler = [System.Net.Http.HttpClientHandler]::new()
  $handler.AllowAutoRedirect = $false
  $client = [System.Net.Http.HttpClient]::new($handler)

  for ($attempt = 0; $attempt -lt 40; $attempt++) {
    try {
      $response = $client.GetAsync("$baseUrl/admin/login").GetAwaiter().GetResult()
      if ([int]$response.StatusCode -eq 200) {
        $ready = $true
        break
      }
    } catch {}

    Start-Sleep -Milliseconds 500
  }

  if (-not $ready) {
    $stdout = if (Test-Path $stdoutPath) { Get-Content $stdoutPath -Raw } else { "" }
    $stderr = if (Test-Path $stderrPath) { Get-Content $stderrPath -Raw } else { "" }
    throw "Timed out waiting for the Next.js server to start.`nSTDOUT:`n$stdout`nSTDERR:`n$stderr"
  }

  $homeResponse = $client.GetAsync("$baseUrl/").GetAwaiter().GetResult()
  if ([int]$homeResponse.StatusCode -ne 200) {
    throw "Expected public home page to return 200, got $([int]$homeResponse.StatusCode)."
  }

  $loginResponse = $client.GetAsync("$baseUrl/admin/login").GetAwaiter().GetResult()
  if ([int]$loginResponse.StatusCode -ne 200) {
    throw "Expected admin login page to return 200, got $([int]$loginResponse.StatusCode)."
  }

  $adminResponse = $client.GetAsync("$baseUrl/admin").GetAwaiter().GetResult()
  $statusCode = [int]$adminResponse.StatusCode
  $location = $adminResponse.Headers.Location.ToString()

  if ($statusCode -ne 307) {
    throw "Expected unauthenticated /admin request to return 307, got $statusCode."
  }

  if ($location -ne "/admin/login?redirectTo=%2Fadmin") {
    throw "Expected /admin redirect location to be /admin/login?redirectTo=%2Fadmin, got $location."
  }
} finally {
  if ($client) {
    $client.Dispose()
  }

  if ($handler) {
    $handler.Dispose()
  }

  if ($process -and -not $process.HasExited) {
    Stop-Process -Id $process.Id -Force
  }
}
