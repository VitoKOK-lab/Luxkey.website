import {ArrowRight, Check, ChevronDown} from 'lucide-react';
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
        <div className="ds-section-intro"><span className="ds-kicker">七項服務 / 價格清楚看</span><h2>我們的服務</h2><p>先挑你需要的成果，點開就能比較方案與收費。</p></div>
        <div className="ds-onepage-services">{dealerServices.map((service,index)=><details className={`ds-onepage-service ${service.accent ? 'ds-onepage-accent' : ''}`} id={service.slug} key={service.slug}>
          <summary className="ds-onepage-summary">
            <span className="ds-onepage-media"><img src={service.cardImage || service.image} alt={service.cardImageAlt || service.imageAlt} loading={index < 2 ? 'eager' : 'lazy'}/></span>
            <span className="ds-onepage-summary-copy"><span className="ds-kicker">服務 {String(index + 1).padStart(2, '0')}</span><strong>{service.nav}</strong><span>{service.headline}</span></span>
            <span className="ds-onepage-summary-price"><small>參考價格</small><b>{service.priceLine}</b></span>
            <span className="ds-onepage-summary-action"><span className="ds-onepage-expand"><span className="ds-expand-closed">看方案</span><span className="ds-expand-open">收起方案</span><ChevronDown size={22}/></span>{service.folderUrl ? <a className="ds-sample-folder" href={service.folderUrl} target="_blank" rel="noopener noreferrer">示意資料夾 ↗</a> : <small className="ds-sample-folder">示意資料夾待補</small>}</span>
          </summary>
          <div className="ds-onepage-content">
            <div className={`ds-onepage-options ${service.options.length === 1 ? 'ds-onepage-one-option' : ''}`}>{service.options.map(option => <section className="ds-onepage-option" key={option.name}>
              <div className="ds-onepage-option-top"><h4>{option.name}</h4><p>{option.detail}</p></div>
              <div className="ds-onepage-option-price"><strong>{option.price}</strong><span>{option.unit}</span></div>
              <ul>{option.includes.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul>
            </section>)}</div>
            {service.notices && <aside className="ds-service-notices"><h4>合作注意事項</h4><ul>{service.notices.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul></aside>}
          </div>
        </details>)}</div>
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
