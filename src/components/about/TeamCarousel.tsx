'use client';

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const teamMembers = [
  { name: 'Chris Evan', role: 'Architecture Design', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', rating: 5 },
  { name: 'Chris Jobling', role: 'Interior Design', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', rating: 5 },
  { name: 'Lara Smith', role: 'Interior Design', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', rating: 5 },
  { name: 'Chris Norlan', role: 'Interior Design', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', rating: 5 },
];

export default function TeamCarousel() {
  const [index, setIndex] = useState(0);

  return (
    <section className="team-area py-128">
      <div className="container">
        <div className="d-flex section-heading mb-96">
          <div className="section-title">
            <h2>OUR TEAM</h2>
          </div>
          <div className="carousel-buttons">
            <button className="prev" type="button" onClick={() => setIndex(i => (i === 0 ? teamMembers.length - 1 : i - 1))} aria-label="Previous team member">
              <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fa fa-long-arrow-left"></i></span>
            </button>
            <button type="button" onClick={() => setIndex(i => (i === teamMembers.length - 1 ? 0 : i + 1))} aria-label="Next team member">
              <span className="carousel-control-next-icon" aria-hidden="true"><i className="fa fa-long-arrow-right"></i></span>
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <Carousel activeIndex={index} onSelect={setIndex} indicators={false} controls={false}>
            {teamMembers.map((member, i) => (
              <Carousel.Item key={i}>
                <div className="row">
                  <div className="col-md-4 team-item-wrap">
                    <div className="team-item text-center">
                      <div className="team-img">
                        <img src={member.image} alt={member.name} />
                      </div>
                      <div className="text">
                        <div>
                          {Array.from({ length: member.rating }, (_, j) => (
                            <i key={j} className="fa fa-star"></i>
                          ))}
                        </div>
                        <h5>{member.name}</h5>
                        <p>{member.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
