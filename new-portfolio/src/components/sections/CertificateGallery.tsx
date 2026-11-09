import { useState } from "react";
import { ArrowUpRight, FileCheck2 } from "lucide-react";
import { portfolio } from "../../data/portfolio";
function CertificateImage({ src, title }: { src: string; title: string }) {
  const [currentSrc, setCurrentSrc] = useState(src.replace(/\.jpg$/, ".webp"));
  const [failed, setFailed] = useState(false);

  return failed ? (
    <span className="certificate-empty">
      Preview unavailable. Try the document link.
    </span>
  ) : (
    <img
      src={currentSrc}
      alt={title + " — certificate issued to Ayan Kumar Mondal"}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (currentSrc !== src) {
          setCurrentSrc(src);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
export function CertificateGallery() {
  return (
    <div className="credential-section" aria-labelledby="certificate-title">
      <div className="credential-heading">
        <p className="eyebrow">DOCUMENTED LEARNING</p>
        <h3 id="certificate-title">Certificates & recognition</h3>
        <p className="muted">
          Open a certificate to inspect the original image.
        </p>
      </div>
      <div className="credential-grid">
        {portfolio.certificates
          .filter((c) => c.image || c.pdf)
          .map((c) => (
            <article className="credential-card" key={c.title}>
              {c.image ? (
                <a
                  className="certificate-preview"
                  href={c.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={"Preview " + c.title + " (opens in a new tab)"}
                >
                  <CertificateImage src={c.image} title={c.title} />
                </a>
              ) : (
                <div className="certificate-empty">
                  <FileCheck2 aria-hidden="true" />
                  <span>Certificate artwork pending</span>
                </div>
              )}
              <div className="credential-copy">
                <p className="eyebrow">{c.kind}</p>
                <h4>{c.title}</h4>
                <p className="muted">{c.issuer}</p>
                {c.image && (
                  <a
                    className="document-link"
                    href={c.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View certificate{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                {c.pdf && (
                  <a className="document-link" href={c.pdf}>
                    Open certificate PDF
                  </a>
                )}
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}
