'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Film, FileText, Gauge, Images, Lightbulb, LayoutTemplate, Mail, Menu, MessageCircle, ShieldCheck, ShoppingBag, Sparkles, X } from 'lucide-react';
import { EMAIL, LINE_URL, clients, faqGroups, packRules, packs, pains, services, videos, type Pain, type ServiceKey } from './home-data';
import './home.css';

const serviceIcons: Record<ServiceKey, typeof Film> = {
  posts: Images, video: Film, article: FileText, ecommerce: ShoppingBag, optimize: Gauge, website: LayoutTemplate,
};
const nav = [['#why', '影音價格'], ['#other', '其他服務'], ['#faq', '常見問題']] as const;
const money = (n: number) => n.toLocaleString('en-US');

/** 先把詢問內容複製到剪貼簿，再開 LINE；沒有剪貼簿權限時照樣開 LINE。 */
async function askOnLine(text: string) {
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch { /* 忽略 */ }
  window.open(LINE_URL, '_blank', 'noopener');
  return copied;
}

/** 價格從 0 跑到定價；使用者關閉動畫時直接顯示。 */
function CountUp({ to, delay = 0 }: { to: number; delay?: number }) {
  const [n, setN] = useState(() => to);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - start) / 900));
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick); else setReady(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay]);
  return <span className={ready ? 'ace-count is-done' : 'ace-count'}>{money(n)}</span>;
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

/** 老闆痛點輪播：排隊的小圖往左前進，第一張放大成整個舞台，再換成大圖。每 7 秒自動換，滑鼠移入時暫停。 */
function Pains() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const n = pains.length;
  const show = (i: number) => setActive(a => { if (i !== a) setPrev(a); return i; });
  const go = (d: number) => setActive(a => { setPrev(a); return (a + d + n) % n; });

  useEffect(() => {
    const onJump = (e: Event) => show((e as CustomEvent<number>).detail);
    window.addEventListener('ace:pain', onJump);
    return () => window.removeEventListener('ace:pain', onJump);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(t);
  }, [paused, active]);

  const p = pains[active];
  const v = videos.find(x => x.key === p.video);
  const offer = v ?? (p.market && p.price ? { name: p.tag, market: p.market, price: p.price } : null);
  const bg = (x: Pain, i: number, big: boolean) => {
    const src = big ? x.image ?? x.thumb : x.thumb ?? x.image;
    return { className: src ? big && x.mobileImage ? 'has-mobile-image' : '' : `ace-poster-${i + 1}`, style: src ? big
      ? { '--stage-image': `url(${src})`, '--stage-mobile-image': `url(${x.mobileImage ?? src})`, '--stage-position': x.imagePosition ?? 'center', '--stage-tablet-bottom': `${x.tabletImageBottom ?? 40}px` } as CSSProperties
      : { backgroundImage: `url(${src})` } : undefined };
  };
  return (
    <section id="why" className="ace-stage" aria-roledescription="carousel" aria-label="老闆的痛，我們都懂"
      onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setPaused(true); }}
      onMouseLeave={() => setPaused(false)}
      onFocus={e => { if (e.target.matches(':focus-visible')) setPaused(true); }}
      onBlur={() => setPaused(false)}>
      {pains.map((x, i) => {
        const b = bg(x, i, true);
        return <div key={x.tag} className={`ace-stage-bg ${b.className}${i === active ? ' is-on' : ''}`} style={b.style} aria-hidden="true" />;
      })}
      {pains.map((x, i) => {
        const k = (i - active - 1 + n) % n;
        const b = bg(x, i, false);
        const state = i === active ? ' is-active' : i === prev ? ' is-returning' : '';
        return (
          <button key={x.tag} className={`ace-stage-card ${b.className}${state}`} style={{ ...b.style, ['--k' as string]: k, ['--wide-image' as string]: `url(${x.image ?? x.thumb})` }}
            onClick={() => show(i)} tabIndex={i === active ? -1 : 0} aria-hidden={i === active} aria-label={`第 ${i + 1} 則：${x.tag}，${x.title}`}>
            <span className="ace-stage-card-num">{i + 1}</span>
            <b>{x.tag}</b>
          </button>
        );
      })}
      <div className="ace-wrap ace-stage-copy" key={active} aria-live="polite">
        <p className="ace-stage-head"><span className="ace-stage-num-big" aria-label={`第 ${active + 1} 則`}>{active + 1}</span><span className="ace-stage-tag">{p.tag}</span></p>
        <h2>{p.title}</h2>
        <p>{p.body}</p>
        {offer && (
          <p className="ace-stage-price">
            <span>外面行情 <s>NT${money(offer.market)}</s></span>
            <span>我們只需要 <strong>NT${money(offer.price)}</strong><small>／支</small></span>
          </p>
        )}
        {!offer && <a href={p.href} className="ace-btn ace-btn-light">{p.href === '#contact' ? '來聊聊' : `看${p.tag}價格`} <ArrowRight size={18} /></a>}
      </div>
      <div className="ace-stage-controls">
        <span className="ace-stage-progress"><i style={{ width: `${((active + 1) / n) * 100}%` }} /></span>
        <span className="ace-stage-num">{active + 1}</span>
      </div>
    </section>
  );
}

