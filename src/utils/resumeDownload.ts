import {
  ABOUT_STRENGTHS,
  CERTIFICATIONS_LIST,
  EDUCATION_TIMELINE,
  EXPERIENCE_TIMELINE,
  PROFILE,
  SERVICES_LIST,
  SKILL_CATEGORIES,
} from '../data/portfolioData';

export function buildStandaloneResumeHtml(): string {
  const skillsHtml = SKILL_CATEGORIES.map(
    (cat) => `
      <div style="margin-bottom: 10px;">
        <strong style="color:#15172B;">${cat.title}:</strong>
        <span style="color:#474B6B;">${cat.items.map((i) => i.name).join(' · ')}</span>
      </div>`
  ).join('');

  const exp = EXPERIENCE_TIMELINE[0];

  const certsHtml = CERTIFICATIONS_LIST.map(
    (cert) => `
      <div style="margin-bottom: 8px;">
        <div class="row">
          <div><strong>${cert.title}</strong> — ${cert.issuer}</div>
          <span style="font-size:12px;color:#2878FF;">${cert.year}</span>
        </div>
        <p style="margin:2px 0;font-size:12.5px;color:#474B6B;">
          <strong>Course:</strong> ${cert.course} · <strong>Skills Covered:</strong> ${cert.skillsCovered.join(', ')}
        </p>
      </div>`
  ).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Jatin Kumar — Digital Marketing Resume</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #15172B; background: #F8F9FC; margin: 0; padding: 32px; line-height: 1.5; }
    .sheet { max-width: 820px; margin: 0 auto; background: #FFFFFF; padding: 36px; border-radius: 12px; border: 1px solid rgba(21, 23, 43, 0.08); }
    .header { border-bottom: 2px solid #6C3BFF; padding-bottom: 14px; margin-bottom: 18px; }
    h1 { margin: 0; font-size: 28px; color: #15172B; }
    .title { margin: 4px 0 8px; font-size: 14px; font-weight: 600; color: #474B6B; }
    .meta { font-size: 12.5px; color: #474B6B; }
    .meta a { color: #2878FF; text-decoration: underline; }
    h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #6C3BFF; border-bottom: 1px solid rgba(21, 23, 43, 0.14); padding-bottom: 4px; margin: 18px 0 10px; }
    p, li { font-size: 13px; color: #474B6B; margin: 4px 0; }
    ul { margin: 6px 0 0 18px; padding: 0; }
    .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    @media print { body { background: #FFFFFF; padding: 0; } .sheet { border: none; padding: 16px; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <h1>${PROFILE.name}</h1>
      <div class="title">${PROFILE.roles.join(' | ')}</div>
      <div class="meta">
        <a href="mailto:${PROFILE.contact.email}">${PROFILE.contact.email}</a> ·
        <a href="${PROFILE.contact.phoneHref}">${PROFILE.contact.phone}</a> ·
        <a href="${PROFILE.contact.linkedin}">linkedin.com/in/jatinkumar1999</a> ·
        <a href="${PROFILE.contact.github}">github.com/workjatin1999</a> ·
        ${PROFILE.contact.location}
      </div>
      <p style="margin-top:6px;font-weight:600;color:#6C3BFF;font-size:12px;">${PROFILE.availabilityText}</p>
    </div>

    <h2>Professional Summary</h2>
    <p>${PROFILE.bio}</p>
    <p>Background in Political Science and customer service with strong communication, problem-solving, and customer relationship skills, now focused on SEO, paid advertising, social media management, and website optimization.</p>

    <h2>Work Experience</h2>
    <div class="row">
      <strong>${exp.position} — ${exp.company}</strong>
      <span style="font-size:12px;color:#2878FF;">${exp.duration}</span>
    </div>
    <p>${exp.summary}</p>
    <p><strong>Transferable Skills:</strong> ${exp.transferableSkills.join(' · ')}</p>

    <h2>Education</h2>
    ${EDUCATION_TIMELINE.map(
      (edu) => `
      <div class="row" style="margin-bottom:6px;">
        <div><strong>${edu.degree}</strong> — ${edu.institution}</div>
        <span style="font-size:12px;color:#5B6080;">${edu.period}</span>
      </div>`
    ).join('')}

    <h2>Certifications</h2>
    ${certsHtml}

    <h2>Skills & Expertise</h2>
    ${skillsHtml}

    <h2>Core Strengths</h2>
    <p>${ABOUT_STRENGTHS.map((s) => s.title).join(' · ')}</p>

    <h2>Digital Marketing Focus Areas</h2>
    <ul>
      ${SERVICES_LIST.map((s) => `<li><strong>${s.title}:</strong> ${s.description}</li>`).join('')}
    </ul>
  </div>
</body>
</html>`;
}

export function downloadStandaloneResume(): void {
  const html = buildStandaloneResumeHtml();
  const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Jatin_Kumar_Digital_Marketing_Resume.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
