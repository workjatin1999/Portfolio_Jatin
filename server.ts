import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const submissions: ContactSubmission[] = [];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({limit: '64kb'}));

  app.get('/api/health', (_req, res) => {
    res.json({status: 'ok', service: 'jatin-portfolio'});
  });

  app.post('/api/contact', (req, res) => {
    const rawName = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const rawEmail = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
    const rawSubject = typeof req.body?.subject === 'string' ? req.body.subject.trim() : '';
    const rawMessage = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

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

    const entry: ContactSubmission = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      name: rawName,
      email: rawEmail,
      subject: rawSubject,
      message: rawMessage,
      submittedAt: new Date().toISOString(),
    };

    submissions.push(entry);

    try {
      const logPath = path.join('/tmp', 'jatin-portfolio-inquiries.json');
      fs.writeFileSync(logPath, JSON.stringify(submissions.slice(-100), null, 2));
    } catch {
      // Non-fatal in read-only environments
    }

    res.status(201).json({
      ok: true,
      referenceId: entry.id,
      submittedAt: entry.submittedAt,
      message: 'Thank you for reaching out. Your message has been received.',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
