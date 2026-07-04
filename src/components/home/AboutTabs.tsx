'use client';
import { useState } from 'react';
import AnimateOnScroll from '@/components/shared/AnimateOnScroll';

interface AboutTabData {
  id: number;
  tabLabel: string;
  paragraph1: string;
  paragraph2: string | null;
  bigImage: string;
  smallImage: string;
}

export default function AboutTabs({ tabs }: { tabs: AboutTabData[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="about-area py-128">
      <div className="container d-flex">
        <ul className="nav nav-tabs" role="tablist">
          {tabs.map((tab, i) => (
            <li className="nav-item" role="presentation" key={tab.id}>
              <div
                className={`nav-link${activeTab === i ? ' active' : ''}`}
                role="tab"
                onClick={() => setActiveTab(i)}
                style={{ cursor: 'pointer' }}
              >
                <div className="about-content">
                  <div className="text">
                    <h4 className="h4-rotate">{`${i + 1} - ${tab.tabLabel}`}</h4>
                    <p>{tab.paragraph1}</p>
                    {tab.paragraph2 && <p>{tab.paragraph2}</p>}
                  </div>
                  <div>
                    <img className="big-image" src={tab.bigImage} alt={tab.tabLabel} />
                    <p className="p-rotate">{tab.tabLabel}</p>
                    <h1 className="number">{i + 1}</h1>
                  </div>
                  <img className="small-image" src={tab.smallImage} alt={tab.tabLabel + ' detail'} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
