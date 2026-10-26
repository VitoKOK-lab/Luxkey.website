'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Film, Play, FileText, Gauge, Images, Lightbulb, LayoutTemplate, Mail, Menu, MessageCircle, ShieldCheck, ShoppingBag, Sparkles, X } from 'lucide-react';
import { EMAIL, LINE_URL, DEMO_POSTER, DEMO_VIDEO, clients, faqGroups, flow, pains, services, videos, works, type Pain, type ServiceKey } from './home-data';
import './home.css';

const serviceIcons: Record<ServiceKey, typeof Film> = {
  posts: Images, video: Film, article: FileText, ecommerce: ShoppingBag, optimize: Gauge, website: LayoutTemplate,
};
const nav = [['#why', '影音價格'], ['#other', '其他服務'], ['#works', '作品案例'], ['#process', '合作流程'], ['#faq', '常見問題']] as const;
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

/** 每一項的外面行情與我們的價格；影片取影片單價，其餘用自己的 market／price。 */
function offerOf(p: Pain): { market?: number; price: number; unit: string } | null {
  const v = videos.find(x => x.key === p.video);
  if (v) return { market: v.market, price: v.price, unit: '支' };
  return p.price ? { market: p.market, price: p.price, unit: p.unit ?? '支' } : null;
}

