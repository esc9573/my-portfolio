import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import FloatingRobot from './components/FloatingRobot';
import Footer from "./components/Fotter";

import ThreeBackground from './components/ThreeBackground';
import ScrollReveal from './components/ScrollReveal';

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

          <ContactSection />
        </main>

        <Footer />

        <FloatingRobot />
      </div>

    </div>
  );
}
