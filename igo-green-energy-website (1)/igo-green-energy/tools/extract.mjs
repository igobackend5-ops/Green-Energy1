/* One-off / repeatable extractor: wraps user-visible text and image paths in T('key','default')
   so every one of them becomes editable from the admin "Page Content" screen.
   usage: node tools/extract.mjs <apply|dry> <file> <keyPrefix>[,<groupFromFunction>] */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';

const [mode, file, prefix, skipArg] = process.argv.slice(2);
const SKIP_GROUPS = new Set((skipArg || '').split(',').filter(Boolean));
let src = fs.readFileSync(file, 'utf8');
if (src.includes("content/T.js")) { console.error('already transformed:', file); process.exit(0); }

const TEXT_ATTR = new Set(['title', 'em', 'text', 'eyebrow', 'label', 'alt', 'placeholder', 'heading', 'sub', 'cta', 'desc', 'description', 'subtitle', 'lead', 'tag', 'caption', 'btn', 'cap']);
const TEXT_PROP = new Set(['title', 'text', 'name', 'value', 't', 'd', 'cap', 'label', 'heading', 'sub', 'eyebrow', 'desc', 'description', 'quote', 'role', 'h', 'p', 'body', 'copy', 'cta', 'em', 'tag', 'caption', 'subtitle', 'lead', 'q', 'a', 'bio', 'summary', 'headline', 'line', 'note', 'tagline', 'stat', 'unit', 'sup', 'alt', 'btn', 'info', 'detail', 'details', 'blurb', 'intro']);
const IMG_PROP = new Set(['img', 'image', 'photo', 'src', 'bg', 'poster', 'picture', 'banner', 'avatar', 'thumb', 'cover']);
const IMG_EXT = /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;
const SKIP_VAL = /^(https?:|mailto:|tel:|#|\/[a-z-]+\/?$)/i;      // links/routes are not copy

const ast = parse(src, { sourceType: 'module', plugins: ['jsx'], errorRecovery: false });
const edits = [], found = [];
let n = 0;
const hasLetters = (s) => /[A-Za-z]{2,}/.test(s);
const looksCopy = (s) => hasLetters(s) && !SKIP_VAL.test(s) && !/^[a-z]+(-[a-z0-9]+)+$/.test(s) && !/^[a-z]+[A-Z]\w*$/.test(s) && !/^(true|false|null|undefined)$/.test(s) && !/^\d+(px|%|vh|vw|rem|em)/.test(s);
const q = (s) => JSON.stringify(s);

let fnName = 'page';
function groupOf(path) { for (let i = path.length - 1; i >= 0; i--) { const p = path[i]; if (p.type === 'FunctionDeclaration' && p.id) return p.id.name; if (p.type === 'VariableDeclarator' && p.id && p.id.name && /^[A-Za-z_]/.test(p.id.name)) return p.id.name; } return 'page'; }

function fnOf(path) { for (let i = 0; i < path.length; i++) { const p = path[i]; if (p.type === 'FunctionDeclaration' && p.id) return p.id.name; if (p.type === 'VariableDeclarator' && p.id && p.init && /Function/.test(p.init.type)) return p.id.name; } return ''; }
function register(node, def, kind, anc, form) {
  const g = groupOf(anc); if (SKIP_GROUPS.has(g)) return; n++;
  const key = `${prefix}.${String(n).padStart(3, '0')}`;
  found.push({ key, def, kind, group: g, fn: fnOf(anc) });
  edits.push({ start: node.start, end: node.end, text: form(key) });
}

function walk(node, anc) {
  if (!node || typeof node.type !== 'string') return;
  const a = [...anc, node];
  switch (node.type) {
    case 'JSXText': {
      const raw = node.value; const t = raw.trim();
      if (t && hasLetters(t) && !/^[<>{}\/=]+$/.test(t)) {
        const lead = raw.length - raw.trimStart().length, trail = raw.length - raw.trimEnd().length;
        const start = node.start + lead, end = node.end - trail;
        const g = groupOf(a); if (SKIP_GROUPS.has(g)) return; n++; const key = `${prefix}.${String(n).padStart(3, '0')}`;
        found.push({ key, def: t.replace(/\s+/g, ' '), kind: 'text', group: g, fn: fnOf(a) });
        edits.push({ start, end, text: `{T(${q(key)}, ${q(t.replace(/\s+/g, ' '))})}` });
      }
      return;
    }
    case 'JSXAttribute': {
      const nm = node.name && node.name.name; const v = node.value;
      if (v && v.type === 'StringLiteral') {
        if (TEXT_ATTR.has(nm) && looksCopy(v.value)) register(v, v.value, 'text', a, (k) => `{T(${q(k)}, ${q(v.value)})}`);
        else if ((nm === 'src' || nm === 'poster') && IMG_EXT.test(v.value) && v.value.startsWith('/') && v.value !== '/logo.png') register(v, v.value, 'image', a, (k) => `{T(${q(k)}, ${q(v.value)})}`);
      }
      break;
    }
    case 'ObjectProperty': {
      const k = node.key && (node.key.name || node.key.value); const v = node.value;
      if (typeof k === 'string') {
        const inJsx = a.some((x) => x.type === 'JSXAttribute' && x.value && x.value.type === 'JSXExpressionContainer' && /style/.test(x.name.name));
        if (!inJsx) {
          const strOf = (x) => (x.type === 'StringLiteral' ? x.value : null);
          if (v.type === 'StringLiteral') {
            if (IMG_PROP.has(k) && IMG_EXT.test(v.value) && v.value.startsWith('/')) register(v, v.value, 'image', a, (kk) => `T(${q(kk)}, ${q(v.value)})`);
            else if (TEXT_PROP.has(k) && looksCopy(v.value)) register(v, v.value, 'text', a, (kk) => `T(${q(kk)}, ${q(v.value)})`);
          } else if (v.type === 'ArrayExpression' && TEXT_PROP.has(k)) {
            for (const el of v.elements) if (el && el.type === 'StringLiteral' && looksCopy(el.value)) register(el, el.value, 'text', a, (kk) => `T(${q(kk)}, ${q(el.value)})`);
          }
        }
      }
      break;
    }
    case 'ArrayExpression': {
      // plain arrays of image paths (e.g. galleries) or sentences declared as const X = [ 'a', 'b' ]
      const parent = anc[anc.length - 1];
      const strs = (arr) => arr.elements.length && arr.elements.every((e) => e && e.type === 'StringLiteral');
      const copyish = (v) => looksCopy(v) && (/\s/.test(v) || /^[A-Z]/.test(v));
      const doStrs = (arr, anc2) => {
        for (const el of arr.elements) {
          if (IMG_EXT.test(el.value) && el.value.startsWith('/')) register(el, el.value, 'image', anc2, (kk) => `T(${q(kk)}, ${q(el.value)})`);
          else if (copyish(el.value)) register(el, el.value, 'text', anc2, (kk) => `T(${q(kk)}, ${q(el.value)})`);
        }
      };
      if (parent && parent.type === 'VariableDeclarator') {
        if (strs(node)) doStrs(node, a);
        else if (node.elements.length && node.elements.every((e) => e && e.type === 'ArrayExpression' && e.elements.every((x) => x && (x.type === 'StringLiteral' || x.type === 'NumericLiteral' || x.type === 'ArrayExpression' || x.type === 'ObjectExpression' || x.type === 'TemplateLiteral' || x.type === 'Identifier' || x.type === 'CallExpression' || x.type === 'MemberExpression' || x.type === 'ConditionalExpression')))) {
          for (const row of node.elements) doStrs({ elements: row.elements.filter((x) => x.type === 'StringLiteral') }, [...a, row]);
        }
      }
      break;
    }
  }
  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'start' || key === 'end') continue;
    const c = node[key];
    if (Array.isArray(c)) c.forEach((x) => walk(x, a)); else if (c && typeof c.type === 'string') walk(c, a);
  }
}
walk(ast.program, []);

if (mode === 'dry') { for (const f of found) console.log(f.key, f.kind.padEnd(5), f.group.padEnd(18), f.def.slice(0, 90)); console.log(found.length, 'strings'); process.exit(0); }

edits.sort((x, y) => y.start - x.start);
for (const e of edits) src = src.slice(0, e.start) + e.text + src.slice(e.end);
// import
const depth = path.relative(path.dirname(file), 'src/content').split(path.sep).join('/') || '.';
const imp = `import { T } from '${depth.startsWith('.') ? depth : './' + depth}/T.js';\n`;
const lastImport = [...src.matchAll(/^import .*;?\s*$/gm)].pop();
const at = lastImport ? lastImport.index + lastImport[0].length : 0;
src = src.slice(0, at) + '\n' + imp.trimEnd() + src.slice(at);
fs.writeFileSync(file, src);
const REG = 'src/content/registry.json';
let reg = []; try { reg = JSON.parse(fs.readFileSync(REG, 'utf8')); } catch { /* new */ }
reg = reg.filter((r) => r.file !== file).concat(found.map((f) => ({ ...f, file })));
fs.writeFileSync(REG, JSON.stringify(reg, null, 1));
console.log('transformed', file, found.length, 'strings');
