#!/usr/bin/env bash
# Bash script to generate PPTX from docs/slides.md using pandoc
INPUT=${1:-docs/slides.md}
OUTPUT=${2:-docs/slides.pptx}

if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc is not installed. Install pandoc to use this script: https://pandoc.org/installing.html" >&2
  exit 1
fi

echo "Generating $OUTPUT from $INPUT..."
pandoc "$INPUT" -t pptx -o "$OUTPUT"
if [ $? -eq 0 ]; then
  echo "Generated $OUTPUT"
else
  echo "pandoc failed" >&2
  exit 1
fi
