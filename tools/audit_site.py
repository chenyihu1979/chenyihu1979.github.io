#!/usr/bin/env python3
"""Preflight local HTML references; interactive browser QA is separate."""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag not in {"a", "script", "link", "img", "audio", "video", "source"}:
            return
        data = dict(attrs)
        value = data.get("href") if tag in {"a", "link"} else data.get("src")
        if value:
            self.links.append((tag, value))


def audit(root):
    root = root.resolve()
    errors = []
    pages = sorted(root.rglob("*.html"))
    if not (root / "index.html").is_file():
        errors.append("missing root index.html")
    for page in pages:
        parser = Links()
        parser.feed(page.read_text(encoding="utf-8"))
        for tag, value in parser.links:
            uri = urlsplit(value)
            if uri.scheme or value.startswith("//") or not uri.path:
                continue
            target = (page.parent / unquote(uri.path)).resolve()
            if target.is_dir():
                target = target / "index.html"
            if not target.is_relative_to(root) or not target.is_file():
                errors.append(f"{page.relative_to(root)}: broken {tag} {value}")
    return pages, errors


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("site", type=Path)
    args = ap.parse_args()
    pages, errors = audit(args.site)
    print(f"Scanned {len(pages)} HTML pages: {len(errors)} broken local references")
    for error in errors:
        print(error)
    raise SystemExit(bool(errors))
