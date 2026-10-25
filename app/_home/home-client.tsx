'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Film, FileText, Gauge, Images, Lightbulb, LayoutTemplate, Mail, Menu, MessageCircle, Minus, ShieldCheck, ShoppingBag, Sparkles, X } from 'lucide-react';
import { EMAIL, LINE_URL, VIDEO_MIN, compareRows, faqs, finderGroups, packRules, packs, pains, planExcluded, planRules, plans, services, steps, videos, type Plan, type ServiceKey } from './home-data';
import './home.css';

const serviceIcons: Record<ServiceKey, typeof Film> = {
  posts: Images, video: Film, article: FileText, ecommerce: ShoppingBag, optimize: Gauge, website: LayoutTemplate,
};
const nav = [['#videos', '影音價格'], ['#other', '其他服務'], ['#plans', '包月方案'], ['#finder', '幫我配方案'], ['#faq', '常見問題']] as const;
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
                  return <a key={s.key} href={s.key === 'video' ? '#videos' : `#offer-${s.key}`} className="ace-result-item"><span className="ace-icon"><Icon size={20} /></span><span><strong>{s.name}</strong><small>{s.short}</small></span></a>;
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
          <div><p className="ace-kicker">MONTHLY PLANS</p><h2 className="ace-h2">每月都要內容？<br className="ace-br-sm" />包月最划算。</h2></div>
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
          <a href="#other" className="ace-text-link">只想買單一服務？看其他服務 <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

/** 點標題展開內容；同一區一次只開一項。 */
function useAccordion() {
  const [open, setOpen] = useState(-1);
  return [open, (i: number) => setOpen(open === i ? -1 : i)] as const;
}

