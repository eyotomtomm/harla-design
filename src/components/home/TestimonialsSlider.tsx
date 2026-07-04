'use client';
import Slider from 'react-slick';

interface TestimonialData {
  id: number;
  quote: string;
  authorName: string;
  designation: string;
  authorImage: string;
  rating: number;
}

export default function TestimonialsSlider({ testimonials }: { testimonials: TestimonialData[] }) {
  const settings = {
    infinite: true,
    arrows: false,
    dots: true,
    fade: true,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    slidesToScroll: 1,
    slidesToShow: 1,
  };

  return (
    <section className="reviews-area py-128 black-100-bg">
      <div className="container">
        <div className="testimonials-slider">
          <Slider {...settings}>
            {testimonials.map(t => (
              <div className="testimonial-item" key={t.id}>
                <div className="section-title text-center mb-96">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <i key={i} className="fa fa-star"></i>
                  ))}
                </div>
                <div className="h2 author-text">&ldquo;{t.quote}&rdquo;</div>
                <img className="testi-img" src={t.authorImage} alt={t.authorName} />
                <h5>{t.authorName}</h5>
                <p className="designations">{t.designation}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
