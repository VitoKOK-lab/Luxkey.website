import {ArrowRight, Check} from 'lucide-react';
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
        <div className="ds-section-intro"><span className="ds-kicker">六項服務 / 價格直接攤開</span><h2>我們的服務</h2><p>直接看你能買到什麼、方案怎麼選、價格是多少。</p></div>
        <div className="ds-onepage-services">{dealerServices.map((service,index)=><article className={`ds-onepage-service ${service.accent ? 'ds-onepage-accent' : ''}`} id={service.slug} key={service.slug}>
          <div className="ds-onepage-media"><img src={service.cardImage || service.image} alt={service.cardImageAlt || service.imageAlt} loading={index < 2 ? 'eager' : 'lazy'}/></div>
          <div className="ds-onepage-content">
            <span className="ds-kicker">服務 {String(index + 1).padStart(2, '0')}</span>
            <h3>{service.nav}</h3>
            <p className="ds-onepage-headline">{service.headline}</p>
            <div className={`ds-onepage-options ${service.options.length === 1 ? 'ds-onepage-one-option' : ''}`}>{service.options.map(option => <section className="ds-onepage-option" key={option.name}>
              <div className="ds-onepage-option-top"><h4>{option.name}</h4><p>{option.detail}</p></div>
              <div className="ds-onepage-option-price"><strong>{option.price}</strong><span>{option.unit}</span></div>
              <ul>{option.includes.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul>
            </section>)}</div>
            {service.notices && <aside className="ds-service-notices"><h4>合作注意事項</h4><ul>{service.notices.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul></aside>}
          </div>
        </article>)}</div>
        <p className="ds-price-disclaimer">價格為新臺幣未稅參考價；人選、拍攝地點、授權、系統串接和需求擴充依正式報價。</p>
      </section>
      <section className="ds-portfolio" id="cases"><div className="ds-wrap">
        <div className="ds-portfolio-gallery-head"><h2>合作品牌與案例</h2></div>
      </div><div className="ds-brand-marquee" aria-label="合作品牌與案例"><div className="ds-brand-track">
        {[0,1].map(copy=><div className="ds-brand-list" key={copy} aria-hidden={copy===1}>{portfolioCases.map(item=><span className="ds-brand-name" key={`${copy}-${item.brand}`}>{item.brand}</span>)}</div>)}
      </div></div></section>
    </main>
    <DealerFooter/>
  </div>;
}