/** 老闆痛點輪播：大舞台顯示目前這一則，右側卡片點了就換上來；每 7 秒自動換，滑鼠移入時暫停。 */
function Pains() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = pains.length;
  const go = (d: number) => setActive(i => (i + d + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setActive(i => (i + 1) % n), 7000);
    return () => window.clearInterval(t);
  }, [paused, n]);

  const p = pains[active];
  const next = Array.from({ length: n - 1 }, (_, k) => (active + 1 + k) % n);
  return (
    <section id="why" className="ace-stage" aria-roledescription="carousel" aria-label="老闆的痛點"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      {pains.map((x, i) => <div key={x.tag} className={`ace-stage-bg ace-poster-${i + 1}${i === active ? ' is-on' : ''}`} aria-hidden="true" />)}
      <div className="ace-wrap ace-stage-grid">
        <div className="ace-stage-copy" key={active} aria-live="polite">
          <p className="ace-stage-kicker">老闆的痛，我們都懂 · 痛點 {String(active + 1).padStart(2, '0')}</p>
          <p className="ace-stage-tag">{p.tag}</p>
          <h2>{p.title}</h2>
          <p>{p.body}</p>
          <a href={p.href} className="ace-btn ace-btn-light">{p.href === '#contact' ? '來聊聊' : `看${p.tag}價格`} <ArrowRight size={18} /></a>
        </div>
        <div className="ace-stage-side">
          <div className="ace-stage-cards">
            {next.map(i => (
              <button key={pains[i].tag} className={`ace-stage-card ace-poster-${i + 1}`} onClick={() => setActive(i)} aria-label={`看痛點 ${i + 1}：${pains[i].tag}`}>
                <small>痛點 {String(i + 1).padStart(2, '0')}</small>
                <b>{pains[i].tag}</b>
                <span>{pains[i].title}</span>
              </button>
            ))}
          </div>
          <div className="ace-stage-controls">
            <button aria-label="上一則" onClick={() => go(-1)}><ChevronLeft size={22} /></button>
            <button aria-label="下一則" onClick={() => go(1)}><ChevronRight size={22} /></button>
            <span className="ace-stage-progress"><i style={{ width: `${((active + 1) / n) * 100}%` }} /></span>
            <span className="ace-stage-num">{String(active + 1).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Videos() {
  const [open, toggle] = useAccordion();
  const [copied, setCopied] = useState(false);
  return (
    <section id="videos" className="ace-section ace-videos">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">AI VIDEO</p><h2 className="ace-h2">品牌影音，<br className="ace-br-sm" />用 AI 做只要零頭。</h2></div>
          <p className="ace-muted">點開看外面行情和我們的價格。每種影片一次 {VIDEO_MIN} 支起訂，確保角色、風格與品牌調性一致。</p>
        </div>
        <div className="ace-offer-list">
          {videos.map((v, i) => (
            <article key={v.key} id={`video-${v.key}`} className={open === i ? 'ace-offer is-open' : 'ace-offer'}>
              <button className="ace-offer-head" aria-expanded={open === i} onClick={() => toggle(i)}>
                <span className="ace-offer-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="ace-offer-name">{v.name}</span>
                <span className="ace-offer-price"><small>NT$</small>{money(v.price)}<small>／支</small></span>
                <ChevronDown size={24} className="ace-offer-chev" />
              </button>
              {open === i && (
                <div className="ace-offer-body ace-offer-body-video">
                  <div className="ace-phone">
                    {v.demo
                      ? <video src={v.demo} controls playsInline preload="metadata" aria-label={`${v.name}示範影片`} />
                      : <p><Film size={28} />示範影片<br />即將上線</p>}
                  </div>
                  <div className="ace-deal">
                    <p className="ace-deal-was"><span>{v.marketNote}</span><s>NT${money(v.market)}</s></p>
                    <p className="ace-deal-now"><span>我們只需要</span><strong>NT${money(v.price)}<small>／支</small></strong></p>
                    <p className="ace-deal-min">一次 {VIDEO_MIN} 支 <strong>NT${money(v.price * VIDEO_MIN)}</strong></p>
                  </div>
                  <div className="ace-offer-detail">
                    <p>{v.pitch}</p>
                    <ul>{v.includes.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul>
                    <p className="ace-fit"><span>適合</span>{v.fit}</p>
                    <p className="ace-fit"><span>起訂</span>每次 {VIDEO_MIN} 支，同一批沿用同一組角色與風格，品牌看起來才一致。</p>
                    <button className="ace-btn ace-btn-primary" onClick={async () => setCopied(await askOnLine(`你好，我想訂 A.C.E. 的${v.name} ${VIDEO_MIN} 支（NT$${money(v.price * VIDEO_MIN)}）。`))}>
                      <MessageCircle size={18} /> 訂 {VIDEO_MIN} 支，LINE 詢問
                    </button>
                    {copied && <p className="ace-small ace-muted" aria-live="polite">詢問內容已複製，到 LINE 貼上即可。</p>}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        <p className="ace-note">價格皆未稅。外面行情為一般外包製作的參考價格，實際依廠商而異。</p>
      </div>
    </section>
  );
}

function OtherServices() {
  const [open, toggle] = useAccordion();
  const [copied, setCopied] = useState(false);
  return (
    <section id="other" className="ace-section ace-packs">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">OTHER SERVICES</p><h2 className="ace-h2">其他服務</h2></div>
          <p className="ace-muted">社群圖文、文章、電商、網站，整包單買。每個月都有需求的話，包月划算很多。</p>
        </div>
        <div className="ace-offer-list">
          {packs.map((p, i) => {
            const s = services.find(x => x.key === p.key)!;
            const Icon = serviceIcons[p.key];
            return (
              <article key={p.key} id={`offer-${p.key}`} className={open === i ? 'ace-offer is-open' : 'ace-offer'}>
                <button className="ace-offer-head" aria-expanded={open === i} onClick={() => toggle(i)}>
                  <span className="ace-icon"><Icon size={22} /></span>
                  <span className="ace-offer-name">{s.name}<small>{p.qty}</small></span>
                  <span className="ace-offer-price"><small>NT$</small>{money(p.price)}</span>
                  <ChevronDown size={24} className="ace-offer-chev" />
                </button>
                {open === i && (
                  <div className="ace-offer-body ace-offer-body-single">
                    <div className="ace-offer-detail">
                      <p className="ace-service-short">{s.short}</p>
                      <p>{s.pitch}</p>
                      <ul>{s.includes.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul>
                      <p className="ace-fit"><span>適合</span>{s.fit}</p>
                      <p className="ace-fit"><span>單價</span>{p.per}</p>
                      <button className="ace-btn ace-btn-primary" onClick={async () => setCopied(await askOnLine(`你好，我想單買 A.C.E. 的${s.name} ${p.qty}（NT$${money(p.price)}）。`))}>
                        <MessageCircle size={18} /> LINE 詢問
                      </button>
                      {copied && <p className="ace-small ace-muted" aria-live="polite">詢問內容已複製，到 LINE 貼上即可。</p>}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <ul className="ace-pack-rules">{packRules.map(r => <li key={r}><Check size={16} />{r}</li>)}</ul>
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
              <p className="ace-muted">AI 剪片、AI 數字人、狗血劇商品介紹。外面一支要幾千到幾萬，用 AI 只要零頭。</p>
              <p className="ace-hero-price"><span>AI 剪片每支</span><strong>NT$300</strong><span>起</span></p>
              <div className="ace-actions">
                <a href="#videos" className="ace-btn ace-btn-primary ace-btn-lg">看影音價格 <ArrowRight size={20} /></a>
                <a href="#plans" className="ace-btn ace-btn-ghost ace-btn-lg">包月方案</a>
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
        </div>

        <Pains />

        <Videos />

        <OtherServices />

        <Plans />

        <Compare />

        <Finder />

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
              <p>告訴我們想做哪種影片、品牌現在最想完成的事，我們回覆建議做法與報價。</p>
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
