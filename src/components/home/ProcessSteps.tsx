import Link from 'next/link';
import type { ProcessStep } from '@/data/process';

function titleCase(s: string) {
  return s === s.toUpperCase() ? s.charAt(0) + s.slice(1).toLowerCase() : s;
}

/** Static "brief to delivery" list — no sliders, no stock imagery. */
export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="process-steps py-128" id="process">
      <div className="container">
        <div className="process-steps-head">
          <div>
            <span className="sub-title mb-16">How an engagement runs</span>
            <h2>From brief to delivery</h2>
          </div>
          <p>
            Development is the first item in our approach: a single, accountable
            path from the first decision to handover.
          </p>
        </div>
        <ol className="process-steps-list">
          {steps.map(step => (
            <li className="process-step" key={step.id}>
              <span className="process-step-number">{String(step.stepNumber).padStart(2, '0')}</span>
              <h3 className="process-step-title">{titleCase(step.title)}</h3>
              <p className="process-step-desc">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="process-steps-cta">
          <Link href="/contact" className="theme-btn">Start a conversation</Link>
        </div>
      </div>
    </section>
  );
}
