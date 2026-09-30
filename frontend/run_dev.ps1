$env:PATH = "C:\website\ARCart-AI\nodejs\node-v20.11.0-win-x64;" + $env:PATH
Set-Location "C:\website\ARCart-AI\frontend"
Start-Process "C:\website\ARCart-AI\nodejs\node-v20.11.0-win-x64\npm.cmd" -ArgumentList "run dev" -NoNewWindow -Wait