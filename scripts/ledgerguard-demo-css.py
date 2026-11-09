"""Scope LedgerGuard's globals.css under .lg-demo with lg- prefixed class names,
so it can sit inside the portfolio site without either stylesheet leaking.

Usage: python3 scripts/ledgerguard-demo-css.py ../ledgerguard/web/app/globals.css > app/work/ledgerguard/demo/ledgerguard-demo.css"""
import re, sys

css = open(sys.argv[1]).read()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'@import[^;]*;', '', css)

def selector(sel):
    sel = sel.strip()
    if sel in (':root', 'body'):
        return '.lg-demo'
    sel = re.sub(r'\.([a-zA-Z][\w-]*)', r'.lg-\1', sel)
    sel = re.sub(r'(^|[\s>+~])main\b', r'\1.lg-main', sel)
    return '.lg-demo ' + sel

def block_end(text, start):
    depth = 0
    for k in range(start, len(text)):
        if text[k] == '{': depth += 1
        elif text[k] == '}':
            depth -= 1
            if depth == 0: return k
    raise ValueError('unbalanced')

def scope(text):
    out, i = [], 0
    while True:
        j = text.find('{', i)
        if j < 0: break
        prelude = text[i:j].strip()
        end = block_end(text, j)
        inner = text[j + 1:end]
        if prelude.startswith('@media'):
            out.append(f'{prelude}{{{scope(inner)}}}')
        else:
            out.append(','.join(selector(s) for s in prelude.split(',')) + '{' + inner.strip() + '}')
        i = end + 1
    return '\n'.join(out)

reset = ('.lg-demo h1,.lg-demo h2,.lg-demo h3{font-family:inherit;color:inherit;text-wrap:wrap}'
         '.lg-demo ol,.lg-demo ul{margin:0}.lg-demo a{color:inherit;text-decoration:none}')
print('/* Generated from ledgerguard/web/app/globals.css by scripts/ledgerguard-demo-css.py. Do not edit by hand. */')
print(reset)
print(scope(css))
