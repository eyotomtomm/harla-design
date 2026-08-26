import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="error-area">
      <div className="container">
        <div className="error-content text-center">
          <span className="error-img">
            <img src="/images/projects/abay-bank/lobby-6.jpg" alt="" />
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
