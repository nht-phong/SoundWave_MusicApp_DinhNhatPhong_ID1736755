# Generates stylish placeholder artwork so the site looks complete before real photos are added.
# Replacing any file with a real photo of the same name is enough — no code changes needed.
Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot "..\images"
New-Item -ItemType Directory -Force -Path $root | Out-Null

function New-Artwork {
    param(
        [string]$Name,
        [int]$W,
        [int]$H,
        [string]$Hex1,
        [string]$Hex2,
        [string]$Label,
        [string]$Sub,
        [int]$Seed = 1,
        [string]$Tag = "SOUNDWAVE"
    )

    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
    $c1 = [System.Drawing.ColorTranslator]::FromHtml($Hex1)
    $c2 = [System.Drawing.ColorTranslator]::FromHtml($Hex2)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 38)
    $g.FillRectangle($brush, $rect)

    # soft decorative circles
    $rand = New-Object System.Random($Seed)
    for ($i = 0; $i -lt 6; $i++) {
        $size = [int]($W * (0.18 + $rand.NextDouble() * 0.5))
        $x = $rand.Next(-[int]($W * 0.2), [int]($W * 0.9))
        $y = $rand.Next(-[int]($H * 0.2), [int]($H * 0.8))
        $alpha = 12 + $rand.Next(0, 26)
        $circle = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        $g.FillEllipse($circle, $x, $y, $size, $size)
        $circle.Dispose()
    }

    # subtle diagonal streak
    $streak = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(18, 255, 255, 255))
    $pts = @(
        (New-Object System.Drawing.Point([int]($W * 0.55), 0)),
        (New-Object System.Drawing.Point([int]($W * 0.78), 0)),
        (New-Object System.Drawing.Point([int]($W * 0.28), $H)),
        (New-Object System.Drawing.Point([int]($W * 0.05), $H))
    )
    $g.FillPolygon($streak, $pts)
    $streak.Dispose()

    # dark scrim for legibility
    $scrimRect = New-Object System.Drawing.Rectangle(0, [int]($H * 0.45), $W, [int]($H * 0.55))
    $scrim = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $scrimRect,
        [System.Drawing.Color]::FromArgb(0, 0, 0, 0),
        [System.Drawing.Color]::FromArgb(165, 0, 0, 0),
        90
    )
    $g.FillRectangle($scrim, $scrimRect)
    $scrim.Dispose()

    # top-left brand tag with wave bars
    $pad = [int]($W * 0.055)
    $barW = [int]($W * 0.012)
    $barGap = [int]($W * 0.014)
    $barColor = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(205, 255, 255, 255))
    $heights = @(0.5, 0.75, 1.0, 0.65, 0.4)
    for ($b = 0; $b -lt 5; $b++) {
        $bh = [int]($W * 0.045 * $heights[$b])
        $bx = $pad + $b * ($barW + $barGap)
        $by = $pad + [int]($W * 0.045) - $bh
        $g.FillRectangle($barColor, $bx, $by, $barW, $bh)
    }
    $barColor.Dispose()

    $tagFont = New-Object System.Drawing.Font("Segoe UI", [float]([Math]::Max(11, $W * 0.018)), [System.Drawing.FontStyle]::Bold)
    $tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 255, 255, 255))
    $tagX = $pad + 5 * ($barW + $barGap) + [int]($W * 0.014)
    $tagY = $pad + [int]($W * 0.011)
    $g.DrawString($Tag, $tagFont, $tagBrush, [float]$tagX, [float]$tagY)

    # main label
    $labelSize = [float]([Math]::Max(22, $W * 0.075))
    if ($Label.Length -gt 16) { $labelSize = $labelSize * 0.78 }
    $labelFont = New-Object System.Drawing.Font("Segoe UI", $labelSize, [System.Drawing.FontStyle]::Bold)
    $white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 255, 255, 255))
    $subFont = New-Object System.Drawing.Font("Segoe UI", [float]([Math]::Max(10, $W * 0.021)), [System.Drawing.FontStyle]::Regular)
    $soft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(185, 255, 255, 255))

    $labelY = $H - $pad - [int]($W * 0.11)
    $g.DrawString($Label, $labelFont, $white, [float]$pad, [float]$labelY)
    $g.DrawString($Sub, $subFont, $soft, [float]($pad + 2), [float]($labelY + $labelSize * 1.18))

    $path = Join-Path $root $Name
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $g.Dispose()
    $bmp.Dispose()
    $brush.Dispose()
    $labelFont.Dispose()
    $subFont.Dispose()
    $white.Dispose()
    $soft.Dispose()
    $tagFont.Dispose()
    $tagBrush.Dispose()
    Write-Host "created $Name"
}

