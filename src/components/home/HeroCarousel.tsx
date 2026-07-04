'use client';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import AnimateOnScroll from '@/components/shared/AnimateOnScroll';

interface HeroSlide {
  id: number;
  rotateWord: string;
  description: string;
  image: string;
  linkUrl: string;
}

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  return (
    <section className="hero-area mt-92 pb-64 black-120-bg">
      <div className="container pb-64">
        <Carousel id="recipeCarousel" indicators controls={false}>
          {slides.map((slide, i) => (
            <Carousel.Item key={slide.id}>
              <div className="row">
                <div className="d-flex">
                  <div className="col-lg-2">
                    <h1 className="rotate-hero">{slide.rotateWord}</h1>
                  </div>
                  <div className="col-lg-10 d-flex hero-text-img">
                    <div className="hero-content">
                      <div>
                        <h6>{slide.description}</h6>
                        <Link href={slide.linkUrl} className="hero-btn">
                          Read More
                          <span className="btn-icon">
                            <span className="circle"></span>
                            <span className="dot"></span>
                            <span className="line"></span>
                            <span className="fa fa-long-arrow-right"></span>
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="bg-img">
                      <Link href={slide.linkUrl}>
                        <img className="hero-img" src={slide.image} alt={slide.rotateWord} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
