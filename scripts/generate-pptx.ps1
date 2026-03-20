# PowerShell script to generate PPTX from docs/slides.md using pandoc
param(
  [string]$input = "docs/slides.md",
  [string]$output = "docs/slides.pptx"
)

if (-not (Get-Command pandoc -ErrorAction SilentlyContinue)) {
  Write-Error "pandoc is not installed or not in PATH. Install pandoc to use this script: https://pandoc.org/installing.html"
  exit 1
}

Write-Output "Generating $output from $input..."
pandoc $input -t pptx -o $output
if ($LASTEXITCODE -eq 0) { Write-Output "Generated $output" } else { Write-Error "pandoc failed with exit code $LASTEXITCODE" }