/** 其他服務：左邊一張大卡（照片＋介紹），右邊其餘的小圖卡，點小卡就換到左邊。 */
function OtherServices() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const p = packs[active];
  const s = services.find(x => x.key === p.key)!;
  const Icon = serviceIcons[p.key];
  return (
    <section id="other" className="ace-section ace-packs">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">OTHER SERVICES</p><h2 className="ace-h2">其他服務</h2></div>
          <p className="ace-muted">社群圖文、文章、電商、網站，整包單買，每件含一次修改。</p>
        </div>
        <div className="ace-shelf">
          <article key={p.key} id={`offer-${p.key}`} className={`ace-shelf-main ace-tone-${p.key}`}>
            <div className="ace-shelf-photo" style={s.image ? { backgroundImage: `url(${s.image})` } : undefined}>
              {!s.image && <Icon size={64} strokeWidth={1.25} />}
            </div>
            <div className="ace-shelf-body">
              <p className="ace-shelf-qty">{p.qty}・<strong>NT${money(p.price)}</strong><small>{p.per}</small></p>
              <h3>{s.name}</h3>
              <p className="ace-service-short">{s.short}</p>
              <p>{s.pitch}</p>
              <ul>{s.includes.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul>
              <button className="ace-btn ace-btn-primary" onClick={async () => setCopied(await askOnLine(`你好，我想單買 A.C.E. 的${s.name} ${p.qty}（NT$${money(p.price)}）。`))}>
                <MessageCircle size={18} /> LINE 詢問
              </button>
              {copied && <p className="ace-small ace-muted" aria-live="polite">詢問內容已複製，到 LINE 貼上即可。</p>}
            </div>
          </article>
          <div className="ace-shelf-grid">
            {packs.map((q, i) => {
              if (i === active) return null;
              const t = services.find(x => x.key === q.key)!;
              const I = serviceIcons[q.key];
              return (
                <button key={q.key} id={`offer-${q.key}`} className={`ace-shelf-card ace-tone-${q.key}`} onClick={() => { setActive(i); setCopied(false); }} aria-label={`看${t.name}`}>
                  <span className="ace-shelf-photo" style={t.thumb || t.image ? { backgroundImage: `url(${t.thumb ?? t.image})` } : undefined}>{!t.thumb && !t.image && <I size={32} strokeWidth={1.5} />}</span>
                  <span className="ace-shelf-label"><b>{t.name}</b><small>{q.qty}・NT${money(q.price)}</small></span>
                </button>
              );
            })}
          </div>
        </div>
        <ul className="ace-pack-rules">{packRules.map(r => <li key={r}><Check size={16} />{r}</li>)}</ul>
      </div>
    </section>
  );
}

