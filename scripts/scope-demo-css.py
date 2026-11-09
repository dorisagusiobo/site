"""Scope a demo app's global stylesheet under one wrapper class, with prefixed class
names, so it can sit inside the portfolio site without either stylesheet leaking.

Usage:
  python3 scripts/scope-demo-css.py ../ledgerguard/web/app/globals.css lg \
    > app/work/ledgerguard/demo/ledgerguard-demo.css
  python3 scripts/scope-demo-css.py ../carebridge/frontend/src/app/globals.css cb \
    > app/work/carebridge/demo/carebridge-demo.css
"""
import re
import sys

source, prefix = sys.argv[1], sys.argv[2]
root = f'.{prefix}-demo'

css = open(source).read()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'@import[^;]*;', '', css)


def selector(sel):
    sel = sel.strip()
    if sel in (':root', 'body', 'html'):
        return root
    sel = re.sub(r'\.([a-zA-Z][\w-]*)', rf'.{prefix}-\1', sel)
    sel = re.sub(r'(^|[\s>+~])main\b', rf'\1.{prefix}-main', sel)
    return f'{root} {sel}'


def block_end(text, start):
    depth = 0
    for k in range(start, len(text)):
        if text[k] == '{':
            depth += 1
        elif text[k] == '}':
            depth -= 1
            if depth == 0:
                return k
    raise ValueError('unbalanced braces')


def scope(text):
    out, i = [], 0
    while True:
        j = text.find('{', i)
        if j < 0:
            break
        prelude = text[i:j].strip()
        end = block_end(text, j)
        inner = text[j + 1:end]
        if prelude.startswith('@media'):
            out.append(f'{prelude}{{{scope(inner)}}}')
        else:
            out.append(','.join(selector(s) for s in prelude.split(',')) + '{' + inner.strip() + '}')
        i = end + 1
    return '\n'.join(out)


# Undo the site's element styles inside the demo, so only the app's own rules apply.
resets = {
    'lg': (f'{root} h1,{root} h2,{root} h3{{font-family:inherit;color:inherit;text-wrap:wrap}}'
           f'{root} ol,{root} ul{{margin:0}}{root} a{{color:inherit;text-decoration:none}}'),
}
tags = ','.join(f'{root} {tag}' for tag in ('h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'a'))
# CareBridge zeroes every margin itself (* { margin: 0 }), so keep that after reverting.
resets['cb'] = tags + '{all:revert;margin:0}'
reset = resets.get(prefix, tags + '{all:revert}')
print(f'/* Generated from {source.split("../")[-1]} by scripts/scope-demo-css.py. Do not edit by hand. */')
print(reset)
print(scope(css))
