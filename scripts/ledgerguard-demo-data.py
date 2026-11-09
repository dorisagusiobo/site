"""Build the LedgerGuard portfolio demo data from the public final-test results
and the synthetic invoices those results were run on. Mirrors store.py's note mapping.

Usage: python3 scripts/ledgerguard-demo-data.py ../ledgerguard lib/ledgerguard-demo.json
(needs data/synthetic-v2 generated in the ledgerguard checkout)."""
import json, sys
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

lg = Path(sys.argv[1]); out = Path(sys.argv[2])
d = json.loads((lg / 'evals/results/pipeline-test-final.json').read_text())
inv_dir = lg / 'data/synthetic-v2/invoices'

findings, groups, needed = [], defaultdict(list), []
for pos, f in enumerate(d['findings']):
    fid = pos + 1
    findings.append({**f, 'finding_id': fid, 'position': pos, 'status': 'pending', 'notes': []})
    groups[f['invoice_numbers'][0]].append(fid)
    needed += f['invoice_numbers']
by_id = {f['finding_id']: f for f in findings}
for number, notes in d['notes'].items():
    assert sorted(n['finding_index'] for n in notes) == list(range(len(groups[number]))), number
    for n in notes:
        by_id[groups[number][n['finding_index']]]['notes'].append(n)

invoices = {}
for number in dict.fromkeys(needed):
    inv = json.loads((inv_dir / f'{number}.json').read_text())
    inv['document_id'] = number
    for i, item in enumerate(inv['line_items']):
        item['position'] = i
        item['unit_price'] = str(Decimal(item['unit_price']).quantize(Decimal('0.0001')))
    invoices[number] = inv

m = d['metadata']
run = {'run_id': d['pipeline_run_id'], 'started_at': m['date'], 'status': 'completed',
       'model_ids': m['model_ids'], 'git_revision': m['git_revision'],
       'documents': len(d['selected_documents']) if isinstance(d['selected_documents'], list) else d['selected_documents'],
       'cost': d['batch']['cost']}
out.write_text(json.dumps({'run': run, 'findings': findings, 'invoices': invoices}, indent=1) + '\n')
print(len(findings), 'findings,', len(invoices), 'invoices,', sum(len(f['notes']) for f in findings), 'notes', run['documents'], 'docs')
