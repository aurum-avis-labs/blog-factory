#!/usr/bin/env python3
"""Body word count, same idea as scripts/aurum/validate.py."""
import re
import sys

t = open(sys.argv[1], encoding="utf-8").read()
b = re.sub(r"^---\n.*?\n---\n", "", t, count=1, flags=re.S)
b = re.sub(r"<[^>]+>", " ", b)
print(len(re.findall(r"[\wÀ-ÿ'’-]+", b)))
