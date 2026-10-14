import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {DealerFooter, DealerHeader} from './dealer-components';
import {dealerServices} from './service-data';
import {portfolioCases} from '../portfolio-data';
import './super5.css';
import './dealer.css';

export default function IntroducePage() {
  return <div className="dealer-page" id="top">
    <a className="ds-skip" href="#main">跳至內容</a>
    <DealerHeader/>
    <main id="main">
      <section className="ds-home-hero">
        <div className="ds-wrap ds-home-hero-inner">
          <div className="ds-home-copy">
            <span className="ds-kicker">中小企業的雲端行銷部</span>
            <h1>用Ai幫公司<br/><em>超級省錢爆炸增效</em></h1>
            <p>全方位行銷工具</p>
            <div className="ds-hero-actions"><a href="#services" className="ds-primary">了解更多 <ArrowRight size={20}/></a></div>
          </div>
        </div>
      </section>
      <section className="ds-wrap ds-home-services" id="services">
        <div className="ds-section-intro"><span className="ds-kicker">服務選單 / 直接看價格</span><h2>我們的服務</h2><p>點進去看成品、內容、收費。每項服務都有自己的頁面，交付數量寫清楚，讓老闆快速決定。</p></div>
        <div className="ds-service-grid">{dealerServices.map((service,index)=><Link href={`/introduce/${service.slug}/`} className={`ds-service-card ${service.accent ? 'ds-orange' : ''}`} key={service.slug}>
          <div className="ds-service-card-image"><img src={service.cardImage || service.image} alt={service.cardImageAlt || service.imageAlt} loading={index<2?'eager':'lazy'}/><span>0{index+1}</span></div>
          <div className="ds-service-card-copy"><h3>{service.nav}</h3><p>{service.headline}</p><div className="ds-service-card-bottom"><strong>{service.priceLine}</strong><ArrowRight size={22}/></div></div>
        </Link>)}</div>
        <p className="ds-price-disclaimer">價格為新臺幣未稅參考價；人選、拍攝地點、授權、系統串接和需求擴充依正式報價。</p>
      </section>
      <section className="ds-portfolio" id="cases"><div className="ds-wrap">
        <div className="ds-portfolio-gallery-head"><h2>合作品牌與案例</h2></div>
      </div><div className="ds-brand-marquee" aria-label="合作品牌與案例"><div className="ds-brand-track">
        {[0,1].map(copy=><div className="ds-brand-list" key={copy} aria-hidden={copy===1}>{portfolioCases.map(item=><span className="ds-brand-name" key={`${copy}-${item.brand}`}>{item.brand}</span>)}</div>)}
      </div></div></section>
      <section className="ds-final-cta"><div className="ds-wrap"><span className="ds-kicker">選一件最急的，先做出來。</span><h2>看完方案，再決定買哪一項。</h2><a href="#services" className="ds-primary">返回服務選單 <ArrowRight size={20}/></a></div></section>
    </main>
    <DealerFooter/>
  </div>;
}
