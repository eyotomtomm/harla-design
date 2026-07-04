import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="error-area">
      <div className="container">
        <div className="error-content text-center">
          <span className="error-img">
            <img src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=416&h=416&fit=crop&q=80" alt="error image" />
          </span>
          <div className="error-desc ow py-128 justify-content-center">
            <p>OOPPS! THE PAGE YOU WERE LOOKING FOR, COULD NOT BE FOUND.</p>
          </div>
          <Link href="/" className="primary-readmore">Back To Home</Link>
        </div>
      </div>
    </section>
  );
}
