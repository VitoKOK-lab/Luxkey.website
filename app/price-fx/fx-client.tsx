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

/** 特效 A「劃掉重寫」：行情價被紅線劃掉、縮到角落，我們的價格從天而降蓋章，貼上折扣章 */
function Slash({ v }: { v: V }) {
  const off = Math.round((1 - v.price / v.market) * 100);
  return (
    <div className="fx fx-slash">
      <span className="fx-old"><small>外面</small>NT${money(v.market)}<i /></span>
      <span className="fx-new"><small>NT$</small>{money(v.price)}<em>／支</em></span>
      <span className="fx-stamp">省 {off}%</span>
    </div>
  );
}

/** 特效 B「重錘落地」：數字高速倒數（帶速度線），重重砸在底價，卡片震一下、擴散衝擊波，再跳出省下多少 */
function Drop({ v }: { v: V }) {
  const [n, done] = useTween(v.market, v.price, 300, 1000);
  return (
    <div className={done ? 'fx fx-drop is-hit' : 'fx fx-drop'}>
      <span className="fx-lines" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <span className={done ? 'fx-num is-landed' : 'fx-num'}><small>NT$</small>{money(n)}<em>／支</em></span>
      <span className="fx-ring" aria-hidden="true" />
      <span className="fx-save">省 NT${money(v.market - v.price)}</span>
    </div>
  );
}

/** 特效 C「比例條」：外面行情是一條長長的灰條，我們的價格只是一小截橘條，最後彈出「只要行情的 X%」 */
function Bar({ v }: { v: V }) {
  const pct = Math.max(4, Math.round((v.price / v.market) * 100));
  return (
    <div className="fx fx-bar" style={{ ['--pct' as string]: `${pct}%` }}>
      <div className="fx-row fx-row-old"><span>外面行情</span><b>NT${money(v.market)}</b><i /></div>
      <div className="fx-row fx-row-new"><span>我們只要</span><b>NT${money(v.price)}</b><i /></div>
      <span className="fx-pct">只要行情的 <strong>{pct}%</strong></span>
    </div>
  );
}

const effects = [
  { key: 'slash', title: 'A　劃掉重寫', hint: '紅線劃掉行情價，我們的價格蓋章砸下，貼「省 80%」章', Comp: Slash, v: videos[0] },
  { key: 'drop', title: 'B　重錘落地', hint: '數字高速倒數、重重砸在底價，卡片一震，跳出「省多少錢」', Comp: Drop, v: videos[1] },
  { key: 'bar', title: 'C　比例條', hint: '長灰條對上一小截橘條，一眼看出我們是行情的幾分之幾', Comp: Bar, v: videos[2] },
] as const;

export default function FxClient({ fontClass = '' }: { fontClass?: string }) {
  const [round, setRound] = useState(0);
  const [each, setEach] = useState([0, 0, 0]);
  return (
    <div className={`ace ${fontClass} fx-page`}>
      <div className="ace-wrap">
        <p className="ace-kicker">PRICE ANIMATION PREVIEW</p>
        <h1 className="ace-h2">價格動畫：三種特效，你選一個</h1>
        <p className="ace-muted">每一張卡用不同的特效，點「重播」再看一次。選好告訴我 A、B 或 C（也可以說「剪片用 A、數字人用 B」），我再套到首頁。這頁沒有放進選單，也不會被搜尋引擎收錄。</p>
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
