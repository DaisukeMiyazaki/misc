#!/bin/bash

# how to use
# chmod +x copy_media.sh
# ./copy_media.sh <file_path_that_you_want_to_copy_to_publish_folder>
# change the dest_dir to your own path

# markdownファイル本体と、それに紐づくメディアファイルをコピーする

# コピー元のファイル
original_file="$1"

# コピー先のディレクトリ
dest_dir="$HOME/digital-garden-jekyll-template/assets/media/public/"

if [ -z "$original_file" ]; then
  echo "Usage: ./copy_media.sh <file_path_that_you_want_to_copy_to_publish_folder>"
  exit 1
fi

echo "Copying media files from $original_file to $dest_dir"
# original_file.md 内のメディアファイルパスを抽出
grep -Eo 'media\/public\/(.*?)$' "$original_file" | while read -r file_name; do

  echo "Found media file: $file_name"
  # ファイル名を拡張子付きで取得
  # ただしファイル名最後の ]] 文字は削除する
  file_name=$(echo "$file_name" | sed 's/\]\]$//')
  file_path="$file_name"

  # ファイルが存在するか確認
  if [ -f "$file_path" ]; then
    # コピー先ディレクトリを作成
    mkdir -p "$dest_dir"

    # ファイルをコピー
    cp "$file_path" "$dest_dir"
    echo "Copied $file_path to $dest_dir"
  else
    echo "File not found: $file_path"
  fi
done

# コピー元のファイルそのものがmarkdownファイルである場合、こちらもコピーする
md_dest_dir="$HOME/digital-garden-jekyll-template/_notes/"
if [ -f "$original_file" ]; then
  cp "$original_file" "$md_dest_dir"
  echo "Copied $original_file to $md_dest_dir"
fi