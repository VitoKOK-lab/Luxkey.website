'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Film, FileText, Gauge, Images, Lightbulb, LayoutTemplate, Mail, Menu, MessageCircle, Minus, ShieldCheck, ShoppingBag, Sparkles, X } from 'lucide-react';
import { EMAIL, LINE_URL, compareRows, faqs, finderGroups, planExcluded, planRules, plans, services, steps, type Plan, type ServiceKey } from './home-data';
import './home.css';

const serviceIcons: Record<ServiceKey, typeof Film> = {
  posts: Images, video: Film, article: FileText, ecommerce: ShoppingBag, optimize: Gauge, website: LayoutTemplate,
};
const nav = [['#plans', '方案價格'], ['#compare', '為什麼訂閱'], ['#services', '服務內容'], ['#finder', '幫我配方案'], ['#faq', '常見問題']] as const;
const money = (n: number) => n.toLocaleString('en-US');

/** 先把詢問內容複製到剪貼簿，再開 LINE；沒有剪貼簿權限時照樣開 LINE。 */
async function askOnLine(text: string) {
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch { /* 忽略 */ }
  window.open(LINE_URL, '_blank', 'noopener');
  return copied;
}

export function Brand() {
  return (
    <Link href="/" className="ace-brand" aria-label="A.C.E. 首頁">
      <img src="/home/ace-mark.webp" alt="" width={46} height={45} />
      <span><strong>A.C.E<i>.</i></strong><small>讓 AI 成為每個品牌的王牌</small></span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="ace-footer">
      <div className="ace-wrap ace-footer-row">
        <Brand />
        <div className="ace-footer-info">
          <p>金曜石國際股份有限公司（LUXKEY）</p>
          <p>臺北市信義區信義路四段458號6樓 · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <p><Link href="/introduce/">經銷合作</Link> · <Link href="/privacy/">隱私說明</Link> · © {new Date().getFullYear()} A.C.E.</p>
        </div>
      </div>
    </footer>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="ace-header">
      <div className="ace-wrap ace-header-row">
        <Brand />
        <nav className={open ? 'ace-nav is-open' : 'ace-nav'} aria-label="主選單">
          {nav.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="#contact" className="ace-btn ace-btn-primary ace-nav-cta" onClick={() => setOpen(false)}>立即諮詢 <ArrowRight size={18} /></a>
        </nav>
        <button className="ace-menu" aria-label={open ? '關閉選單' : '開啟選單'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Finder() {
  const [tab, setTab] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const recommended = useMemo(() => {
    const score = new Map<ServiceKey, number>();
    finderGroups.flatMap(g => g.options).filter(o => picked.includes(o.label))
      .forEach(o => o.services.forEach(s => score.set(s, (score.get(s) ?? 0) + 1)));
    return services.filter(s => score.has(s.key)).sort((a, b) => score.get(b.key)! - score.get(a.key)!);
  }, [picked]);

  const toggle = (label: string) => {
    setShown(false);
    setPicked(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label]);
  };
  const plan = plans.find(p => p.key === (recommended.some(s => s.key === 'ecommerce' || s.key === 'optimize') || picked.length >= 4 ? 'growth' : 'standard'))!;
  const brief = `你好，我想了解 A.C.E. 的${plan.name}方案。\n我的需求：${picked.join('、')}\n想做的內容：${recommended.map(s => s.name).join('、')}`;
  const contactLine = async () => setCopied(await askOnLine(brief));

  return (
    <section id="finder" className="ace-section ace-finder">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">FIND YOUR SOLUTION</p><h2 className="ace-h2">現在最想完成什麼？</h2></div>
          <p className="ace-muted">選出你的需求，我們幫你配好內容與方案。</p>
        </div>
        <div className="ace-card ace-finder-card">
          <div className="ace-tabs" role="tablist">
            {finderGroups.map((g, i) => {
              const count = g.options.filter(o => picked.includes(o.label)).length;
              return <button key={g.label} role="tab" aria-selected={tab === i} className={tab === i ? 'is-active' : ''} onClick={() => setTab(i)}>{g.label}{count > 0 && <span>{count}</span>}</button>;
            })}
          </div>
          <div className="ace-options">
            {finderGroups[tab].options.map(o => {
              const on = picked.includes(o.label);
              return (
                <button key={o.label} className={on ? 'ace-option is-on' : 'ace-option'} aria-pressed={on} onClick={() => toggle(o.label)}>
                  <span className="ace-check">{on && <Check size={15} />}</span>{o.label}
                </button>
              );
            })}
          </div>
          <div className="ace-finder-foot">
            <p className="ace-muted">{picked.length ? `已選 ${picked.length} 項，可跨分類複選` : '可複選不同需求'}</p>
            <div className="ace-actions">
              <button className="ace-btn ace-btn-ghost" onClick={() => { setPicked([]); setShown(false); setCopied(false); }}>重新選擇</button>
              <button className="ace-btn ace-btn-primary" onClick={() => setShown(true)} disabled={!picked.length}>查看推薦 <ArrowRight size={18} /></button>
            </div>
          </div>
          {shown && recommended.length > 0 && (
            <div className="ace-result" aria-live="polite">
              <div className="ace-result-plan">
                <span><small>建議方案</small><strong>{plan.name}方案</strong></span>
                <span className="ace-result-price">NT${money(plan.price)}<small>{plan.unit}</small></span>
                <p>不確定的話，先用 NT$9,800 嚐鮮一個月。</p>
              </div>
              <p className="ace-result-title">每月可以這樣安排：</p>
              <div className="ace-result-grid">
                {recommended.map(s => {
                  const Icon = serviceIcons[s.key];
                  return <a key={s.key} href={`#service-${s.key}`} className="ace-result-item"><span className="ace-icon"><Icon size={20} /></span><span><strong>{s.name}</strong><small>{s.short}</small></span></a>;
                })}
              </div>
              <div className="ace-actions">
                <button className="ace-btn ace-btn-primary" onClick={contactLine}><MessageCircle size={18} /> 帶著需求到 LINE 詢問</button>
                <a className="ace-btn ace-btn-ghost" href="#plans">比較三個方案</a>
              </div>
              {copied && <p className="ace-muted ace-small">需求已複製，到 LINE 對話框貼上即可。</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const [copied, setCopied] = useState(false);
  const ask = async () => setCopied(await askOnLine(`你好，我想了解 A.C.E. 的${plan.name}方案（NT$${money(plan.price)}${plan.unit}）。`));
  return (
    <article className={plan.featured ? 'ace-plan is-featured' : 'ace-plan'}>
      {plan.featured && <p className="ace-plan-badge">最多品牌選擇</p>}
      <p className="ace-plan-en">{plan.en}</p>
      <h3>{plan.name}</h3>
      <p className="ace-plan-tagline">{plan.tagline}</p>
      <p className="ace-plan-price"><small>NT$</small>{money(plan.price)}<span>{plan.unit}</span></p>
      <ul className="ace-plan-items">
        {plan.items.map(([k, v]) => <li key={k}><span>{k}</span><strong>{v}</strong></li>)}
      </ul>
      <ul className="ace-plan-perks">{plan.perks.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul>
      <button className={plan.featured ? 'ace-btn ace-btn-primary' : 'ace-btn ace-btn-ghost'} onClick={ask}>
        {plan.key === 'trial' ? '我要嚐鮮' : `諮詢${plan.name}方案`} <ArrowRight size={18} />
      </button>
      {copied && <p className="ace-small ace-muted" aria-live="polite">詢問內容已複製，到 LINE 貼上即可。</p>}
    </article>
  );
}

function Plans() {
  return (
    <section id="plans" className="ace-section ace-plans">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">PLANS & PRICING</p><h2 className="ace-h2">價格一次到底，<br className="ace-br-sm" />全台同一價。</h2></div>
          <p className="ace-muted">季約、年約同價，不議價、不打折。年約加贈公版官網，新技術免費升級。</p>
        </div>
        <div className="ace-plan-grid">{plans.map(p => <PlanCard key={p.key} plan={p} />)}</div>
        <p className="ace-note">價格皆未稅。短影音形式可在 AI 剪輯、數字人口播、商品介紹片、劇情短片之間任選。</p>
        <div className="ace-plan-rules">
          {planRules.map((r, i) => <div key={r.title}><span>{String(i + 1).padStart(2, '0')}</span><strong>{r.title}</strong><p>{r.body}</p></div>)}
        </div>
        <div className="ace-custom">
          <div>
            <strong>方案不包含</strong>
            <ul className="ace-excluded">{planExcluded.map(x => <li key={x}><Minus size={16} />{x}</li>)}</ul>
          </div>
          <a href="#contact" className="ace-text-link">有特殊需求？先問問 <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section id="compare" className="ace-section ace-compare-section">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">WHY SUBSCRIBE</p><h2 className="ace-h2">比請一個小編，<br className="ace-br-sm" />更省也更穩。</h2></div>
          <p className="ace-muted">AI 讓內容的成本趨近於零，我們把省下來的，直接反映在價格上。</p>
        </div>
        <div className="ace-compare" role="table" aria-label="請一位小編與 A.C.E. 標準方案比較">
          <div className="ace-compare-row is-head" role="row">
            <span role="columnheader"><span className="ace-sr">項目</span></span>
            <span role="columnheader">請一位小編</span>
            <span role="columnheader">A.C.E. 標準方案</span>
          </div>
          {compareRows.map(([k, a, b]) => (
            <div key={k} className="ace-compare-row" role="row">
              <span role="rowheader">{k}</span>
              <span role="cell">{a}</span>
              <span role="cell"><Check size={16} />{b}</span>
            </div>
          ))}
        </div>
        <p className="ace-note">小編成本以月薪約 3 萬元加勞健保估算，實際依地區與資歷而異。</p>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="ace-section">
      <div className="ace-wrap ace-faq">
        <div><p className="ace-kicker">FAQ</p><h2 className="ace-h2">常見問題</h2><p className="ace-muted">沒找到答案？直接用 LINE 問我們。</p></div>
        <div className="ace-faq-list">
          {faqs.map((f, i) => (
            <div key={f.q} className={open === i ? 'ace-faq-item is-open' : 'ace-faq-item'}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{f.q}<ChevronDown size={20} /></button>
              {open === i && <p>{f.a}{i === faqs.length - 1 && <> <Link href="/introduce/">看經銷合作 →</Link></>}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ fontClass = '' }: { fontClass?: string }) {
  return (
    <div className={`ace ${fontClass}`}>
      <Header />
      <main>
        <section className="ace-hero">
          <picture className="ace-hero-bg">
            <source media="(max-width: 820px)" srcSet="/home/hero-mobile.webp" />
            <img src="/home/hero-wide.webp" srcSet="/home/hero-wide-1100.webp 1100w, /home/hero-wide.webp 1672w" sizes="100vw" alt="手持透明黑桃 A 王牌、被孔雀藍與橘色絲帶環繞的品牌代言人" width={1672} height={941} fetchPriority="high" />
          </picture>
          <div className="ace-wrap">
            <div className="ace-hero-copy">
              <p className="ace-kicker">AI · CREATIVE · EXECUTION</p>
              <h1 className="ace-h1"><span>讓 AI 成為</span><span>每個品牌的 <em>王牌</em></span></h1>
              <p className="ace-lead">用 AI 創造更多好內容，<br />讓每個品牌都能被看見、被記住、被喜歡。</p>
              <p className="ace-muted">社群圖文、短影音、搜尋文章、網站優化，每月固定交付。一個小編的價格，整組 AI 團隊的產量，技術永遠是最新的。</p>
              <p className="ace-hero-price"><span>月費</span><strong>NT$29,800</strong><span>起</span><span className="ace-hero-trial">先嚐鮮 NT$9,800</span></p>
              <div className="ace-actions">
                <a href="#plans" className="ace-btn ace-btn-primary ace-btn-lg">看方案與價格 <ArrowRight size={20} /></a>
                <a href="#finder" className="ace-btn ace-btn-ghost ace-btn-lg">幫我配方案</a>
              </div>
            </div>
          </div>
        </section>

        <div className="ace-wrap ace-lift">
          <div className="ace-card ace-trust">
            {[[Lightbulb, '近十年經驗', '行銷與品牌設計'], [Sparkles, '100+ 合作客戶', '跨產業合作經驗'], [ShieldCheck, '政府合作經驗', '品牌影音行銷顧問']].map(([Icon, t, s]) => {
              const I = Icon as typeof Film;
              return <div key={t as string}><span className="ace-icon ace-icon-line"><I size={22} /></span><span><strong>{t as string}</strong><small>{s as string}</small></span></div>;
            })}
          </div>
          <div className="ace-card ace-service-strip">
            {services.map(s => {
              const Icon = serviceIcons[s.key];
              return <a key={s.key} href={`#service-${s.key}`}><span className="ace-icon ace-icon-lg"><Icon size={26} /></span><strong>{s.name}</strong><small>看內容</small></a>;
            })}
          </div>
        </div>

        <Plans />

        <Compare />

        <Finder />

        <section id="services" className="ace-section ace-services">
          <div className="ace-wrap">
            <div className="ace-head-row">
              <div><p className="ace-kicker">WHAT'S INSIDE</p><h2 className="ace-h2">六張王牌，<br className="ace-br-sm" />都在月費裡。</h2></div>
              <p className="ace-muted">版型、角色、流程都做好了，你只要提供品牌資料，每月照排程交付。</p>
            </div>
            <div className="ace-service-list">
              {services.map((s, i) => {
                const Icon = serviceIcons[s.key];
                return (
                  <article key={s.key} id={`service-${s.key}`} className="ace-service">
                    <div className="ace-service-top">
                      <span className="ace-icon ace-icon-lg"><Icon size={26} /></span>
                      <p className="ace-index">{String(i + 1).padStart(2, '0')}</p>
                    </div>
                    <h3>{s.name}</h3>
                    <p className="ace-service-short">{s.short}</p>
                    <p className="ace-muted">{s.pitch}</p>
                    <ul>{s.includes.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul>
                    <p className="ace-fit"><span>適合</span>{s.fit}</p>
                    <p className="ace-template"><span>份量</span>{s.quota}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="ace-section ace-about">
          <div className="ace-wrap ace-about-grid">
            <img src="/home/studio.webp" alt="攝影師在明亮攝影棚拍攝品牌代言人介紹保養品" loading="lazy" />
            <div>
              <p className="ace-kicker">WHY A.C.E.</p>
              <h2 className="ace-h2">近十年的專業，<br />現在有了 AI 的速度。</h2>
              <p className="ace-muted">從短影音到品牌網站，我們累積近十年的行銷設計經驗，服務過上百家客戶。現在把 AI 導入既有工作流程，兼顧品質、效率與合理成本。</p>
              <div className="ace-ace">
                {[['A', 'AI', 'AI 驅動製作'], ['C', 'Creative', '品牌行銷創意'], ['E', 'Execution', '高效落地執行']].map(([l, en, zh]) => (
                  <div key={l}><b>{l}</b><strong>{en}</strong><small>{zh}</small></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="ace-section ace-steps-section">
          <div className="ace-wrap">
            <p className="ace-kicker">HOW IT WORKS</p>
            <h2 className="ace-h2">合作流程</h2>
            <ol className="ace-steps">
              {steps.map((s, i) => <li key={s.title}><span>{String(i + 1).padStart(2, '0')}</span><strong>{s.title}</strong><p>{s.body}</p></li>)}
            </ol>
          </div>
        </section>

        <Faq />

        <section id="contact" className="ace-section ace-contact">
          <div className="ace-wrap ace-contact-card">
            <div>
              <p className="ace-kicker">LET'S TALK</p>
              <h2 className="ace-h2">把你的下一張王牌，<br />交給我們。</h2>
              <p>先用 NT$9,800 嚐鮮一個月，看到成品再決定。告訴我們品牌現在最想完成的事，我們回覆建議做法。</p>
            </div>
            <div className="ace-contact-actions">
              <a className="ace-btn ace-btn-light ace-btn-lg" href={LINE_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> LINE 直接聊</a>
              <a className="ace-btn ace-btn-outline-light ace-btn-lg" href={`mailto:${EMAIL}?subject=${encodeURIComponent('A.C.E. 服務詢問')}`}><Mail size={20} /> {EMAIL}</a>
            </div>
          </div>
          <div className="ace-wrap ace-partner">
            <span>行銷公司、顧問、接案夥伴？</span>
            <Link href="/introduce/">看經銷合作方案 <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
