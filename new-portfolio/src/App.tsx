import { ThemeProvider } from "./context/ThemeProvider";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Container } from "./components/layout/Container";
import { SectionDivider } from "./components/layout/SectionDivider";
import { Home } from "./components/sections/Home";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Achievements } from "./components/sections/Achievements";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { useEditorialMotion } from "./hooks/useEditorialMotion";

const sections = [
  { id: "doors", Content: Projects },
  { id: "skills", Content: Skills },
  { id: "achievements", Content: Achievements },
  { id: "about", Content: About },
  { id: "contact", Content: Contact },
];

export default function App() {
  useEditorialMotion();

  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Home />
        <Container>
          {sections.map(({ id, Content }) => (
            <div key={id}>
              <SectionDivider />
              <section id={id} tabIndex={-1} className="content-section">
                <Content />
              </section>
            </div>
          ))}
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
