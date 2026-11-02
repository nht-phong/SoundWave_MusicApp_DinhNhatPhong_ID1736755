# Replaces the generated placeholders with free-to-use photos from Unsplash.
# Run: powershell -NoProfile -ExecutionPolicy Bypass -File tools/fetch-images.ps1
$ErrorActionPreference = "Stop"
$root = Join-Path $PSScriptRoot "..\images"
New-Item -ItemType Directory -Force -Path $root | Out-Null

function New-Photo {
    param(
        [string]$Name,
        [string]$Id,
        [int]$W,
        [int]$H,
        [switch]$Faces
    )

    $crop = if ($Faces) { "&crop=faces,center" } else { "&crop=entropy" }
    $url = "https://images.unsplash.com/photo-${Id}?auto=format&fit=crop${crop}&fm=jpg&w=${W}&h=${H}&q=82"
    $out = Join-Path $root $Name

    try {
        Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $out -TimeoutSec 90
        $file = Get-Item $out
        Write-Host ("OK  {0,-16} {1,7:N0} KB" -f $Name, ($file.Length / 1KB))
    } catch {
        Write-Host ("FAIL {0}: {1}" -f $Name, $_.Exception.Message)
    }
}

# Hero + editorial images
New-Photo "hero.jpg"      "1501386761578-eac5c94b800a" 1600 900
New-Photo "article-1.jpg" "1493225457124-a3eb161ffa5f" 1600 900
New-Photo "article-2.jpg" "1571974599782-87624638275e" 800 450
New-Photo "article-3.jpg" "1511379938547-c1f69419868d" 800 450

# Album / single covers
New-Photo "cover-1.jpg" "1510915361894-db8b60106cb1" 800 800
New-Photo "cover-2.jpg" "1470225620780-dba8ba36b745" 800 800
New-Photo "cover-3.jpg" "1506157786151-b8491531f063" 800 800
New-Photo "cover-4.jpg" "1499415479124-43c32433a620" 800 800
New-Photo "cover-5.jpg" "1516450360452-9312f5e86fc7" 800 800
New-Photo "cover-6.jpg" "1507838153414-b4b713384a76" 800 800
New-Photo "cover-7.jpg" "1518609878373-06d740f60d8b" 800 800
New-Photo "cover-8.jpg" "1520523839897-bd0b52f945a0" 800 800

# Artist portraits (cropped around faces for the circular avatar)
New-Photo "artist-1.jpg"   "1507003211169-0a1dd7228f2d" 800 800 -Faces
New-Photo "artist-2.jpg"   "1494790108377-be9c29b29330" 800 800 -Faces
New-Photo "artist-3.jpg"   "1524368535928-5b5e00ddc76b" 800 800
New-Photo "artist-4.jpg"   "1500648767791-00dcc994a43e" 800 800 -Faces
New-Photo "composer-1.jpg" "1506794778202-cad84cf45f1d" 800 800 -Faces

# Team members
New-Photo "avatar-1.jpg" "1527980965255-d3b416303d12" 600 600 -Faces
New-Photo "avatar-2.jpg" "1534528741775-53994a69daeb" 600 600 -Faces
New-Photo "avatar-3.jpg" "1519085360753-af0119f7cbe7" 600 600 -Faces
New-Photo "avatar-4.jpg" "1517841905240-472988babdf9" 600 600 -Faces

Write-Host "`nDone. Check image sizes with the verification command in IMAGES.md."
