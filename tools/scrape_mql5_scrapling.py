#!/usr/bin/env python3
"""
MQL5 Article Scraper using Scrapling with Proxy Rotation

Usage:
  # Without proxy (gets page 1 only, ~40 articles)
  python3 tools/scrape_mql5_scrapling.py

  # With proxy list (gets all pages, 100+ articles)
  python3 tools/scrape_mql5_scrapling.py --proxies "http://proxy1:8080,http://proxy2:8080"

  # With proxy file (one proxy per line)
  python3 tools/scrape_mql5_scrapling.py --proxy-file proxies.txt
"""

import json
import time
import argparse
from datetime import datetime
from scrapling.fetchers import Fetcher
from scrapling.engines.toolbelt.proxy_rotation import ProxyRotator


def scrape_listing_page(page_num=1, proxy_rotator=None):
    """Scrape a single listing page of MQL5 articles."""
    if page_num == 1:
        url = 'https://www.mql5.com/en/articles'
    else:
        url = f'https://www.mql5.com/en/articles/page{page_num}'
    
    print(f"  Fetching page {page_num}: {url}")
    
    try:
        kwargs = {'stealthy_headers': True}
        if proxy_rotator:
            proxy, _ = proxy_rotator.get_next()
            kwargs['proxy'] = proxy
            print(f"    Using proxy: {proxy[:30]}...")
        
        p = Fetcher.get(url, **kwargs)
        
        if p.status != 200:
            print(f"  ✗ Status {p.status}")
            return []
        
        items = p.css('.articles-item')
        articles = []
        
        for item in items:
            title_el = item.css('.articles-item__title a')
            desc_el = item.css('.articles-item__description')
            
            if not title_el:
                continue
            
            title = (title_el[0].text or '').strip()
            href = title_el[0].attrib.get('href', '')
            if href.startswith('/'):
                href = 'https://www.mql5.com' + href
            
            article_id = href.rstrip('/').split('/')[-1] if '/articles/' in href else ''
            desc = (desc_el[0].text if desc_el else '').strip()
            
            # Try to get author
            author_el = item.css('.articles-item__author, [class*="author"]')
            author = (author_el[0].text if author_el else '').strip()
            
            articles.append({
                'id': article_id,
                'title': title,
                'url': href,
                'description': desc,
                'author': author,
                'page': page_num,
                'content': None,
                'date': None,
                'tags': [],
            })
        
        print(f"  ✓ Found {len(articles)} articles")
        return articles
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return []


def try_fetch_article(url, proxy_rotator=None):
    """Try to fetch individual article content."""
    try:
        kwargs = {'stealthy_headers': True}
        if proxy_rotator:
            proxy, _ = proxy_rotator.get_next()
            kwargs['proxy'] = proxy
        
        p = Fetcher.get(url, **kwargs)
        
        if p.status != 200:
            return None
        
        body = p.body.decode('utf-8', errors='replace') if p.body else ''
        
        title_el = p.css('h1')
        title = (title_el[0].text if title_el else '').strip()
        
        paras = p.css('p')
        content_parts = []
        for para in paras:
            text = (para.text or '').strip()
            if len(text) > 30:
                content_parts.append(text)
        
        return {
            'title': title,
            'content': '\n\n'.join(content_parts[:20]),
            'content_length': sum(len(p) for p in content_parts),
        }
    except:
        return None


def scrape_all_articles(max_pages=10, target_count=100, proxies=None, try_content=False):
    """Scrape MQL5 articles from listing pages."""
    
    # Setup proxy rotator if proxies provided
    proxy_rotator = None
    if proxies:
        proxy_rotator = ProxyRotator(proxies)
        print(f"Proxy rotation enabled: {len(proxies)} proxies")
    
    all_articles = []
    seen_urls = set()
    
    print(f"\nMQL5 Article Scraping (Scrapling)")
    print(f"Target: {target_count} articles, max {max_pages} pages")
    print(f"Time: {datetime.now().isoformat()}")
    print("=" * 60)
    
    for page in range(1, max_pages + 1):
        articles = scrape_listing_page(page, proxy_rotator)
        
        new_articles = []
        for art in articles:
            if art['url'] not in seen_urls:
                seen_urls.add(art['url'])
                new_articles.append(art)
        
        all_articles.extend(new_articles)
        print(f"  Total unique: {len(all_articles)}")
        
        if len(all_articles) >= target_count:
            print(f"  ✓ Reached target!")
            break
        
        if not articles:
            print(f"  No articles found, stopping")
            break
        
        if page < max_pages:
            time.sleep(2)
    
    all_articles = all_articles[:target_count]
    
    # Try individual content if requested
    if try_content:
        print(f"\nFetching individual article content...")
        success = 0
        for i, art in enumerate(all_articles):
            print(f"  [{i+1}/{len(all_articles)}] {art['title'][:50]}...", end=' ')
            result = try_fetch_article(art['url'], proxy_rotator)
            if result:
                art['content'] = result['content']
                success += 1
                print(f"✓ ({result['content_length']} chars)")
            else:
                print("✗")
            
            time.sleep(1 if (i + 1) % 10 != 0 else 3)
        
        print(f"  Got content for {success}/{len(all_articles)}")
    
    return all_articles


def save_results(articles, output_file):
    """Save articles to JSON file."""
    output = {
        'metadata': {
            'source': 'mql5.com',
            'scraped_at': datetime.now().isoformat(),
            'total_articles': len(articles),
            'scraper': 'scrapling',
            'with_content': sum(1 for a in articles if a['content']),
        },
        'articles': articles
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\nSaved {len(articles)} articles to {output_file}")
    return output_file


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Scrape MQL5 articles with Scrapling')
    parser.add_argument('--max-pages', type=int, default=10)
    parser.add_argument('--target', type=int, default=100)
    parser.add_argument('--proxies', type=str, help='Comma-separated proxy list')
    parser.add_argument('--proxy-file', type=str, help='File with one proxy per line')
    parser.add_argument('--try-content', action='store_true', help='Try fetching article content')
    parser.add_argument('--output', type=str, default='/home/skainsmatecode/tokopedia-car-spare-parts-research/data/mql5_articles_scrapling.json')
    
    args = parser.parse_args()
    
    # Load proxies
    proxies = None
    if args.proxies:
        proxies = [p.strip() for p in args.proxies.split(',') if p.strip()]
    elif args.proxy_file:
        with open(args.proxy_file) as f:
            proxies = [line.strip() for line in f if line.strip() and not line.startswith('#')]
    
    articles = scrape_all_articles(
        max_pages=args.max_pages,
        target_count=args.target,
        proxies=proxies,
        try_content=args.try_content,
    )
    
    save_results(articles, args.output)
    
    print(f"\n{'='*60}")
    print(f"SUMMARY: {len(articles)} articles scraped")
    print(f"With content: {sum(1 for a in articles if a['content'])}")
    print(f"{'='*60}")
