import {useState} from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutAndTimeline from './components/AboutAndTimeline';
import SkillsAndServices from './components/SkillsAndServices';
import ProjectsShowcase from './components/ProjectsShowcase';
import InternshipBanner from './components/InternshipBanner';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import Preloader from './components/Preloader';

export default function App() {
  const [prefilledSubject, setPrefilledSubject] = useState('');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [autoPrintResume, setAutoPrintResume] = useState(false);
  const [siteRevealed, setSiteRevealed] = useState(false);
  const [preloaderRemoved, setPreloaderRemoved] = useState(false);

  const jumpToContactWithSubject = (subject: string) => {
    setPrefilledSubject(subject);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const jumpToResumeSection = () => {
    const el =
      document.getElementById('download-resume') ||
      document.getElementById('resume');
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#15172B]">
      <div
        className={`print:hidden transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          siteRevealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar onOpenResume={jumpToResumeSection} />
        <main>
          <Hero />
          <AboutAndTimeline />
          <SkillsAndServices
            onSelectService={(serviceTitle) =>
              jumpToContactWithSubject(`Inquiry: ${serviceTitle}`)
            }
          />
          <ProjectsShowcase />
          <InternshipBanner
            onHireClick={() =>
              jumpToContactWithSubject('Digital Marketing Internship Opportunity')
            }
          />
          <ResumeSection
            onPreviewResume={() => setResumeOpen(true)}
            onPrintResume={() => {
              setAutoPrintResume(true);
              setResumeOpen(true);
            }}
          />
          <ContactSection prefilledSubject={prefilledSubject} />
        </main>
        <Footer />
      </div>
      <ResumeModal
        open={resumeOpen}
        autoPrint={autoPrintResume}
        onAutoPrintHandled={() => setAutoPrintResume(false)}
        onClose={() => {
          setAutoPrintResume(false);
          setResumeOpen(false);
        }}
      />
      {!preloaderRemoved && (
        <Preloader
          onFadeStart={() => setSiteRevealed(true)}
          onComplete={() => setPreloaderRemoved(true)}
        />
      )}
    </div>
  );
}
