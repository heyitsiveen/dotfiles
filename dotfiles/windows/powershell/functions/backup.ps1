# =============================================================================
# backup — Create a timestamped backup of a file
# =============================================================================
# Converted from: dotfiles-macos/.config/fish/functions/backup.fish
# Usage:
#   backup <file>                  # backup in same directory
#   backup <file> <destination>    # backup in a specific directory

function backup {
    param(
        [Parameter(Mandatory, Position = 0)]
        [string]$FilePath,

        [Parameter(Position = 1)]
        [string]$Destination
    )

    if (-not (Test-Path $FilePath)) {
        Write-Error "File not found: $FilePath"
        return
    }

    $timestamp   = Get-Date -Format 'yyyyMMdd-HHmmss'
    $fileName    = [System.IO.Path]::GetFileName($FilePath)
    $backupName  = "$fileName.$timestamp.bak"

    if ($Destination) {
        if (-not (Test-Path $Destination)) {
            Write-Error "Destination directory not found: $Destination"
            return
        }
        $dest = Join-Path $Destination $backupName
    } else {
        $dest = Join-Path (Split-Path $FilePath) $backupName
    }

    Copy-Item -Path $FilePath -Destination $dest
    Write-Host "Backup created: $dest"
}
