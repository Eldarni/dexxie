
# Download and add to path cwebp from https://developers.google.com/speed/webp/docs/cwebp
# Download repo as zip: https://github.com/PokeAPI/sprites
# Create two folders ".\icons" and ".\output"
# Extract ".\sprites\pokemon\other\home" into ""./icons"
# Copy the contents of ".\output" into ../public/icons and commit changes

#
$OutputFolder = '.\output\'

#
$NormalImages = Get-ChildItem -Path '.\icons\' -Filter *.png
$ShinyImages  = Get-ChildItem -Path '.\icons\shiny\' -Filter *.png

#
foreach ($Image in $NormalImages) {

    #
    $p = [math]::floor(($Images.IndexOf($Image) / $Images.Length) * 100)
    Write-Progress -Activity "Converting Sprites" -Status "$p%" -PercentComplete $p

    #
    $OutputImage = $OutputFolder + $Image.BaseName + '.webp'
    cwebp.exe -q 80 $Image.FullName -o $OutputImage -resize 256 256 -quiet
    
}

foreach ($Image in $ShinyImages) {

    #
    $p = [math]::floor(($Images.IndexOf($Image) / $Images.Length) * 100)
    Write-Progress -Activity "Converting Sprites (Shiny)" -Status "$p%" -PercentComplete $p

    #
    $OutputImage = $OutputFolder + $Image.BaseName + '-shiny.webp'
    cwebp.exe -q 80 $Image.FullName -o $OutputImage -resize 256 256 -quiet
    
}