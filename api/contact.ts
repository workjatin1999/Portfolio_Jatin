interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status: (code: number) => {
    json: (body: unknown) => void;
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function parseBody(rawBody: unknown): ContactPayload {
  if (!rawBody) return {};
  if (typeof rawBody === 'string') {
    try {
      const parsed = JSON.parse(rawBody);
      return typeof parsed === 'object' && parsed !== null
        ? (parsed as ContactPayload)
        : {};
    } catch {
      return {};
    }
  }
  if (typeof rawBody === 'object') {
    return rawBody as ContactPayload;
  }
  return {};
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ok: false, error: 'Method not allowed'});
    return;
  }

  const body = parseBody(req.body);
  const rawName = typeof body.name === 'string' ? body.name.trim() : '';
  const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
  const rawSubject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

  const fieldErrors: Record<string, string> = {};

  if (rawName.length < 2 || rawName.length > 120) {
    fieldErrors.name = 'Please enter your full name (2–120 characters).';
  }
  if (!isValidEmail(rawEmail) || rawEmail.length > 180) {
    fieldErrors.email = 'Please enter a valid email address.';
  }
  if (rawSubject.length < 3 || rawSubject.length > 180) {
    fieldErrors.subject = 'Please provide a brief subject (3–180 characters).';
  }
  if (rawMessage.length < 10 || rawMessage.length > 3000) {
    fieldErrors.message = 'Please write a message of at least 10 characters.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    res.status(400).json({
      ok: false,
      error: 'Please review the highlighted fields.',
      fieldErrors,
    });
    return;
  }

  const referenceId = `INQ-${Date.now().toString(36).toUpperCase()}`;
  const submittedAt = new Date().toISOString();

  res.status(201).json({
    ok: true,
    referenceId,
    submittedAt,
    message: 'Thank you for reaching out. Your message has been received.',
  });
}
