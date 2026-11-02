'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, ClipboardCopy, ExternalLink, Mail, MessageCircle, Upload } from 'lucide-react';
import { Brand, Footer } from '../_home/home-client';
import { EMAIL, LINE_URL, promoActive } from '../_home/home-data';
import '../_home/home.css';
import './brief.css';
import { DRIVE_UPLOAD_URL, sections, uploadList, type Field, type Values } from './brief-data';

const STORE = 'ace-brief-v1';
const asList = (x: string | string[] | undefined) => (Array.isArray(x) ? x : x ? [x] : []);
const filled = (x: string | string[] | undefined) => asList(x).some(s => s.trim() !== '');

function Chips({ f, value, onChange }: { f: Field; value: string | string[] | undefined; onChange: (v: string | string[]) => void }) {
  const multi = f.kind === 'multi';
  const cur = asList(value);
  return (
    <div className="bf-chips" role={multi ? 'group' : 'radiogroup'} aria-label={f.label}>
      {f.options!.map(o => {
        const on = cur.includes(o);
        return (
          <label key={o} className={on ? 'bf-chip is-on' : 'bf-chip'}>
            <input type={multi ? 'checkbox' : 'radio'} name={f.key} checked={on}
              onChange={() => onChange(multi ? (on ? cur.filter(x => x !== o) : [...cur, o]) : o)}
              onClick={() => { if (!multi && on) onChange(''); }} />
            {on && <Check size={14} />}{o}
          </label>
        );
      })}
    </div>
  );
}

