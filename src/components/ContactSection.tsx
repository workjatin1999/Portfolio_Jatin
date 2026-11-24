import {useEffect, useState, type FormEvent} from 'react';
import emailjs from '@emailjs/browser';
import {
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  AlertCircle,
} from 'lucide-react';
import {PROFILE} from '../data/portfolioData';

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mz3aa45';
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_1dn4n6o';
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 't_1Un6bel_L0Ae-gA';

interface ContactSectionProps {
  prefilledSubject: string;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection({prefilledSubject}: ContactSectionProps) {
  const [form, setForm] = useState<FormValues>({
    name: '',
    email: '',
    subject: prefilledSubject,
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (prefilledSubject) {
      setForm((prev) => ({...prev, subject: prefilledSubject}));
    }
  }, [prefilledSubject]);

  const validateClient = (values: FormValues): Partial<FormValues> => {
    const nextErrors: Partial<FormValues> = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (values.subject.trim().length < 3) {
      nextErrors.subject = 'Please add a short subject.';
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateClient(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: trimmedName,
          from_name: trimmedName,
          email: trimmedEmail,
          from_email: trimmedEmail,
          reply_to: trimmedEmail,
          subject: trimmedSubject,
          title: trimmedSubject,
          message: trimmedMessage,
          to_name: PROFILE.name,
          to_email: PROFILE.contact.email,
        },
        {publicKey: EMAILJS_PUBLIC_KEY}
      );

      let refId = `EMJ-${Date.now().toString(36).toUpperCase()}`;

      try {
        const apiRes = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
          }),
        });
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData?.referenceId) {
            refId = apiData.referenceId;
          }
        }
      } catch {
        // Non-fatal if backend logging endpoint is unavailable
      }

      setSubmittedRef(result.status === 200 ? refId : 'SENT');
      setForm({name: '', email: '', subject: '', message: ''});
    } catch (err) {
      const errorText =
        err && typeof err === 'object' && 'text' in err && typeof err.text === 'string'
          ? err.text
          : 'Could not send your message via EmailJS. Please try again or email me directly.';
      setSubmitError(errorText);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-[#15172B]/10 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#6C3BFF] uppercase">
            Contact
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#15172B] sm:text-4xl [text-wrap:balance]">
            Let&apos;s Connect!
          </h2>
          <p className="mt-3 text-base text-[#474B6B]">
            Have an internship opening, digital marketing collaboration, or SEO &amp;
            website task in mind? Send a message or reach out directly.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Clickable Contact Info */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-2xl border border-[#15172B]/10 bg-[#F8F9FC] p-6">
              <h3 className="font-display text-lg font-bold text-[#15172B]">
                Direct Contact Details
              </h3>
              <p className="mt-1 text-sm text-[#474B6B]">
                Click any channel below to connect immediately.
              </p>

              <div className="mt-6 space-y-4">
                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Email */}
                  <div className="flex flex-col justify-between gap-2.5 rounded-xl border border-[#15172B]/10 bg-white p-3.5 transition-colors hover:border-[#6C3BFF]/50">
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={`mailto:${PROFILE.contact.email}`}
                        className="flex min-w-0 items-center gap-2.5 group"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6C3BFF]/10 text-[#6C3BFF] transition-colors group-hover:bg-[#6C3BFF] group-hover:text-white">
                          <Mail className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-medium text-[#5B6080]">
                          Email
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        aria-label="Copy email address"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#15172B]/15 text-[#474B6B] transition-colors hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
                      >
                        {copiedEmail ? (
                          <Check className="h-3.5 w-3.5 text-[#6C3BFF]" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    <a
                      href={`mailto:${PROFILE.contact.email}`}
                      title={PROFILE.contact.email}
                      className="truncate text-xs font-semibold text-[#15172B] transition-colors hover:text-[#6C3BFF]"
                    >
                      {PROFILE.contact.email}
                    </a>
                  </div>

                  {/* Phone */}
                  <a
                    href={PROFILE.contact.phoneHref}
                    className="flex flex-col justify-between gap-2.5 rounded-xl border border-[#15172B]/10 bg-white p-3.5 transition-colors hover:border-[#2878FF]/50 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2878FF]/10 text-[#2878FF] transition-colors group-hover:bg-[#2878FF] group-hover:text-white">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-medium text-[#5B6080]">
                        Phone
                      </span>
                    </div>
                    <p className="font-mono text-xs font-semibold tabular-nums text-[#15172B] transition-colors group-hover:text-[#2878FF]">
                      {PROFILE.contact.phone}
                    </p>
                  </a>
                </div>

                {/* LinkedIn */}
                <a
                  href={PROFILE.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 rounded-xl border border-[#15172B]/10 bg-white p-4 transition-colors hover:border-[#6C3BFF]/50 group"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6C3BFF]/10 text-[#6C3BFF] transition-colors group-hover:bg-[#6C3BFF] group-hover:text-white">
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#5B6080]">LinkedIn</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-[#15172B] group-hover:text-[#6C3BFF]">
                      linkedin.com/in/jatinkumar1999
                    </p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={PROFILE.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 rounded-xl border border-[#15172B]/10 bg-white p-4 transition-colors hover:border-[#2878FF]/50 group"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2878FF]/10 text-[#2878FF] transition-colors group-hover:bg-[#2878FF] group-hover:text-white">
                    <Github className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#5B6080]">GitHub</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-[#15172B] group-hover:text-[#2878FF]">
                      github.com/workjatin1999
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3.5 rounded-xl border border-[#15172B]/10 bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6C3BFF]/10 text-[#6C3BFF]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[#5B6080]">Location</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#15172B]">
                      {PROFILE.contact.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#15172B]/10 bg-[#F8F9FC] p-6 sm:p-8">
              {submittedRef ? (
                <div className="flex flex-col items-start rounded-xl border border-[#6C3BFF]/30 bg-white p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C3BFF]/10 text-[#6C3BFF]">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-[#15172B]">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#474B6B]">
                    Thank you for connecting with Jatin Kumar. Your inquiry has been
                    sent (Reference:{' '}
                    <span className="font-mono font-semibold text-[#6C3BFF]">
                      {submittedRef}
                    </span>
                    ).
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmittedRef(null)}
                      className="brand-gradient-bg inline-flex min-h-[42px] items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6C3BFF]/20 hover:opacity-95"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`mailto:${PROFILE.contact.email}`}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-[#15172B]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#15172B] hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
                    >
                      Open Email Client
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-800"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-[#15172B]"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => {
                          setForm({...form, name: e.target.value});
                          if (errors.name) setErrors({...errors, name: undefined});
                        }}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.name)}
                        className="mt-1.5 w-full rounded-xl border border-[#15172B]/15 bg-white px-4 py-3 text-sm text-[#15172B] placeholder:text-[#5B6080]/60 focus:border-[#6C3BFF] focus:ring-2 focus:ring-[#6C3BFF]/20 focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs font-medium text-rose-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-[#15172B]"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => {
                          setForm({...form, email: e.target.value});
                          if (errors.email) setErrors({...errors, email: undefined});
                        }}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(errors.email)}
                        className="mt-1.5 w-full rounded-xl border border-[#15172B]/15 bg-white px-4 py-3 text-sm text-[#15172B] placeholder:text-[#5B6080]/60 focus:border-[#6C3BFF] focus:ring-2 focus:ring-[#6C3BFF]/20 focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs font-medium text-rose-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-semibold text-[#15172B]"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => {
                        setForm({...form, subject: e.target.value});
                        if (errors.subject) setErrors({...errors, subject: undefined});
                      }}
                      placeholder="Digital Marketing Internship / Project Inquiry"
                      aria-invalid={Boolean(errors.subject)}
                      className="mt-1.5 w-full rounded-xl border border-[#15172B]/15 bg-white px-4 py-3 text-sm text-[#15172B] placeholder:text-[#5B6080]/60 focus:border-[#6C3BFF] focus:ring-2 focus:ring-[#6C3BFF]/20 focus:outline-none"
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-xs font-medium text-rose-600">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#15172B]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => {
                        setForm({...form, message: e.target.value});
                        if (errors.message) setErrors({...errors, message: undefined});
                      }}
                      placeholder="Tell me about the internship role, campaign goals, or project..."
                      aria-invalid={Boolean(errors.message)}
                      className="mt-1.5 w-full resize-y rounded-xl border border-[#15172B]/15 bg-white px-4 py-3 text-sm text-[#15172B] placeholder:text-[#5B6080]/60 focus:border-[#6C3BFF] focus:ring-2 focus:ring-[#6C3BFF]/20 focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-rose-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="brand-gradient-bg inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#6C3BFF]/20 transition-all duration-150 hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
