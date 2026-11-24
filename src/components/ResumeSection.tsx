import {useState} from 'react';
import {Check, Download, Eye, FileText, Printer} from 'lucide-react';
import {downloadStandaloneResume} from '../utils/resumeDownload';

interface ResumeSectionProps {
  onPreviewResume: () => void;
  onPrintResume: () => void;
}

export default function ResumeSection({
  onPreviewResume,
  onPrintResume,
}: ResumeSectionProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    downloadStandaloneResume();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <section id="resume" className="bg-[#F8F9FC] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          id="download-resume"
          className="scroll-mt-24 mx-auto max-w-4xl rounded-2xl border border-[#15172B]/12 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Side: Resume Overview Card */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#6C3BFF] uppercase">
                <FileText className="h-3.5 w-3.5 text-[#6C3BFF]" aria-hidden="true" />
                <span>Curriculum Vitae</span>
              </div>

              <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight text-[#15172B] sm:text-2xl [text-wrap:balance]">
                Download Jatin&apos;s Resume
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#474B6B]">
                Get a clean, structured copy of my resume covering my Digital Marketing
                certification, SEO &amp; paid ads skills, University of Delhi degree, and
                customer experience background.
              </p>
            </div>

            {/* Right Side: Download & Preview Controls */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#15172B]/10 bg-[#F8F9FC] p-4 sm:p-5">
                <p className="font-display text-sm font-bold text-[#15172B]">
                  Ready for Recruiters &amp; Hiring Teams
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#474B6B]">
                  Includes full contact details, transferable skills, certification, and
                  digital marketing capabilities.
                </p>

                <div className="mt-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="brand-gradient-bg inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6C3BFF]/20 transition-all duration-150 hover:-translate-y-0.5 hover:opacity-95"
                  >
                    {downloaded ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>Resume Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" aria-hidden="true" />
                        <span>Download Resume</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={onPreviewResume}
                      className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl border border-[#15172B]/15 bg-white px-4 py-2 text-xs font-semibold text-[#15172B] transition-colors hover:border-[#6C3BFF] hover:text-[#6C3BFF] whitespace-nowrap"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#6C3BFF]" aria-hidden="true" />
                      <span>Preview Resume</span>
                    </button>

                    <button
                      type="button"
                      onClick={onPrintResume}
                      className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl border border-[#15172B]/15 bg-white px-4 py-2 text-xs font-semibold text-[#15172B] transition-colors hover:border-[#2878FF] hover:text-[#2878FF] whitespace-nowrap"
                    >
                      <Printer className="h-3.5 w-3.5 text-[#2878FF]" aria-hidden="true" />
                      <span>Print / Save PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