/** 合作客戶：三排 logo 卡片像牌桌一樣對向滑動，捲到這裡時先發牌進場；滑鼠移上去會停。 */
function Clients() {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: .25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const rows = [clients.slice(0, 9), clients.slice(9, 18), clients.slice(18)];
  return (
    <section id="clients" ref={ref} className={seen ? 'ace-section ace-clients is-in' : 'ace-section ace-clients'}>
      <div className="ace-wrap ace-head-row">
        <div><p className="ace-kicker">CLIENTS</p><h2 className="ace-h2">合作品牌</h2></div>
        <p className="ace-muted">從連鎖品牌到在地店家，近十年累積超過 100 家合作客戶。</p>
      </div>
      <div className="ace-table" aria-label="合作客戶">
        {rows.map((row, r) => (
          <div key={r} className={`ace-table-row ace-table-row-${r + 1}`} style={{ ['--n' as string]: row.length }}>
            {[0, 1].map(copy => (
              <div key={copy} className="ace-table-track" aria-hidden={copy === 1}>
                {row.map((c, i) => (
                  <figure key={c.slug} className="ace-chip" style={{ ['--i' as string]: r * 9 + i, ['--tilt' as string]: `${((i * 7 + r * 3) % 7) - 3}deg` }}>
                    <img src={`/home/clients/${c.slug}.webp`} alt={copy === 0 ? c.name : ''} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const group = faqGroups[tab];
  return (
    <section id="faq" className="ace-section">
      <div className="ace-wrap ace-faq">
        <div className="ace-faq-side">
          <p className="ace-kicker">FAQ</p>
          <h2 className="ace-h2">常見問題</h2>
          <p className="ace-muted">沒找到答案？直接用 LINE 問我們。</p>
          <a className="ace-btn ace-btn-primary" href={LINE_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> LINE 直接問</a>
        </div>
        <div>
          <div className="ace-tabs ace-faq-tabs" role="tablist">
            {faqGroups.map((g, i) => <button key={g.label} role="tab" aria-selected={tab === i} className={tab === i ? 'is-active' : ''} onClick={() => { setTab(i); setOpen(0); }}>{g.label}</button>)}
          </div>
          <div className="ace-faq-list" key={tab}>
            {group.items.map((f, i) => (
              <div key={f.q} className={open === i ? 'ace-faq-item is-open' : 'ace-faq-item'}>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{f.q}<ChevronDown size={20} /></button>
                {open === i && (
                  <p>{f.a}{f.link && <> {f.link.href.startsWith('/') ? <Link href={f.link.href}>{f.link.label} →</Link> : <a href={f.link.href}>{f.link.label} →</a>}</>}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 首頁王牌卡片點了之後，要讓痛點輪播切到那一支影片 */
const setPain = (i: number) => window.dispatchEvent(new CustomEvent('ace:pain', { detail: i }));

export default function HomePage({ fontClass = '' }: { fontClass?: string }) {
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (heroVideoRef.current && heroVideoRef.current.readyState >= 2) setHeroVideoReady(true);
  }, []);
  return (
    <div className={`ace ${fontClass}`}>
      <Header />
      <main>
        <section className="ace-hero">
          <div className="ace-hero-bg">
            <picture className="ace-hero-poster">
              <source media="(max-width: 820px)" srcSet="/home/hero-mobile.webp" />
              <img src="/home/hero-wide.webp" srcSet="/home/hero-wide-1100.webp 1100w, /home/hero-wide.webp 1672w" sizes="100vw" alt="手持透明黑桃 A 王牌、被孔雀藍與橘色絲帶環繞的品牌代言人" width={1672} height={941} fetchPriority="high" />
            </picture>
            <video ref={heroVideoRef} className={`ace-hero-video${heroVideoReady ? ' is-ready' : ''}`} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" onLoadedData={() => setHeroVideoReady(true)}>
              <source src="/home/hero-motion.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
            </video>
          </div>
          <div className="ace-wrap">
            <div className="ace-hero-copy">
              <p className="ace-kicker">AI · CREATIVE · EXECUTION</p>
              <h1 className="ace-h1"><span>讓 AI 成為</span><span>每個品牌的 <em>王牌</em></span></h1>
              <p className="ace-lead">品牌影音、社群圖文、搜尋文章、網站，<br />外面一支要幾千到幾萬，我們只需要零頭。</p>
              <div className="ace-aces" aria-label="三種 AI 影片的價格">
                {videos.map((v, i) => (
                  <a key={v.key} href="#why" className="ace-ace-card" style={{ animationDelay: `${.55 + i * .13}s` }} onClick={() => setPain(i)}>
                    <span className="ace-ace-suit">{['♠', '♥', '♦'][i]}</span>
                    <b>{v.name}</b>
                    <strong><small>NT$</small><CountUp to={v.price} delay={700 + i * 130} /><small>／支</small></strong>
                    <s>外面 NT${money(v.market)}</s>
                  </a>
                ))}
              </div>
              <div className="ace-actions">
                <a href="#why" className="ace-btn ace-btn-primary ace-btn-lg">看影片價格 <ArrowRight size={20} /></a>
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="ace-btn ace-btn-ghost ace-btn-lg"><MessageCircle size={20} /> LINE 直接聊</a>
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

        <OtherServices />

        <Clients />

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

        <Faq />

        <section id="contact" className="ace-section ace-contact">
          <div className="ace-wrap ace-contact-card">
            <div>
              <p className="ace-kicker">LET'S TALK</p>
              <h2 className="ace-h2">把你的影音行銷，<br />交給王牌。</h2>
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