/** 五支 iPhone 並排，每支播示範影片；下方一條服務列，點手機或服務名切換說明。每 6 秒自動換，滑鼠移入時暫停。 */
function Pains() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const n = pains.length;
  const show = (i: number) => { setActive(i); setCopied(false); };

  useEffect(() => {
    const onJump = (e: Event) => show((e as CustomEvent<number>).detail);
    window.addEventListener('ace:pain', onJump);
    return () => window.removeEventListener('ace:pain', onJump);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: .15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 看得到這一區才播，離開就停，省流量也省電；使用者關閉動畫時只顯示封面
  const visibleRef = useRef(false);
  const sync = (v: HTMLVideoElement | null) => {
    if (!v) return;
    v.muted = true;
    if (visibleRef.current && v === videoRefs.current[activeRef.current] && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {}); else v.pause();
  };
  const activeRef = useRef(0);
  useEffect(() => { visibleRef.current = visible; activeRef.current = active; videoRefs.current.forEach(sync); }, [visible, active]);

  useEffect(() => {
    if (paused || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setActive(a => (a + 1) % n), 6000);
    return () => window.clearInterval(t);
  }, [paused, visible, active, n]);

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
    <section id="why" ref={sectionRef} className="ace-phones" aria-label="老闆的痛，我們都懂"
      onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setPaused(true); }}
      onMouseLeave={() => setPaused(false)}
      onFocus={e => { if (e.target.matches(':focus-visible')) setPaused(true); }}
      onBlur={() => setPaused(false)}>
      <div className="ace-wrap">
        <div className="ace-phones-head">
          <div><p className="ace-kicker">WHY WORK WITH US</p><h2 className="ace-h2">老闆的痛，<br className="ace-br-sm" />我們都懂。</h2></div>
        </div>
        <div className="ace-phone-row" ref={rowRef} style={{ ['--n' as string]: n }}>
          {pains.map((x, i) => (
            <div key={x.tag} className={i === active ? 'ace-phone is-active' : 'ace-phone'}>
              <button className="ace-phone-btn" onClick={() => show(i)} aria-label={`看第 ${i + 1} 支：${x.tag}`}>
                <span className="ace-iphone">
                  <span className="ace-iphone-screen">
                    <video ref={el => { videoRefs.current[i] = el; }} src={x.demo ?? DEMO_VIDEO} poster={x.poster ?? DEMO_POSTER} muted loop playsInline preload="metadata" tabIndex={-1} aria-hidden="true"
                      onLoadedMetadata={e => { const t = e.currentTarget; if (t.duration) t.currentTime = (i * t.duration / n) % t.duration; }} onLoadedData={e => sync(e.currentTarget)} />
                    <span className="ace-iphone-glare" />
                    <span className="ace-iphone-name"><b>{i + 1}</b>{x.tag}{i === active && <i key={active} className={paused || !visible ? 'is-paused' : ''} />}</span>
                  </span>
                  <span className="ace-iphone-island" />
                </span>
              </button>
            </div>
          ))}
        </div>
        <p className="ace-phones-hint">左右滑動查看更多影片</p>
        <div className="ace-phone-detail" key={active} aria-live="polite">
          <div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
          <div className="ace-phone-offer">
            {offer && (
              <p className="ace-stage-price">
                {offer.market && <span>外面行情 <s>NT${money(offer.market)}</s></span>}
                <span>我們只需要 <strong>NT${money(offer.price)}</strong><small>／{offer.unit}</small></span>
              </p>
            )}
            {offer
              ? <button className="ace-btn ace-btn-primary" onClick={async () => setCopied(await askOnLine(`你好，我想了解 A.C.E. 的${p.tag}（NT$${money(offer.price)}／${offer.unit}）。`))}><MessageCircle size={18} /> LINE 詢問</button>
              : <a href={p.href} className="ace-btn ace-btn-primary">{p.href === '#contact' ? '來聊聊' : `看${p.tag}價格`} <ArrowRight size={18} /></a>}
            {copied && <p className="ace-stage-copied">詢問內容已複製，到 LINE 貼上即可。</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 其他服務：收到最小，只讓客人知道除了主要影音之外，這些我們也做。 */
function OtherServices() {
  const others = services.filter(s => s.key !== 'video');
  return (
    <section id="other" className="ace-other">
      <div className="ace-wrap ace-other-row">
        <p className="ace-other-label">也提供</p>
        <ul className="ace-other-list">
          {others.map(s => { const Icon = serviceIcons[s.key]; return <li key={s.key} title={s.short}><Icon size={16} strokeWidth={1.75} />{s.name}</li>; })}
        </ul>
        <a href="#contact" className="ace-text-link">需要其他服務？告訴我們 <ArrowRight size={16} /></a>
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

/** 作品案例：點開播放，一次只播一支；品牌名和成效數字有真實資料再補。 */
function Works() {
  const [playing, setPlaying] = useState(-1);
  return (
    <section id="works" className="ace-section ace-works">
      <div className="ace-wrap">
        <div className="ace-head-row">
          <div><p className="ace-kicker">OUR WORK</p><h2 className="ace-h2">作品案例</h2></div>
          <p className="ace-muted">實際作品陸續更新，點擊播放，看看不同類型的製作成果。</p>
        </div>
        <div className="ace-works-row">
          {works.map((w, i) => (
            <figure key={w.type} className={playing === i ? 'ace-work is-playing' : 'ace-work'}>
              <div className="ace-work-screen">
                {playing === i
                  ? <video src={w.demo} poster={w.poster} autoPlay controls playsInline loop onEnded={() => setPlaying(-1)} />
                  : <button onClick={() => setPlaying(i)} aria-label={`播放：${w.type}`}><img src={w.poster} alt="" loading="lazy" /><span className="ace-work-play"><Play size={26} fill="currentColor" /></span></button>}
              </div>
              <figcaption><b>{w.brand ?? w.type}</b><small>{w.brand ? w.type : '點擊播放'}{w.result ? `・${w.result}` : ''}</small></figcaption>
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
              <p className="ace-kicker">讓 AI 成為每個品牌的王牌</p>
              <h1 className="ace-h1"><span>品牌短影音，</span><span>一支 <em>NT$300</em> 起</span></h1>
              <p className="ace-lead">十年行銷團隊 × AI 製作，<br />省下的是人事成本，不是品質。</p>
              <div className="ace-aces" aria-label="三種 AI 影片的價格">
                {videos.map((v, i) => (
                  <a key={v.key} href="#why" className="ace-ace-card" style={{ animationDelay: `${.55 + i * .13}s` }} onClick={() => setPain(i)}>
                    <span className="ace-ace-suit">{['♠', '♥', '♦'][i]}</span>
                    <b>{v.name}</b>
                    {v.hook && <em className="ace-ace-hook">{v.hook}</em>}
                    <strong><small>NT$</small><CountUp to={v.price} delay={700 + i * 130} /><small>／支</small></strong>
                    <s>外面 NT${money(v.market)}</s>
                    <span className="ace-ace-min">10 支起・未稅</span>
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
            {[[Lightbulb, '生成前反覆確認', '腳本與畫面確認好才製作'], [Sparkles, '10 支起訂', '同一批角色與風格一致'], [ShieldCheck, '100+ 品牌合作', '連鎖品牌到在地店家']].map(([Icon, t, s]) => {
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
              <h2 className="ace-h2">A.C.E. <br className="ace-br-sm" />兩個都有。</h2>
              <p className="ace-muted">一般 AI 工作室會用工具，但不懂行銷；一般行銷公司懂行銷，但要等兩週。A.C.E. 兩個都有。</p>
              <div className="ace-ace">
                {[['A', 'AI', 'AI 驅動製作'], ['C', 'Creative', '品牌行銷創意'], ['E', 'Execution', '高效落地執行']].map(([l, en, zh]) => (
                  <div key={l}><b>{l}</b><strong>{en}</strong><small>{zh}</small></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Works />

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
