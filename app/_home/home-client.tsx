'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Pause, Play, Lightbulb, Mail, Menu, MessageCircle, ShieldCheck, Sparkles, X } from 'lucide-react';
import { EMAIL, LINE_URL, DEMO_POSTER, DEMO_VIDEO, addOns, clients, planTerms, plans, faqGroups, flow, pains, videos, whyProof, whyUs, whyVs, works, worksGroups, type Pain, type PlanTerm, type Work, type WorkGroup } from './home-data';
import './home.css';

const nav = [['#why', '影音價格'], ['#works', '作品案例'], ['#plans', '方案選擇'], ['#other', '附加選購'], ['#process', '合作流程'], ['#faq', '常見問題']] as const;
const money = (n: number) => n.toLocaleString('en-US');

/** 數字補間：delay 毫秒後用 1200 毫秒從 from 走到 to；使用者關閉動畫時直接顯示最終數字。 */
function CountUp({ from, to, delay = 0 }: { from: number; to: number; delay?: number }) {
  const [n, setN] = useState(() => to);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(from);
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - start) / 1200));
      setN(Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, delay]);
  return <span className="ace-count">{money(n)}</span>;
}

/** 老虎機滾輪：每一位數字各自滾動，由左到右一位一位鎖定 */
function Reels({ value }: { value: number }) {
  const digits = String(value).split('');
  let di = 0;
  return (
    <b className="hp-reels" role="text" aria-label={`NT$${money(value)}`}>
      <small aria-hidden="true">NT$</small>
      <span aria-hidden="true" className="hp-reels-row">
        {money(value).split('').map((ch, i) => {
          if (ch === ',') return <u key={i}>,</u>;
          const d = Number(digits[di]); const k = di++;
          return <span key={i} className="hp-reel" style={{ ['--to' as string]: d, ['--k' as string]: k }}><span>{Array.from({ length: 20 }, (_, j) => <i key={j}>{j % 10}</i>)}</span></span>;
        })}
      </span>
    </b>
  );
}

/** 首頁價格卡的價格：三行從右邊滑進來，行情被劃掉、折扣金額往上跑、價格用滾輪逐位鎖定，「超划算」貼在文字旁邊。base 是這張卡開始的時間（秒） */
function HeroPrice({ market, price, base }: { market: number; price: number; base: number }) {
  return (
    <div className="hp" style={{ ['--b' as string]: `${base}s` }}>
      <p className="hp-l hp-1"><span>業界平均收費</span><span className="hp-old">NT${money(market)}<i /></span></p>
      <p className="hp-l hp-2"><span>折扣</span><span className="hp-off">−NT$<CountUp from={0} to={market - price} delay={(base + .75) * 1000} /></span></p>
      <p className="hp-l hp-3"><span className="hp-lab">我們只要<em>超划算</em></span><span className="hp-now"><Reels value={price} /><small>／支</small></span></p>
    </div>
  );
}