export default function BriefPage({ fontClass = '' }: { fontClass?: string }) {
  const [v, setV] = useState<Values>({});
  const [promo, setPromo] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState('');
  const [note, setNote] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPromo(promoActive());
    try { const s = localStorage.getItem(STORE); if (s) setV(JSON.parse(s)); } catch { /* 瀏覽器不給存也沒關係 */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORE, JSON.stringify(v)); } catch { /* 同上 */ }
  }, [v, ready]);

  const ctx = useMemo(() => ({ promo }), [promo]);
  const set = (key: string, val: string | string[]) => { setV(p => ({ ...p, [key]: val })); setResult(''); };
  const visible = sections.filter(s => !s.show || s.show(v, ctx));

  const build = () => {
    const lines = ['【ACE Impact 需求單】'];
    for (const s of visible) {
      const rows = s.fields.filter(f => (!f.show || f.show(v, ctx)) && filled(v[f.key])).map(f => `${f.label.replace(/（選填）/, '')}：${asList(v[f.key]).join('、')}`);
      if (rows.length) lines.push('', `■ ${s.title.replace(/^\d\.\s*/, '')}`, ...rows);
    }
    lines.push('', `素材上傳：${DRIVE_UPLOAD_URL ? '請見 Google Drive' : '待業務提供上傳連結'}`, `填寫時間：${new Date().toLocaleString('zh-TW', { hour12: false })}`);
    return lines.join('\n');
  };

  const submit = () => {
    const missing = visible.flatMap(s => s.fields).filter(f => f.required && (!f.show || f.show(v, ctx)) && !filled(v[f.key])).map(f => f.key);
    setErrors(missing);
    if (missing.length) {
      document.getElementById(`bf-${missing[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setResult(build());
    setNote('');
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(result); setNote('已複製。到 LINE 或 Email 貼上就能送出。'); return true; }
    catch { setNote('這個瀏覽器不能自動複製，請長按下方文字全選後複製。'); return false; }
  };
  const viaLine = async () => { await copy(); window.open(LINE_URL, '_blank', 'noopener'); };
  const viaMail = async () => {
    await copy();
    const subject = encodeURIComponent(`ACE Impact 需求單｜${asList(v.brand)[0] ?? ''}`);
    const body = encodeURIComponent('需求單內容已複製到剪貼簿，請在這裡貼上後送出。');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={`ace ${fontClass}`}>
      <header className="ace-header">
        <div className="ace-wrap ace-header-row">
          <Brand />
          <a href="/#contact" className="ace-btn ace-btn-primary">立即諮詢</a>
        </div>
      </header>
      <main className="ace-section bf">
        <div className="ace-wrap bf-wrap">
          <p className="ace-kicker">BRIEF</p>
          <h1 className="ace-h2">需求單</h1>
          <p className="ace-muted bf-lead">約 3–5 分鐘。不確定的欄位先空著，業務會再跟你確認。填寫內容只存在你的瀏覽器，按下送出前不會傳給任何人。</p>

          {visible.map(s => (
            <section key={s.id} className="ace-card bf-card" aria-labelledby={`bf-h-${s.id}`}>
              <h2 id={`bf-h-${s.id}`}>{s.title}</h2>
              {s.hint && <p className="bf-hint">{s.hint}</p>}
              {s.fields.filter(f => !f.show || f.show(v, ctx)).map(f => (
                <div key={f.key} id={`bf-${f.key}`} className={errors.includes(f.key) ? 'bf-field has-error' : 'bf-field'}>
                  <label className="bf-label" htmlFor={f.kind === 'text' || f.kind === 'textarea' ? `bf-in-${f.key}` : undefined}>
                    {f.label}{f.required && <em>必填</em>}
                  </label>
                  {f.hint && <p className="bf-hint">{f.hint}</p>}
                  {f.kind === 'text' && <input id={`bf-in-${f.key}`} type="text" value={asList(v[f.key])[0] ?? ''} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)} />}
                  {f.kind === 'textarea' && <textarea id={`bf-in-${f.key}`} rows={3} value={asList(v[f.key])[0] ?? ''} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)} />}
                  {(f.kind === 'single' || f.kind === 'multi') && <Chips f={f} value={v[f.key]} onChange={val => set(f.key, val)} />}
                  {errors.includes(f.key) && <p className="bf-err" role="alert">這一項要填</p>}
                </div>
              ))}
              {s.id === 'upload' && (
                <div className="bf-upload">
                  <p className="bf-label">請準備這些素材</p>
                  <ul>{uploadList(v).map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
                  {DRIVE_UPLOAD_URL
                    ? <a className="ace-btn ace-btn-primary" href={DRIVE_UPLOAD_URL} target="_blank" rel="noopener noreferrer"><Upload size={18} />上傳素材（Google Drive）<ExternalLink size={14} /></a>
                    : <p className="bf-hint">上傳連結會在你送出需求單後，由業務用 LINE 傳給你。</p>}
                </div>
              )}
            </section>
          ))}

          <div className="bf-submit">
            <button type="button" className="ace-btn ace-btn-primary ace-btn-lg" onClick={submit}>產生需求單 <ArrowRight size={20} /></button>
            {errors.length > 0 && <p className="bf-err" role="alert">還有 {errors.length} 項必填沒填，已幫你捲到第一個。</p>}
          </div>

          {result && (
            <div className="ace-card bf-card bf-result" ref={resultRef} aria-live="polite">
              <h2>確認並送出</h2>
              <p className="bf-hint">需求單已產生。選一個方式送給我們，內容會先複製起來，到對話框貼上即可。</p>
              <textarea readOnly rows={Math.min(18, result.split('\n').length + 1)} value={result} onFocus={e => e.currentTarget.select()} aria-label="需求單全文" />
              <div className="bf-actions">
                <button type="button" className="ace-btn ace-btn-primary" onClick={viaLine}><MessageCircle size={18} />複製並開啟 LINE</button>
                <button type="button" className="ace-btn ace-btn-ghost" onClick={viaMail}><Mail size={18} />複製並寫 Email</button>
                <button type="button" className="ace-btn ace-btn-ghost" onClick={copy}><ClipboardCopy size={18} />只複製</button>
              </div>
              {note && <p className="bf-note" role="status">{note}</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
