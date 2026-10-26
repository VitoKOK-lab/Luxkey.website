'use client';

import { useEffect, useState } from 'react';
import { videos } from '../_home/home-data';
import '../_home/home.css';
import './fx.css';

const money = (n: number) => n.toLocaleString('en-US');

/** 數字補間：delay 毫秒後，用 dur 毫秒從 from 走到 to；回傳目前的數字與是否已落定 */
function useTween(from: number, to: number, delay: number, dur: number) {
  const [n, setN] = useState(from);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - start) / dur));
      setN(Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick); else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, delay, dur]);
  return [n, done] as const;
}

type V = (typeof videos)[number];

/** D「暴跌」：行情價在高檔晃了一陣，一路斷崖暴跌，數字跟著狂掉，最後貼上「▼ 暴跌 X%」 */
function Crash({ v }: { v: V }) {
  const off = Math.round((1 - v.price / v.market) * 100);
  const [n, done] = useTween(v.market, v.price, 900, 650);
  return (
    <div className={done ? 'fx fx-crash is-done' : 'fx fx-crash'}>
      <span className="d-top">外面行情 NT${money(v.market)}</span>
      <svg viewBox="0 0 260 112" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="d-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f37021" stopOpacity=".28" /><stop offset="1" stopColor="#f37021" stopOpacity="0" /></linearGradient></defs>
        <path className="d-area" d="M6 20 L40 12 L70 24 L100 12 L130 22 L158 16 L172 96 L254 100 L254 112 L6 112 Z" fill="url(#d-fill)" />
        <path className="d-line" pathLength="1" d="M6 20 L40 12 L70 24 L100 12 L130 22 L158 16 L172 96 L254 100" fill="none" stroke="#f37021" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle className="d-dot" cx="254" cy="100" r="5" fill="#c9560f" />
      </svg>
      <div className="d-bottom">
        <span className="d-num"><small>NT$</small>{money(n)}<em>／支</em></span>
        <span className="d-badge">▼ 暴跌 {off}%</span>
      </div>
    </div>
  );
}

/** E「K.O.」：行情價是 Boss 的血條，三連擊把它打到只剩一小截，砸出 K.O.，亮出我們的價格 */
function Ko({ v }: { v: V }) {
  const pct = Math.max(4, Math.round((v.price / v.market) * 100));
  const [n] = useTween(v.market, v.price, 350, 1050);
  return (
    <div className="fx fx-ko" style={{ ['--pct' as string]: `${pct}%` }}>
      <div className="ko-label"><span>外面行情</span><b>NT${money(n)}</b></div>
      <div className="ko-hp"><i className="ko-ghost" /><i className="ko-bar" /><span className="ko-flash" /></div>
      <span className="ko-text">K.O.!</span>
      <div className="ko-new"><span>我們只要</span><b><small>NT$</small>{money(v.price)}</b></div>
    </div>
  );
}

/** F「收據列印」：收據從出口一行一行印出來：行情價、A.C.E. 折扣，最後蓋上合計 */
function Receipt({ v }: { v: V }) {
  return (
    <div className="fx fx-receipt">
      <div className="rc-slot" />
      <div className="rc-paper">
        <p className="rc-line rc-1"><span>{v.name}</span><span>1 支</span></p>
        <p className="rc-line rc-2"><span>外面行情</span><span>NT${money(v.market)}</span></p>
        <p className="rc-line rc-3"><span>A.C.E. 折扣</span><span>−NT${money(v.market - v.price)}</span></p>
        <p className="rc-rule rc-4" />
        <p className="rc-total rc-5"><span>合計</span><b><small>NT$</small>{money(v.price)}</b></p>
        <span className="rc-stamp">超划算</span>
      </div>
    </div>
  );
}

const effects = [
  { key: 'crash', title: 'D　暴跌', hint: '走勢圖在高檔晃，然後斷崖暴跌，數字跟著狂掉，貼上「▼ 暴跌 80%」', Comp: Crash, v: videos[0] },
  { key: 'ko', title: 'E　K.O.', hint: '行情價是 Boss 血條，三連擊打到只剩一小截，砸出 K.O.，亮出我們的價格', Comp: Ko, v: videos[1] },
  { key: 'receipt', title: 'F　收據列印', hint: '收據一行一行印出來：行情價、A.C.E. 折扣，最後蓋上合計與「超划算」章', Comp: Receipt, v: videos[2] },
] as const;

export default function FxClient({ fontClass = '' }: { fontClass?: string }) {
  const [round, setRound] = useState(0);
  const [each, setEach] = useState([0, 0, 0]);
  return (
    <div className={`ace ${fontClass} fx-page`}>
      <div className="ace-wrap">
        <p className="ace-kicker">PRICE ANIMATION PREVIEW</p>
        <h1 className="ace-h2">價格動畫：第二輪三種特效，你選一個</h1>
        <p className="ace-muted">每一張卡用不同的特效，點「重播」再看一次。選好告訴我 D、E 或 F（也可以說「剪片用 D、數字人用 E」），我再套到首頁。這頁沒有放進選單，也不會被搜尋引擎收錄。</p>
        <button className="ace-btn ace-btn-primary" onClick={() => setRound(r => r + 1)}>全部重播</button>
        <div className="fx-grid">
          {effects.map(({ key, title, hint, Comp, v }, i) => (
            <article key={key} className="fx-card">
              <header><b>{title}</b><button className="fx-replay" onClick={() => setEach(e => e.map((x, j) => (j === i ? x + 1 : x)))}>重播</button></header>
              <p>{hint}</p>
              <div className="fx-frame">
                <p className="fx-name">{v.name}</p>
                <Comp key={`${round}-${each[i]}`} v={v} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
