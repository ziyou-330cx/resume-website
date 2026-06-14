Add-Type -AssemblyName System.Drawing

$worksDir = 'D:\王国光\resume-website\public\works'
$maxDim = 1800
$quality = 85

$files = Get-ChildItem -Path $worksDir -Recurse -Filter *.jpg

foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $oldW = $img.Width
    $oldH = $img.Height
    $oldSize = [math]::Round($file.Length / 1KB, 1)

    # Calculate new dimensions
    $ratio = $oldW / $oldH
    if ($oldW -gt $maxDim -or $oldH -gt $maxDim) {
        if ($oldW -ge $oldH) {
            $newW = $maxDim
            $newH = [math]::Round($maxDim / $ratio)
        } else {
            $newH = $maxDim
            $newW = [math]::Round($maxDim * $ratio)
        }
    } else {
        $newW = $oldW
        $newH = $oldH
    }

    Write-Host "Processing: $($file.Name) ($($oldW)x$($oldH), ${oldSize}KB)"

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $g.Dispose()
    $img.Dispose()

    # Save
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
    $bmp.Save($file.FullName, $encoder, $encParams)
    $bmp.Dispose()

    $newSize = [math]::Round((Get-Item $file.FullName).Length / 1KB, 1)
    Write-Host "  -> ${newW}x${newH}, ${newSize}KB"
}

Write-Host "Done!"