New-Artwork "hero.jpg" 1600 900 "#2b1055" "#be185d" "" "Hero banner · 1600x900" 11 "SOUNDWAVE"

$artistInfo = @(
    @("artist-1.jpg", "#4c1d95", "#db2777", "", "", 21),
    @("artist-2.jpg", "#9d174d", "#fb7185", "", "", 22),
    @("artist-3.jpg", "#0f766e", "#84cc16", "", "", 23),
    @("artist-4.jpg", "#1e3a8a", "#7c3aed", "", "", 24)
)
foreach ($a in $artistInfo) { New-Artwork $a[0] 800 800 $a[1] $a[2] $a[3] $a[4] $a[5] "ARTIST" }

New-Artwork "composer-1.jpg" 800 800 "#3f2b1e" "#b45309" "Trần Minh Khoa" "Nhạc sĩ · 800x800" 31 "COMPOSER"

$covers = @(
    @("cover-1.jpg", "#7c3aed", "#ec4899", "Đường Về Nhà", "Mây Lang Thang · 800x800", 41),
    @("cover-2.jpg", "#0e7490", "#1e3a8a", "Đêm Sài Gòn", "Hà Anh · 800x800", 42),
    @("cover-3.jpg", "#b91c1c", "#f59e0b", "Tia Nắng", "The Lighters · 800x800", 43),
    @("cover-4.jpg", "#92400e", "#eab308", "Sáng Tối", "Bùi Lan · 800x800", 44),
    @("cover-5.jpg", "#1e1b4b", "#06b6d4", "Neon City", "DJ Kaze · 800x800", 45),
    @("cover-6.jpg", "#3b0764", "#b45309", "Phố Cũ", "Mây Lang Thang · 800x800", 46),
    @("cover-7.jpg", "#831843", "#312e81", "Bình Yên Nơi Em", "Hà Anh · 800x800", 47),
    @("cover-8.jpg", "#164e63", "#22d3ee", "Tập Trung", "Lo-Fi Club · 800x800", 48)
)
foreach ($c in $covers) { New-Artwork $c[0] 800 800 $c[1] $c[2] $c[3] $c[4] $c[5] "ALBUM" }

New-Artwork "article-1.jpg" 1600 900 "#2e1065" "#be185d" "" "Bài viết · 1600x900" 51 "FEATURE"
New-Artwork "article-2.jpg" 800 450 "#422006" "#ca8a04" "Phố Cũ" "Bài viết · 800x450" 52 "REVIEW"
New-Artwork "article-3.jpg" 800 450 "#0c4a6e" "#0e7490" "Lo-Fi & Tập trung" "Bài viết · 800x450" 53 "STORY"

$team = @(
    @("avatar-1.jpg", "#4c1d95", "#ec4899", "", "", 61),
    @("avatar-2.jpg", "#9d174d", "#f472b6", "", "", 62),
    @("avatar-3.jpg", "#0f766e", "#22d3ee", "", "", 63),
    @("avatar-4.jpg", "#7c2d12", "#f59e0b", "", "", 64)
)
foreach ($t in $team) { New-Artwork $t[0] 600 600 $t[1] $t[2] $t[3] $t[4] $t[5] "TEAM" }

Write-Host "All placeholder images are ready."
