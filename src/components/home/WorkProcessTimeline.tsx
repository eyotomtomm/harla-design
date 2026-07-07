'use client';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

interface WorkStep {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  image: string;
}

export default function WorkProcessTimeline({ steps }: { steps: WorkStep[] }) {
  const { theme } = useTheme();
  const [navSlider, setNavSlider] = useState<Slider | null>(null);
  const [mainSlider, setMainSlider] = useState<Slider | null>(null);

  const rulerImg = theme === 'light' ? '/images/work-process/ruler-black.png' : '/images/work-process/ruler.png';

  const mainSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: navSlider || undefined,
  };

  const navSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: false,
    vertical: true,
    speed: 1000,
    slidesToShow: Math.min(4, steps.length),
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: mainSlider || undefined,
  };

  return (
    <section className="timeline-area py-128 black-90-bg">
      <div className="container">
        <div className="row section-heading mb-96">
          <div className="section-title col-sm-6 col-lg-6">
            <h2>WORK <em>PROCESS</em></h2>
          </div>
          <div className="button col-sm-6 col-lg-6">
            <Link className="theme-btn" href="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-2 col-lg-2">
            <div className="timeline-content">
              <Slider ref={(slider) => setNavSlider(slider)} {...navSettings}>
                {steps.map(step => (
                  <div className="timeline-item" key={step.id}>
                    <img className="ishow" src={rulerImg} alt="ruler" />
                    <img className="ifade" src="/images/work-process/ruler-3.png" alt="ruler" />
                    <div className="icon h2">{String(step.stepNumber).padStart(2, '0')}</div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-md-10 col-lg-10">
            <div className="timeline-images">
              <Slider ref={(slider) => setMainSlider(slider)} {...mainSettings}>
                {steps.map(step => (
                  <div key={step.id}>
                    <div className="content">
                      <span className="h5 title">{step.title}</span>
                      <p className="description">{step.description}</p>
                    </div>
                    <img src={step.image} alt={step.title} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
