// Dependency-free content and static-application checks. Run: node scripts/check.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({window: {}});
const dataFiles = ['glossary', 'worldviews', 'scenarios', 'beliefs', 'sources'];
for (const name of dataFiles) vm.runInContext(fs.readFileSync(path.join(root, 'data', name + '.js'), 'utf8'), context);
const {GLOSSARY, WORLDVIEWS, SCENARIOS, BELIEFS, PREDICTS, TRANSITION, SOURCES} = context.window;
assert.equal(Object.keys(GLOSSARY).length, 21);
assert.equal(SCENARIOS.length, 9);
assert.equal(BELIEFS.length, 4);
assert.equal(WORLDVIEWS.then.rows.length + WORLDVIEWS.now.rows.length, 8);
assert.equal(new Set(SCENARIOS.map(s => s.id)).size, SCENARIOS.length);
assert.equal(new Set(SOURCES.map(s => s.id)).size, SOURCES.length);
for (const s of SCENARIOS) {
  for (const k of ['id','title','prompt','protects','harm','narrower','gateCase','guardrailCase','learning','evidence']) assert.ok(s[k], `${s.id} missing ${k}`);
  assert.ok(['gate','mix','guardrail'].includes(s.lean));
}
const original = fs.readFileSync(path.join(root, 'CONCEPT.md'), 'utf8');
const appendix = original.split('## Appendix B.')[1].split('## Appendix C.')[0];
let quotes = 0;
for (const item of [...BELIEFS.flatMap(b => [b.then,b.now,b.access]),PREDICTS.claim,PREDICTS.quote,PREDICTS.history,TRANSITION]) {
  assert.equal(['quote','paraphrase','framing'].filter(key => item[key] !== undefined).length,1);
  assert.ok(item.source);
  assert.ok(item.sourceId === 'demo' || SOURCES.some(s => s.id === item.sourceId));
  if (item.quote) {assert.ok(appendix.includes('"' + item.quote + '"'), 'Quotation changed: ' + item.quote); quotes++;}
}
assert.match(BELIEFS[2].now.source, /00:08:00/);
for (const value of [GLOSSARY,WORLDVIEWS,SCENARIOS,BELIEFS,PREDICTS,TRANSITION,SOURCES]) {
  for (const match of JSON.stringify(value).matchAll(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g)) assert.ok(GLOSSARY[match[2] || match[1]], 'Unknown glossary key: ' + match[0]);
}
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!match[1].startsWith('https://')) assert.ok(fs.existsSync(path.join(root,match[1])), 'Missing local asset: '+match[1]);
}
for (const filename of fs.readdirSync(path.join(root,'assets/js'))) {
  const source = fs.readFileSync(path.join(root,'assets/js',filename),'utf8');
  new vm.Script(source, {filename});
  assert.ok(!/\b(?:fetch|XMLHttpRequest|sendBeacon|WebSocket)\s*\(/.test(source), 'Network API in '+filename);
  assert.ok(!/\.innerHTML\s*=/.test(source), 'Unsafe HTML rendering in '+filename);
}
// Text pairs used by both themes must meet WCAG AA's normal-text ratio.
const luminance = hex => {
  const c = hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
  return .2126*c[0]+.7152*c[1]+.0722*c[2];
};
const ratio = (a,b) => (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
const themes = [
  {paper:'f5f3ec',surface:'fffef9',ink:'242c28',muted:'59635b',amber:'805108',amberBg:'f6e8cb',teal:'15594e',tealBg:'e0eee6',purple:'674b7d',purpleBg:'eee5f4',accent:'15594e',onAccent:'ffffff'},
  {paper:'17211d',surface:'202c25',ink:'f0f1e8',muted:'b5c1b7',amber:'efbf69',amberBg:'372d1b',teal:'91d2bb',tealBg:'1a382f',purple:'d6b5ef',purpleBg:'382b43',accent:'a2d9c5',onAccent:'16251e'}
];
let lowest = Infinity;
for (const theme of themes) {
  const pairs = [['ink','paper'],['ink','surface'],['muted','paper'],['muted','surface'],['amber','paper'],['amber','amberBg'],['teal','paper'],['teal','tealBg'],['purple','purpleBg'],['muted','amberBg'],['muted','tealBg'],['muted','purpleBg'],['ink','amberBg'],['ink','tealBg'],['onAccent','accent']];
  for (const [fg,bg] of pairs) {const r=ratio(theme[fg],theme[bg]);lowest=Math.min(lowest,r);assert.ok(r>=4.5, `${fg}/${bg}: ${r.toFixed(2)}`);}
}
console.log(`PASS: ${quotes} unchanged Appendix B quotations; 9 complete scenarios; 21 valid glossary terms; all local assets; JavaScript syntax; no network APIs; text contrast minimum ${lowest.toFixed(2)}:1.`);
