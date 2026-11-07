import { useState } from "react";
import { ArrowUpRight, Copy, Mail, Download } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { Button, ButtonLink } from "../ui/Button";
export function Contact() {
  const [feedback, setFeedback] = useState("");
  const email = portfolio.profile.email;
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setFeedback("Email copied to clipboard.");
    } catch {
      setFeedback(
        "Could not copy automatically. Select the email address to copy it manually.",
      );
    }
  }
  return (
    <div className="contact-layout">
      <div>
        <p className="eyebrow">05 / LET’S TALK</p>
        <h2>
          Build a conversation<span className="text-accent">.</span>
        </h2>
        <p className="muted">
          Have a practical project, hackathon idea, or something to learn
          together? Get in touch.
        </p>
      </div>
      <div className="contact-actions">
        {!email.startsWith("TODO:") && (
          <>
            <ButtonLink href={"mailto:" + email}>
              <Mail size={18} aria-hidden="true" />
              Send an email
            </ButtonLink>
            <a className="contact-email mono" href={"mailto:" + email}>
              {email}
            </a>
            <Button variant="secondary" onClick={copyEmail}>
              <Copy size={16} aria-hidden="true" />
              Copy email
            </Button>
            <p className="copy-feedback muted" role="status" aria-live="polite">
              {feedback}
            </p>
          </>
        )}
        <div className="social-links">
          {portfolio.socials.map((s) => (
            <a key={s.label} href={s.url}>
              {s.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
        {portfolio.profile.resume.url?.toLowerCase().endsWith(".pdf") && (
          <ButtonLink
            variant="secondary"
            href={portfolio.profile.resume.url}
            download
          >
            <Download size={18} aria-hidden="true" />
            Download resume
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
