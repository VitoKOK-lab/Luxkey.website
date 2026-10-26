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

const off = (v: V) => Math.round((1 - v.price / v.market) * 100);

/** G「打字機重擊」：三行字像打字機一個字一個字打出來，每打完一行就重重一擊閃一下；最後的價格從天砸下，印章另起一行在數字下面 */
function Type({ v }: { v: V }) {
  return (
    <div className="fx fx-g">
      <p className="g-l g-1" style={{ ['--d' as string]: '.2s', ['--n' as string]: 11 }}><span>外面行情</span><span>NT${money(v.market)}</span></p>
      <p className="g-l g-2" style={{ ['--d' as string]: '1.15s', ['--n' as string]: 14 }}><span>A.C.E. 折扣</span><span>−NT${money(v.market - v.price)}</span></p>
      <p className="g-3"><span>我們只要</span><b><small>NT$</small>{money(v.price)}</b><i className="g-ring" /></p>
      <span className="g-badge">超划算・省 {off(v)}%</span>
    </div>
  );
}

/** H「滑入＋滾輪」：三行從右邊衝進來；第一行被劃掉，折扣金額像里程表往上跑，最後的價格用老虎機滾輪由左到右一位一位鎖定，「超划算」貼在文字旁邊 */
function Reel({ v }: { v: V }) {
  const [n] = useTween(0, v.market - v.price, 1400, 700);
  const digits = String(v.price).split('');
  const text = money(v.price).split('');
  let di = 0;
  return (
    <div className="fx fx-h">
      <p className="h-l h-1"><span>外面行情</span><span className="h-old">NT${money(v.market)}<i /></span></p>
      <p className="h-l h-2"><span>A.C.E. 折扣</span><span className="h-off">−NT${money(n)}</span></p>
      <p className="h-l h-3">
        <span className="h-lab">我們只要<em>超划算</em></span>
        <b className="h-reels"><small>NT$</small>
          {text.map((ch, i) => {
            if (ch === ',') return <u key={i}>,</u>;
            const d = Number(digits[di]); const k = di++;
            return <span key={i} className="h-reel" style={{ ['--to' as string]: d, ['--k' as string]: k }}><span>{Array.from({ length: 20 }, (_, j) => <i key={j}>{j % 10}</i>)}</span></span>;
          })}
        </b>
      </p>
    </div>
  );
}

/** I「字幕重擊」：像短影音的爆點字幕，一條一條帶著色塊砸出來；最後的價格放到最大並畫上底線、噴出火花，貼紙貼在右上角不壓數字 */
function Caption({ v }: { v: V }) {
  return (
    <div className="fx fx-i">
      <span className="i-sticker">超划算</span>
      <p className="i-row"><span className="i-bar i-1" style={{ ['--d' as string]: '.2s' }}>外面行情 NT${money(v.market)}</span></p>
      <p className="i-row"><span className="i-bar i-2" style={{ ['--d' as string]: '.95s' }}>折扣 −NT${money(v.market - v.price)}</span></p>
      <p className="i-row i-3"><span className="i-big"><small>NT$</small>{money(v.price)}</span><em>／支</em>
        <svg viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 8 C 50 2, 120 12, 218 4" fill="none" stroke="#f37021" strokeWidth="4" strokeLinecap="round" /></svg>
        <span className="i-sparks" aria-hidden="true">{Array.from({ length: 8 }, (_, k) => <i key={k} style={{ ['--a' as string]: `${k * 45}deg` }} />)}</span>
      </p>
    </div>
  );
}

const effects = [
  { key: 'type', title: 'G　打字機重擊', hint: '三行字像打字機一個字一個字打出，每行打完重重一擊；價格從天砸下，印章在數字下面另起一行', Comp: Type, v: videos[0] },
  { key: 'reel', title: 'H　滑入＋滾輪', hint: '三行從右邊衝進來，行情被劃掉、折扣金額往上跑、價格用老虎機滾輪逐位鎖定，印章貼在旁邊', Comp: Reel, v: videos[1] },
  { key: 'caption', title: 'I　字幕重擊', hint: '像短影音爆點字幕，一條條帶色塊砸出；價格放最大畫底線、噴火花，貼紙貼右上角', Comp: Caption, v: videos[2] },
] as const;

export default function FxClient({ fontClass = '' }: { fontClass?: string }) {
  const [round, setRound] = useState(0);
  const [each, setEach] = useState([0, 0, 0]);
  return (
    <div className={`ace ${fontClass} fx-page`}>
      <div className="ace-wrap">
        <p className="ace-kicker">PRICE ANIMATION PREVIEW</p>
        <h1 className="ace-h2">價格動畫：第三輪三種特效，你選一個</h1>
        <p className="ace-muted">每一張卡用不同的特效，點「重播」再看一次。選好告訴我 G、H 或 I（也可以說「剪片用 G、數字人用 H」），我再套到首頁。這頁沒有放進選單，也不會被搜尋引擎收錄。</p>
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
