#!/bin/bash

# Script pour renommer les images avec des noms de hash en imageN.JPEG
# Les images existantes (image1.JPEG à image16.JPEG) sont conservées

cd "$(dirname "$0")/images"

# Trouver le prochain numéro disponible
next_num=17

# Parcourir tous les fichiers JPEG qui ne correspondent pas au pattern imageN.JPEG
for file in *.JPEG; do
    # Vérifier si le fichier ne correspond pas au pattern imageN.JPEG
    if [[ ! "$file" =~ ^image[0-9]+\.JPEG$ ]]; then
        new_name="image${next_num}.JPEG"
        echo "Renommage: $file -> $new_name"
        mv "$file" "$new_name"
        ((next_num++))
    fi
done

echo ""
echo "Terminé! $(($next_num - 17)) images ont été renommées."
