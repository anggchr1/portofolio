import { useEffect, useState } from 'react';
import Navbar from './components/site/Navbar';
import Hero from './components/site/Hero';
import { Focus, Projects, Skills } from './components/site/Content';
import { About, Experience, Current } from './components/site/Sections';
import Demo from './components/site/Demo';
import Certificates from './components/site/Certificates';
import Blog, { PostPage } from './components/site/Blog';
import Admin from './components/site/Admin';
import Comments from './components/site/Comments';
import { Services, Testimonials, Faq } from './components/site/More';
import ProjectPage from './components/site/ProjectPage';
import { Contact, Footer } from './components/site/Contact';
import { ToolsStrip } from './components/site/Content';
import { posts, projects } from './data/portfolio';

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();

  if (hash.startsWith('#/proyek/')) {
    const id = Number(hash.replace('#/proyek/', ''));
    const project = projects.find((p) => p.id === id);
    if (project) {
      return (
        <div className="min-h-screen bg-paper text-ink">
          <Navbar />
          <main>
            <ProjectPage project={project} />
          </main>
          <Footer />
        </div>
      );
    }
  }

  if (hash.startsWith('#/admin')) {
    return (
      <div className="min-h-screen bg-paper text-ink">
        <Navbar />
        <main>
          <Admin />
        </main>
        <Footer />
      </div>
    );
  }

  if (hash.startsWith('#/blog/')) {
    const slug = hash.replace('#/blog/', '');
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      return (
        <div className="min-h-screen bg-paper text-ink">
          <Navbar />
          <main>
            <PostPage post={post} />
          </main>
          <Footer />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <ToolsStrip />
        <Focus />
        <Projects />
        <Demo />
        <Skills />
        <About />
        <Experience />
        <Certificates />
        <Blog />
        <Services />
        <Testimonials />
        <Comments />
        <Current />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
