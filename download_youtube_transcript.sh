#!/bin/zsh

# download as mp4, get normal subtitles

yt-dlp -f mp4 "$@" --write-auto-sub --sub-format best --write-sub

# download subtitles and convert them to transcript

yt-dlp --skip-download --write-subs --write-auto-subs --sub-lang en -k --sub-format ttml --convert-subs srt --exec before_dl:"sed -e '/^[0-9][0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9][0-9] --> [0-9][0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9][0-9]$/d' -e '/^[[:digit:]]\{1,3\}$/d' -e 's/<[^>]>//g' -e '/^[[:space:]]$/d' -i '' %(requested_subtitles.:.filepath)#q" "$@"