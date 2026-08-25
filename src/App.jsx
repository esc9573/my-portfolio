import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import FloatingRobot from './components/FloatingRobot';
import Footer from "./components/Fotter";

import ThreeBackground from './components/ThreeBackground';
import ScrollReveal from './components/ScrollReveal';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // إيقاف استرجاع المتصفح لمكان السكرول القديم عند Reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // إجبار الصفحة تتطلع لأولها فوق
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0d0f12] text-white overflow-x-hidden">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="space-y-12">
          <HeroSection />

          <ScrollReveal>
            <ProjectsSection />
          </ScrollReveal>

          <ScrollReveal>
            <CertificatesSection />
          </ScrollReveal>
          <ScrollReveal>
            <ContactSection />
          </ScrollReveal>

        </main>

        <Footer />

        <FloatingRobot />
      </div>

    </div>
  );
}/*
export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0d0f12] text-white overflow-x-hidden">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="space-y-12">
          <HeroSection />

          <ScrollReveal>
            <ProjectsSection />
          </ScrollReveal>

          <ScrollReveal>
            <CertificatesSection />
          </ScrollReveal>
          <ScrollReveal>
            <ContactSection />
          </ScrollReveal>

        </main>

        <Footer />

        <FloatingRobot />
      </div>

    </div>
  );
}*/
