#!/bin/sh

# Wait for .repos file to be created
while [ ! -f "$HOME/.repos" ]; do
  sleep 1
done

while IFS= read -r repo; do
  repo_url=$(echo "$repo" | cut -d ' ' -f1)
  branch=$(echo "$repo" | cut -d ' ' -f2)
  dir=$(basename "$repo_url" .git)

  if ! test -d "$dir"; then
    git clone "$repo_url" -b "$branch"
  fi
done < "$HOME/.repos"

# Required to keep the container running
tail -f /dev/null
