#!/bin/bash
# Fetch MQL5 articles pages from Wayback Machine and extract article data
# Output: JSON extracted with grep/sed

PAGES="3 4 6 7 8 9 31 33 34 35 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71"
OUTDIR="/home/skainsmatecode/tokopedia-car-spare-parts-research/data/mql5_pages"
mkdir -p "$OUTDIR"

for PAGE in $PAGES; do
    OUTFILE="$OUTDIR/page${PAGE}.html"
    if [ -f "$OUTFILE" ] && [ -s "$OUTFILE" ]; then
        echo "Page $PAGE: already cached ($(wc -c < "$OUTFILE") bytes)"
        continue
    fi
    
    # First find the latest 200 snapshot
    TS=$(curl -s --max-time 15 "http://web.archive.org/cdx/search/cdx?url=www.mql5.com/en/articles/page${PAGE}&output=json&limit=1&fl=timestamp&filter=statuscode:200&sort=reverse" 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[1][0] if len(d)>1 else '')" 2>/dev/null)
    
    if [ -z "$TS" ]; then
        echo "Page $PAGE: NO SNAPSHOT FOUND"
        continue
    fi
    
    echo -n "Page $PAGE: fetching timestamp $TS... "
    curl -sL --max-time 30 -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "https://web.archive.org/web/${TS}/https://www.mql5.com/en/articles/page${PAGE}" -o "$OUTFILE" 2>/dev/null
    
    SIZE=$(wc -c < "$OUTFILE")
    echo "${SIZE} bytes"
    
    # Be nice to the API
    sleep 1
done

echo "Done fetching HTML pages"
