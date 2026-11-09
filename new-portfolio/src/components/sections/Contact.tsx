import { useState } from "react";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { Button, ButtonLink } from "../ui/Button";

export function Contact() {
  const [feedback, setFeedback] = useState("");
  const email = portfolio.profile.email;
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setFeedback("Email copied to clipboard!");
      setTimeout(() => setFeedback(""), 3500);
    } catch {
      setFeedback("Could not copy automatically. You can copy the email manually.");
    }
  }

  return (
    <div className="contact-luxury-card">
      <div className="contact-card-content">
        <span className="mono contact-status-badge">
          <span className="status-dot live-pulse" />
          AVAILABLE FOR NEW WORK
        </span>

        <h2 className="contact-headline">
          Got a project?<br />
          <span>Let’s build it together.</span>
        </h2>

        <p className="contact-lead">
          I’m taking on new freelance work: websites, apps, interfaces, and intelligent software.
          Tell me what you’re building and I’ll get back to you within a day.
        </p>

        <div className="contact-actions-row">
          <ButtonLink href={composeUrl} aria-label="Start a project via email">
            <Mail size={17} aria-hidden="true" />
            Start a project →
          </ButtonLink>

          <Button variant="secondary" onClick={copyEmail} aria-label="Copy email address">
            <Copy size={16} aria-hidden="true" />
            Copy email
          </Button>

          <a className="contact-email-text mono" href={composeUrl}>
            {email}
          </a>
        </div>

        {feedback && (
          <p className="copy-feedback mono" role="status" aria-live="polite">
            {feedback}
          </p>
        )}

        <div className="contact-socials-row">
          <span className="mono socials-label">CONNECT:</span>
          {portfolio.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-pill-link">
              <span>{s.label}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
