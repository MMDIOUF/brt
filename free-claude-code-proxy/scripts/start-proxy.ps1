<#
Start the free-claude-code proxy using the local virtualenv and the .env file.
Usage: Open PowerShell in the project root and run `./scripts/start-proxy.ps1`.
#>

Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)

# Ensure Pydantic Settings picks the correct .env file when started from a different CWD
$env:FCC_ENV_FILE = Join-Path (Get-Location) '.env'

# Activate the venv if present
if (Test-Path ".\.venv\Scripts\Activate.ps1") {
    & .\.venv\Scripts\Activate.ps1
}

# Load environment variables from .env into the process environment
if (Test-Path ".env") {
    Get-Content .env | ForEach-Object {
        if ($_ -and ($_ -notmatch '^[\s#]')) {
            $parts = $_ -split '=', 2
            if ($parts.Length -eq 2) {
                $name = $parts[0].Trim()
                $value = $parts[1].Trim()
                Set-Item -Path env:$name -Value $value
            }
        }
    }
}

# Default port (can be overridden by .env MODEL or settings)
$port = 8083

Write-Output "Starting free-claude-code proxy on http://127.0.0.1:$port"
& .venv\Scripts\python.exe -m uvicorn server:app --host 127.0.0.1 --port $port --reload

Pop-Location
