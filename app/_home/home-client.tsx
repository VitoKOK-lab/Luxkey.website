'use client';
import Link from 'next/link';
import {ArrowRight, CalendarDays, CheckCircle2, Clock3, Smartphone, TrendingUp, Clapperboard, Users, LayoutTemplate, Upload, Package, FileText, ShoppingCart, GraduationCap, ClipboardList, Download, Eye, Megaphone, Video, User, Star} from 'lucide-react';
import {impactPlans,impactExtras,impactFaqs} from './impact-data';
import {LINE_URL,EMAIL} from './home-data';
import './impact.css';
const money=(n:number)=>n.toLocaleString('en-US');
const extraIcons=[Package,Clapperboard,FileText,ShoppingCart,GraduationCap,Users];
function Contact(){return <a className="impact-contact" href={LINE_URL} target="_blank" rel="noopener noreferrer"><img src="/home/line-qr.svg" alt="加入 LINE 的 QR code" width="116" height="116"/><span>掃碼加 LINE，專人為你說明<strong>LINE ID：@250zlmxy</strong><small>直接詢問完整方案與報價 ↗</small></span></a>}
export default function HomePage({fontClass}:{fontClass:string}){return <main className={`impact ${fontClass}`}>
 <header className="impact-nav"><a href="#top" className="impact-brand">ACE Impact</a><span>短影音訂閱方案</span><a href="#plans">選影片與價格 <ArrowRight size={16}/></a></header>
 <aside className="impact-promo" id="top"><div><strong>雙 11 下殺優惠｜限量 11 家</strong><h2>簽約後第一個月，全部用年約最低價</h2><p>例：AI 代言人每支 4,760 → 2,800，再送 11 支快剪</p><small>單月也適用・快剪用你的口播素材・第 2 個月起照原方案</small></div><span className="impact-deadline"><CalendarDays/>11/11<br/>23:59 截止</span></aside>
 <div className="impact-wrap"><section className="impact-hero"><p className="impact-eyebrow"><b>ACE Impact</b> 短影音訂閱方案</p><h1>老闆，你累了嗎？</h1><p className="impact-lead">沒有短影音不行，但天天拍片又燒錢又累。</p><h2>交給我們，一個月不到一個小編的價格，<br/>不用拍片也能穩定出片。</h2><div className="impact-chips"><span><Clock3/>30–60 秒</span><span><Smartphone/>1080p 直式</span><span><CalendarDays/>單月・季・年都能訂</span></div></section>
 <section id="why"><h2>為什麼選 ACE Impact？</h2><div className="impact-stats">{[[TrendingUp,'86%','美國廣告買家','用 AI 做影片'],[Clapperboard,'1,000 億','微短劇規模','超越電影票房'],[Users,'100+','合作品牌','近千萬業績']].map(([Icon,n,a,b],i)=>{const I=Icon as typeof Users;return <article key={i}><I/><strong>{String(n)}</strong><p>{String(a)}<br/>{String(b)}</p></article>})}</div><div className="impact-chips impact-credentials">{['設計行銷近 10 年','市政府合作顧問','大學講師','2019 起做短影音'].map(x=><span key={x}>{x}</span>)}</div><small className="impact-source">資料來源：IAB 2025 數位影音廣告報告；工商時報 2026 年 4 月（人民幣）</small></section>
 <section><h2>同一個團隊，只收 AI 的價格</h2><p className="impact-muted">AI 省下人力成本，全部回饋給你。</p><div className="impact-compare"><article><h3>真人行銷公司拍一支</h3><del>NT$8,000–16,000</del><p>真人出鏡＋拍攝＋剪輯</p></article><article><h3>ACE Impact AI 做一支</h3><strong>NT$2,800 <small>起</small></strong><p>AI 出鏡＋腳本＋剪輯</p></article></div></section>
 <section><h2>成熟 SOP，品質穩、價格省</h2><div className="impact-flow">{[[LayoutTemplate,'版型直接選','挑了就開始'],[Upload,'規格好上架','IG・抖音・YT 直接傳'],[CheckCircle2,'先確認再做','腳本畫面確認才製作']].map(([Icon,title,text],i)=>{const I=Icon as typeof Users;return <article key={i}><I/><h3>{String(title)}</h3><p>{String(text)}</p></article>})}</div><a className="impact-button" href="#plans">下一張：選影片與價格 <ArrowRight/></a></section>
 <section id="plans"><p className="impact-step">STEP 1</p><h2>選影片</h2><p className="impact-muted">依需求選擇影片類型（可自由搭配、可單選，多種方案可選）</p><nav className="impact-types" aria-label="影片類型">{[['素人實拍系列','#extra-E',Video],['素材快剪','#plan-A',Star],['AI 代言人','#plan-B',User],['個人品牌分身','#plan-C',User],['AI 短劇置入','#plan-D',Clapperboard],['電商導購影片','#extra-H',ShoppingCart],['線上課程宣傳','#extra-I',GraduationCap],['更多影片類型','#other',ArrowRight]].map(([name,href,Icon])=>{const I=Icon as typeof Users;return <a key={String(name)} href={String(href)}><I/>{String(name)}</a>})}</nav>
 <div className="impact-plan-list">{impactPlans.map(p=><article className="impact-plan" key={p.id} id={`plan-${p.id}`}><div className="impact-plan-top"><div className="impact-plan-icon"><Video/></div><div><h3><b>{p.id}</b>{p.name}</h3><p>{p.pitch}</p><div className="impact-price"><del>市場價 NT${p.market}</del><strong>NT${money(p.prices[2])}<small> 起／支</small></strong><span>（每月 10 支起）</span></div></div></div><h4>方案特色</h4><ul>{p.features.map(f=><li key={f}><CheckCircle2/>{f}</li>)}</ul><div className="impact-uses"><b>適用情境</b>{p.uses.map(u=><span key={u}>{u}</span>)}<a href={`${LINE_URL}`} target="_blank" rel="noopener noreferrer">更多應用 ↗</a></div></article>)}</div></section>
 <section><p className="impact-step">STEP 2</p><h2>長期訂閱，越久越划算</h2><p className="impact-muted">選擇訂閱方案（單月／季繳／年繳），享更優惠的單支價格</p><div className="impact-table-scroll"><table><caption>每支影片參考價格（未稅），每月 10 支起訂</caption><thead><tr><th scope="col">方案／影片類型</th><th scope="col">單月</th><th scope="col">季繳（3 個月）</th><th scope="col">年繳（12 個月）</th></tr></thead><tbody>{impactPlans.map(p=><tr key={p.id}><th scope="row">{p.id}　{p.name}</th>{p.prices.map((n,i)=><td key={i}><strong>NT${money(n)}{i===2?' 起':''}</strong><small>每支約 NT${money(n)}</small></td>)}</tr>)}</tbody></table></div><small className="impact-source">※ 以上為方案參考價，實際價格依合約內容為準。</small><Contact/></section>
 <section id="other"><p className="impact-step">加購</p><h2>附加選購</h2><p className="impact-muted">訂閱用戶加購・F 可單買</p><div className="impact-extras">{impactExtras.map(([id,name,desc,price,unit,note],i)=>{const I=extraIcons[i];return <article key={id} id={`extra-${id}`}><div className="impact-extra-icon"><I/><b>{id}</b></div><div><h3>{name}</h3><p>{desc}</p></div><div className="impact-extra-price"><strong>NT${price}<small>{unit}</small></strong><p>{note}</p></div></article>})}</div></section>
 <section id="process"><p className="impact-step">STEP 3</p><h2>怎麼拿到影片</h2><div className="impact-flow">{[[ClipboardList,'填需求表','附上素材或產品照'],[CheckCircle2,'確認後製作','腳本畫面先確認'],[Download,'雲端下載','直接上傳各平台']].map(([Icon,title,desc],i)=>{const I=Icon as typeof Users;return <article key={i}><I/><span className="impact-number">0{i+1}</span><h3>{String(title)}</h3><p>{String(desc)}</p></article>})}</div></section>
 <section id="faq"><h2>老闆常問</h2><div className="impact-faq">{impactFaqs.map(([q,a],i)=>{const I=[Eye,Megaphone,FileText][i];return <article key={q}><I/><div><h3>{q}</h3><p>{a}</p></div></article>})}</div></section></div>
 <footer className="impact-footer" id="contact"><div className="impact-wrap"><h2>選好影片和版型，就能開始</h2><p>以上皆未稅。合約、交期與付款方式，由業務提供正式報價。</p><Contact/><a href={`mailto:${EMAIL}`}>Email：{EMAIL}</a><div className="impact-footer-links"><span>© {new Date().getFullYear()} ACE Impact</span><a href="/privacy/">隱私說明</a><a href="/introduce/">經銷合作</a></div></div></footer>
 </main>}

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
