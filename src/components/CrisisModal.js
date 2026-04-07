'use client';
import { useEffect } from 'react';

export default function CrisisModal() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <div className="modal fade" id="crisisModal" tabIndex="-1" role="alertdialog" aria-labelledby="crisisModalLabel" aria-live="assertive">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content crisis-modal-content">
          <div className="modal-header border-0">
            <h2 className="modal-title" id="crisisModalLabel">
              <i className="bi bi-heart-pulse text-danger" /> You&apos;re Not Alone
            </h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <p className="mb-4">If you&apos;re going through something difficult, please reach out:</p>
            <div className="crisis-resource">
              <h5>988 Suicide &amp; Crisis Lifeline</h5>
              <p><strong>Call or text 988</strong></p>
              <p className="text-muted">24/7 free and confidential support</p>
            </div>
            <div className="crisis-resource">
              <h5>Crisis Text Line</h5>
              <p><strong>Text HOME to 741741</strong></p>
              <p className="text-muted">Free 24/7 crisis counseling via text</p>
            </div>
            <div className="crisis-resource">
              <h5>Kids Help Phone (Canada)</h5>
              <p><strong>Call 1-800-668-6868</strong> or text CONNECT to 686868</p>
              <p className="text-muted">24/7 support for young people in Canada</p>
            </div>
            <div className="crisis-resource">
              <h5>Good2Talk (Ontario)</h5>
              <p><strong>Call 1-866-925-5454</strong></p>
              <p className="text-muted">Post-secondary student helpline</p>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">I&apos;m okay, close</button>
            <a href="/resources" className="btn btn-primary-gradient">More Resources</a>
          </div>
        </div>
      </div>
    </div>
  );
}
