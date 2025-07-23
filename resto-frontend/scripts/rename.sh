#!/bin/bash

# Chemin relatif depuis le script
IMG_DIR="../public/devices/mobile"

# Extensions à gérer
EXTENSIONS=("jpg" "jpeg" "png" "gif" "JPG" "JPEG" "PNG" "GIF")

# Vérifie si le dossier existe
cd "$IMG_DIR" || { echo "❌ Dossier introuvable : $IMG_DIR"; exit 1; }

# Compteur de renommage
count=1

# Boucle sur les extensions
for ext in "${EXTENSIONS[@]}"; do
  for file in *."$ext"; do
    if [[ -f "$file" ]]; then
      extension="${file##*.}"
      new_name="screenshot-mobile$count.$extension"
      mv "$file" "$new_name"
      echo "🔁 $file → $new_name"
      ((count++))
    fi
  done
done

echo "🏁 $((count - 1)) fichiers renommés dans $IMG_DIR"
