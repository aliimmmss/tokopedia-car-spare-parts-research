#!/usr/bin/env python3
"""Scrape MQL5 articles from Wayback Machine cache."""

import requests
import json
import re
import time
import os

OUTPUT_FILE = '/home/skainsmatecode/tokopedia-car-spare-parts-research/data/mql5_articles_all.json'
TEMP_FILE = '/home/skainsmatecode/tokopedia-car-spare-parts-research/data/mql5_articles_temp.json'
TOTAL_PAGES = 71


def extract_with_regex(html):
    """Use regex to extract articles from HTML."""
    articles = []
    
    # Primary pattern: title links with href containing /en/articles/
    # Match <a> tags that have href with /en/articles/ pattern
    link_pattern = r'<a[^>]*href="([^"]*?/en/articles/[^"]*?)"[^>]*>\s*(.*?)\s*</a>'
    matches = re.findall(link_pattern, html, re.DOTALL)
    
    # Filter to actual article links (with numeric IDs)
    article_links = []
    for url, title_html in matches:
        clean_title = re.sub(r'<[^>]+>', '', title_html).strip()
        # Only keep links that point to specific articles (have numeric ID)
        if re.search(r'/en/articles/\d+', url) and clean_title and len(clean_title) > 10:
            article_links.append((url, clean_title))
    
    # Find descriptions
    desc_pattern = r'class="articles-item__description"[^>]*>(.*?)</(?:div|p)>'
    descs_raw = re.findall(desc_pattern, html, re.DOTALL)
    descs = [re.sub(r'<[^>]+>', '', d).strip() for d in descs_raw]
    
    # Deduplicate article links by URL (keep first occurrence per unique article URL)
    seen_urls = set()
    unique_links = []
    for url, title in article_links:
        # Clean URL - remove wayback prefix
        clean_url = re.sub(r'https?://web\.archive\.org/web/\d+(?:[a-z_]+)?/', '', url)
        if not clean_url.startswith('http'):
            clean_url = 'https://www.mql5.com' + clean_url
        
        # Normalize URL
        base_url = re.sub(r'^https?://www\.mql5\.com', '', clean_url)
        if base_url not in seen_urls:
            seen_urls.add(base_url)
            unique_links.append((clean_url, title))
    
    # Match descriptions to articles
    for i, (url, title) in enumerate(unique_links):
        desc = descs[i] if i < len(descs) else ''
        articles.append({
            'title': title,
            'url': url,
            'description': desc
        })
    
    return articles


def fetch_page(session, page_num):
    """Fetch a page from Wayback Machine."""
    if page_num == 1:
        orig_url = 'https://www.mql5.com/en/articles'
    else:
        orig_url = f'https://www.mql5.com/en/articles/page{page_num}'
    
    # Try multiple wayback timestamps
    timestamps = ['2025', '2024', '202412', '202410', '202408']
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
    
    for ts in timestamps:
        wayback_url = f'https://web.archive.org/web/{ts}/{orig_url}'
        for attempt in range(2):
            try:
                r = session.get(wayback_url, headers=headers, timeout=30, allow_redirects=True)
                if r.status_code == 200 and len(r.text) > 1000:
                    return r.text
                elif r.status_code == 404:
                    break  # Try next timestamp
                else:
                    time.sleep(1)
            except Exception as e:
                if attempt == 0:
                    time.sleep(2)
                else:
                    print(f"  Page {page_num}: error with ts={ts}: {e}")
    
    return None


def save_results(articles, final=False):
    """Save results to file."""
    # Deduplicate by URL
    seen = {}
    for a in articles:
        url = a['url']
        if url not in seen:
            seen[url] = a
    
    unique = list(seen.values())
    
    # Add IDs
    for a in unique:
        url = a['url'].rstrip('/')
        a['id'] = url.split('/')[-1] if '/' in url else url
        a['content'] = None
    
    data = {
        "metadata": {
            "source": "mql5.com",
            "total_articles": len(unique),
            "scraper": "hermes-browser",
            "pages_scraped": max(a.get('page', 0) for a in unique) if unique else 0
        },
        "articles": unique
    }
    
    outfile = OUTPUT_FILE if final else TEMP_FILE
    with open(outfile, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return len(unique), outfile


def main():
    session = requests.Session()
    all_articles = []
    failed_pages = []
    
    # Check for existing temp file to resume
    if os.path.exists(TEMP_FILE):
        try:
            with open(TEMP_FILE) as f:
                existing = json.load(f)
            all_articles = existing.get('articles', [])
            max_page = max(a.get('page', 0) for a in all_articles) if all_articles else 0
            print(f"Resuming from temp file. {len(all_articles)} articles from pages up to {max_page}")
        except:
            pass
    
    existing_pages = set(a.get('page', 0) for a in all_articles)
    
    for page in range(1, TOTAL_PAGES + 1):
        if page in existing_pages:
            print(f"Page {page}: already scraped, skipping")
            continue
            
        html = fetch_page(session, page)
        
        if html:
            articles = extract_with_regex(html)
            for a in articles:
                a['page'] = page
            all_articles.extend(articles)
            print(f"Page {page}: {len(articles)} articles (total: {len(all_articles)})")
        else:
            failed_pages.append(page)
            print(f"Page {page}: FAILED - no content")
        
        # Save intermediate every 10 pages
        if page % 10 == 0:
            count, fname = save_results(all_articles)
            print(f"  >> Saved {count} unique articles to {fname}")
            print(f"  >> Failed pages so far: {failed_pages}")
        
        # Rate limit
        time.sleep(0.5)
    
    # Final save
    count, fname = save_results(all_articles, final=True)
    print(f"\n=== COMPLETE ===")
    print(f"Total unique articles: {count}")
    print(f"Saved to: {fname}")
    if failed_pages:
        print(f"Failed pages: {failed_pages}")


if __name__ == '__main__':
    main()
