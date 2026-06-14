// Pure Node.js image compressor using built-in APIs
// Resizes images to max 1800px, optimizes JPEG
import { readFileSync, writeFileSync, statSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { execSync } from 'child_process';

const worksDir = 'D:/王国光/resume-website/public/works';
const maxDim = 1800;

// Use PowerShell's System.Drawing via a single invocation
const psScript = `
Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -Path '${worksDir}' -Recurse -Include *.jpg
$maxDim = ${maxDim}
$quality = 85

foreach ($file in $files) {
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $oldW = $img.Width
    $oldH = $img.Height
    $oldKB = [math]::Round($file.Length / 1024, 1)

    if ($oldW -gt $maxDim -or $oldH -gt $maxDim) {
        $ratio = $oldW / $oldH
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

    Write-Host "Processing: $($file.Name) ($($oldW)x$($oldH), ${oldKB}KB)"

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $g.Dispose()
    $img.Dispose()

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
    $bmp.Save($file.FullName, $encoder, $encParams)
    $bmp.Dispose()

    $newKB = [math]::Round((Get-Item $file.FullName).Length / 1024, 1)
    Write-Host "  -> ${newW}x${newH}, ${newKB}KB"
}
Write-Host "COMPLETE"
`;

const tmpFile = 'D:/王国光/resume-website/_compress.ps1';
writeFileSync(tmpFile, '﻿' + psScript, 'utf-8');
try {
  const result = execSync(`powershell -ExecutionPolicy Bypass -File "${tmpFile}"`, {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
    timeout: 120000
  });
  console.log(result);
} catch (e) {
  console.error(e.stdout || '');
  console.error(e.stderr || '');
} finally {
  try { require('fs').unlinkSync(tmpFile); } catch {}
}
