import Link from 'next/link';

const services = [
  { icon: 'fa-house', title: 'ARCHITECTURE', desc: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.' },
  { icon: 'fa-chair', title: 'INTERIOR', desc: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.' },
  { icon: 'fa-snowflake', title: 'DECORATION', desc: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.' },
  { icon: 'fa-hammer', title: 'Building', desc: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.' },
  { icon: 'fa-dharmachakra', title: 'INTERIOR', desc: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.' },
  { icon: 'fa-dollar-sign', title: 'Calculator', desc: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.' },
];

export default function ServiceGrid() {
  return (
    <section className="service-area-2 black-90-bg py-128 justify-content-center">
      <div className="container">
        <div className="row mb-96">
          {services.slice(0, 3).map((s, i) => (
            <div key={i} className="col-xs-4 col-lg-4 service-item">
              <div className="icon"><i className={`fa ${s.icon}`}></i></div>
              <Link href="/projects"><h5>{s.title}</h5></Link>
              <p>{s.desc}</p>
              <Link href="/projects"><span className="right-arrow"><i className="fa fa-long-arrow-right"></i></span></Link>
            </div>
          ))}
        </div>
        <div className="row">
          {services.slice(3).map((s, i) => (
            <div key={i} className="col-xs-4 col-lg-4 service-item">
              <div className="icon"><i className={`fa ${s.icon}`}></i></div>
              <Link href="/projects"><h5>{s.title}</h5></Link>
              <p>{s.desc}</p>
              <Link href="/projects"><span className="right-arrow"><i className="fa fa-long-arrow-right"></i></span></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