/** 手機下方說明區的價格：像短影音爆點字幕，一條條帶色塊砸出來，價格放最大畫底線、噴火花，貼紙在右上角不壓數字 */
function CaptionPrice({ market, price, unit }: { market?: number; price: number; unit: string }) {
  const bars = market ? 2 : 0;
  const t = bars ? 1.8 : .2;
  return (
    <div className="cp">
      <span className="cp-sticker" style={{ ['--d' as string]: `${t + 1.3}s` }}>超划算</span>
      {market && <p className="cp-row"><span className="cp-bar cp-1" style={{ ['--d' as string]: '.2s' }}>業界平均收費 NT${money(market)}</span></p>}
      {market && <p className="cp-row"><span className="cp-bar cp-2" style={{ ['--d' as string]: '.95s' }}>折扣 −NT${money(market - price)}</span></p>}
      <p className="cp-row cp-3" style={{ ['--t' as string]: `${t}s` }}>
        <span className="cp-big"><small>NT$</small>{money(price)}</span><em>／{unit}</em><u>年約最低價</u>
        <svg viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 8 C 50 2, 120 12, 218 4" fill="none" stroke="#f37021" strokeWidth="4" strokeLinecap="round" /></svg>
        <span className="cp-sparks" aria-hidden="true">{Array.from({ length: 8 }, (_, k) => <i key={k} style={{ ['--a' as string]: `${k * 45}deg` }} />)}</span>
      </p>
    </div>
  );
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

/** 每一項的業界平均收費與我們的價格；影片取影片單價，其餘用自己的 market／price。 */
function offerOf(p: Pain): { market?: number; price: number; unit: string } | null {
  const v = videos.find(x => x.key === p.video);
  if (v) return { market: v.market, price: v.price, unit: '支' };
  return p.price ? { market: p.market, price: p.price, unit: p.unit ?? '支' } : null;
}

/** 四支 iPhone 並排，每支播示範影片；下方說明會跟著目前選的服務切換。 */
function Pains() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const n = pains.length;

  const pauseAll = () => videoRefs.current.forEach(v => v?.pause());
  /** 只切換說明，不播放（首頁價格卡跳過來用） */
  const select = (i: number) => { pauseAll(); setActive(i); };
  /** 點手機：預設停止，點了才播（有聲音），再點暫停；一次只播一支，下面說明跟著換 */
  const tap = (i: number) => {
    const v = videoRefs.current[i];
    if (!v) return;
    if (i === active && !v.paused) { v.pause(); return; }
    pauseAll();
    setActive(i);
    v.muted = false;
    v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
  };

  useEffect(() => {
    const onJump = (e: Event) => select((e as CustomEvent<number>).detail);
    window.addEventListener('ace:pain', onJump);
    return () => window.removeEventListener('ace:pain', onJump);
  }, []);

  // 離開這一區就暫停，不會在背後繼續出聲
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) videoRefs.current.forEach(v => v?.pause()); }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 手機版手機列可以橫滑，切換時把目前這支捲到中間
  useEffect(() => {
    const row = rowRef.current;
    const item = row?.children[active] as HTMLElement | undefined;
    if (!row || !item || row.scrollWidth <= row.clientWidth + 1) return;
    row.scrollTo({ left: item.offsetLeft - (row.clientWidth - item.clientWidth) / 2, behavior: 'smooth' });
  }, [active]);

  const p = pains[active];
  const offer = offerOf(p);
  return (
    <section id="why" ref={sectionRef} className="ace-phones" aria-label="老闆的痛，我們都懂">
      <div className="ace-wrap">
        <div className="ace-phones-head">
          <div><p className="ace-kicker">WHY WORK WITH US</p><h2 className="ace-h2">老闆的痛，<br className="ace-br-sm" />我們都懂。</h2></div>
        </div>
        <div className="ace-phone-row" ref={rowRef} style={{ ['--n' as string]: n }}>
          {pains.map((x, i) => (
            <div key={x.tag} className={`ace-phone${i === active ? ' is-active' : ''}${playing === i ? ' is-playing' : ''}`}>
              <button className="ace-phone-btn" onClick={() => tap(i)} aria-label={`${playing === i ? '暫停' : '播放'}：${x.tag}`}>
                <span className="ace-iphone">
                  <span className="ace-iphone-screen">
                    <video ref={el => { videoRefs.current[i] = el; }} src={x.demo ?? DEMO_VIDEO} poster={x.poster ?? DEMO_POSTER} playsInline preload="metadata" tabIndex={-1} aria-hidden="true"
                      onPlay={() => setPlaying(i)} onPause={() => setPlaying(c => (c === i ? -1 : c))} onEnded={() => setPlaying(c => (c === i ? -1 : c))} />
                    <span className="ace-iphone-glare" />
                    <span className="ace-iphone-play">{playing === i ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}</span>
                    <span className="ace-iphone-name"><b>{i + 1}</b>{x.tag}</span>
                  </span>
                  <span className="ace-iphone-island" />
                </span>
              </button>
            </div>
          ))}
        </div>
        <p className="ace-phones-hint">左右滑動，點手機播放</p>
        <div className="ace-phone-detail" key={active} aria-live="polite">
          <div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
          <div className="ace-phone-offer">
            {offer && <CaptionPrice market={offer.market} price={offer.price} unit={offer.unit} />}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 價格數字切換時，從舊價格快速滾到新價格 */
function PriceNum({ value }: { value: number }) {
  const [n, setN] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    prev.current = value;
    if (from === value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 450);
      setN(Math.round(from + (value - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{money(n)}</>;
}

/** 方案選擇：單月／季約／年約依每月價格由高到低排列；下面項目橫向排開。其他服務只有單價。 */
function Plans() {
  const [term, setTerm] = useState<PlanTerm>('month');
  const t = planTerms.find(x => x.key === term)!;
  const idx = planTerms.findIndex(x => x.key === term);
  return (
    <section id="plans" className="ace-section ace-plans">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">PLANS</p><h2 className="ace-h2">選擇你的方案</h2></div>
          <p className="ace-muted">看過作品，選一種影片開始；三種都要，就選全家桶。先選合作期間，再看每月價格。</p>
        </div>
        <p className="pc-switch-label">選擇合作期間</p>
        <div className="pc-switch" role="radiogroup" aria-label="選擇單月、季約或年約" style={{ ['--i' as string]: idx }}>
          <i aria-hidden="true" />
          {planTerms.map(x => (
            <button key={x.key} role="radio" aria-checked={x.key === term} className={x.key === term ? 'is-on' : ''} onClick={() => setTerm(x.key)}>
              {x.label}{x.key === 'year' && <em>最划算</em>}
            </button>
          ))}
        </div>
        <div className="pc">
          {plans.map(p => {
            const price = p.price[term];
            const save = term === 'year' ? `相較單月，一年省 NT$${money((p.price.month - p.price.year) * 12)}` : `改簽年約，每月省 NT$${money(price - p.price.year)}`;
            return (
              <article key={p.key} className={p.key === 'all' ? 'pc-col is-all' : 'pc-col'}>
                <div className="pc-main">
                  <p className="pc-eyebrow">{p.key === 'all' ? '三種服務一次做' : '單項影片服務'}</p>
                  <h3>{p.name}</h3>
                  <p className="pc-note">{p.note}</p>
                  <p className="pc-price"><small>NT$</small><b><PriceNum value={price} /></b><em>／月</em></p>
                  <p className="pc-save">{save}</p>
                </div>
                <ul>{p.includes.map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
              </article>
            );
          })}
        </div>
        <p className="pc-foot">每種影片每月 {plans[0].qty} 支起；全家桶每月 {plans[3].qty} 支。以上為{t.label}每月價格，未稅。</p>
      </div>
    </section>
  );
}

/** 訂閱用戶的附加選購；公開價格與 Super5 的相同項目對齊。 */
function AddOns() {
  return (
    <section id="other" className="ace-other">
      <div className="ace-wrap">
        <div className="ace-other-head">
          <div><p className="ace-kicker">ADD-ONS</p><h2 className="ace-h2">附加選購</h2></div>
          <p className="ace-muted">僅開放訂閱用戶加購，依品牌需求擴充內容與曝光。</p>
        </div>
        <ul className="ace-other-grid">
          {addOns.map(a => <li key={a.key}>
            <h3>{a.name}</h3>
            <p>{a.detail}</p>
            <div className="ace-other-price"><strong>{a.price}</strong><span>{a.unit}</span></div>
            {a.more && <small>{a.more}</small>}
          </li>)}
        </ul>
        <div className="ace-other-foot">
          <p>社群圖文、SEO 文章、電商圖文與完整官網頁面優化依需求報價。以上為未稅參考價。</p>
        </div>
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
                  <figure key={c.slug} className="ace-chip" style={{ ['--i' as string]: r * 9 + i }}>
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

/** 作品案例：各分頁都以影片卡片呈現，一次只播一支。 */
function Works() {
  const [tab, setTab] = useState<WorkGroup>('cut');
  const [playing, setPlaying] = useState<Work | null>(null);
  const list = works.filter(w => w.group === tab);
  const pick = (g: WorkGroup) => { setTab(g); setPlaying(null); };
  return (
    <section id="works" className="ace-section ace-works">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">OUR WORK</p><h2 className="ace-h2">作品案例</h2></div>
          <p className="ace-muted">實際作品陸續更新，點擊播放。</p>
        </div>
        <div className="ace-tabs ace-works-tabs" role="tablist">
          {worksGroups.map(g => (
            <button key={g.key} role="tab" aria-selected={tab === g.key} className={tab === g.key ? 'is-active' : ''} onClick={() => pick(g.key)}>{g.label}<span>{works.filter(w => w.group === g.key).length}</span></button>
          ))}
        </div>
        <div className={tab === 'other' ? 'ace-works-row is-other' : 'ace-works-row'} key={tab}>
          {list.map(w => (
            <figure key={w.demo} className={playing === w ? 'ace-work is-playing' : 'ace-work'}>
              <div className="ace-work-screen">
                {playing === w
                  ? <video src={w.demo} poster={w.poster} autoPlay controls playsInline loop onEnded={() => setPlaying(null)} />
                  : <button onClick={() => setPlaying(w)} aria-label={`播放：${w.title ?? w.type}`}><img src={w.poster} alt="" loading="lazy" /><span className="ace-work-play"><Play size={26} fill="currentColor" /></span></button>}
              </div>
              <figcaption><b>{w.title ?? w.brand ?? w.type}</b><small>{w.brand || w.title ? w.type : '點擊播放'}{w.result ? `・${w.result}` : ''}</small></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 合作流程：四步，生成之前先確認。 */
function Process() {
  return (
    <section id="process" className="ace-section ace-process">
      <div className="ace-wrap">
        <p className="ace-kicker">HOW IT WORKS</p>
        <h2 className="ace-h2">合作流程</h2>
        <ol className="ace-flow">
          {flow.map((f, i) => <li key={f.title}><span>{String(i + 1).padStart(2, '0')}</span><strong>{f.title}</strong><p>{f.body}</p></li>)}
        </ol>
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
          <p className="ace-muted">影片、合作方式與授權，先從這裡找答案。</p>
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
              <p className="ace-kicker">讓 AI 成為每個品牌的王牌</p>
              <h1 className="ace-h1"><span>品牌短影音，</span><span>一支 <em>NT$300</em> 起</span></h1>
              <p className="ace-lead">十年行銷團隊 × AI 製作，<br />省下的是人事成本，不是品質。</p>
              <div className="ace-aces" aria-label="三種 AI 影片的價格">
                {videos.map((v, i) => (
                  <a key={v.key} href="#why" className="ace-ace-card" style={{ animationDelay: `${.55 + i * .13}s` }} onClick={() => setPain(i)}>
                    <span className="ace-ace-suit">{['♠', '♥', '♦'][i]}</span>
                    <b>{v.name}</b>
                    {v.hook && <em className="ace-ace-hook">{v.hook}</em>}
                    <HeroPrice market={v.market} price={v.price} base={.9 + i} />
                    <span className="ace-ace-min">10 支起・未稅</span>
                  </a>
                ))}
              </div>
              <div className="ace-actions">
                <a href="#why" className="ace-btn ace-btn-primary ace-btn-lg">看影片價格 <ArrowRight size={20} /></a>
              </div>
            </div>
          </div>
        </section>

        <div className="ace-wrap ace-lift">
          <div className="ace-card ace-trust">
            {[[Lightbulb, '生成前反覆確認', '腳本與畫面確認好才製作'], [Sparkles, '10 支起訂', '同一批角色與風格一致'], [ShieldCheck, '100+ 品牌合作', '連鎖品牌到在地店家']].map(([Icon, t, s]) => {
              const I = Icon as typeof Lightbulb;
              return <div key={t as string}><span className="ace-icon ace-icon-line"><I size={22} /></span><span><strong>{t as string}</strong><small>{s as string}</small></span></div>;
            })}
          </div>
        </div>

        <Pains />

        <Clients />

        <section id="about" className="ace-section ace-why">
          <div className="ace-wrap">
            <div className="ace-why-head">
              <p className="ace-kicker">WHY A.C.E.</p>
              <h2 className="ace-h2">為什麼是我們？</h2>
            </div>
            <div className="ace-vs">
              {whyVs.map(v => (
                <div key={v.who} className="ace-vs-card"><b>{v.who}</b><span><X size={16} />{v.lack}</span></div>
              ))}
              <div className="ace-vs-us">
                <b>A.C.E.<small>三個都有</small></b>
                <ul>{whyUs.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul>
              </div>
            </div>
            <div className="ace-why-proof">
              {whyProof.map((x, i) => (
                <article key={x.title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{x.title}</h3><p>{x.body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <Works />

        <Plans />

        <AddOns />

        <Process />

        <Faq />

        <section id="contact" className="ace-section ace-contact">
          <div className="ace-wrap ace-contact-card">
            <div>
              <p className="ace-kicker">LET'S TALK</p>
              <h2 className="ace-h2">把你的影音行銷，<br />交給王牌。</h2>
              <p>告訴我們你的產品，1 個工作天內回覆做法與報價。</p>
            </div>
            <div className="ace-contact-actions">
              <figure className="ace-qr"><img src="/home/line-qr.svg" alt="LINE 官方帳號 QR Code，用手機掃描加入" width={132} height={132} /><figcaption>電腦版，用手機掃碼加 LINE</figcaption></figure>
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
