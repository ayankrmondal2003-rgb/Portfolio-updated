import { ArrowUp } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { Container } from "./Container";
export function Footer() {
  return (
    <footer>
      <Container className="footer-content">
        <p>
          © {new Date().getFullYear()} {portfolio.profile.name}
        </p>
        <span className="mono">SOFTWARE / AI / COLLABORATION</span>
        <a href="#home">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </Container>
    </footer>
  );
}
