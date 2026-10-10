import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

async function generateCV() {
  const doc = new PDFDocument({ 
    margin: 45, 
    size: 'A4',
    info: {
      Title: 'CV - Cronos - Développeur Full-Stack',
      Author: 'Cronos',
      Subject: 'Curriculum Vitae'
    }
  });

  const outputPath = path.resolve('public/cv-cronos.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // High contrast palette: Deep Black & Crisp Typography (No faded gray)
  const COLOR_BLACK = '#000000';
  const COLOR_BODY = '#111111';
  const COLOR_SUB = '#262626';
  const COLOR_LINE = '#d4d4d8';
  const COLOR_LINK = '#0f172a'; // Deep formal navy for professional print

  // Generate QR Code Buffer for https://cronos.build
  const qrBuffer = await QRCode.toBuffer('https://cronos.build', {
    margin: 1,
    width: 140,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  // 1. Header (Left: Identity & Contact | Right: QR Code)
  const topY = 45;
  doc.fontSize(22).font('Helvetica-Bold').fillColor(COLOR_BLACK).text('CRONOS', 45, topY, { characterSpacing: 1.2 });
  
  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLOR_SUB)
     .text('DÉVELOPPEUR FULL-STACK (WEB & LOGICIEL)', 45, topY + 28);

  const contactY = topY + 45;
  doc.fontSize(8.8).font('Helvetica').fillColor(COLOR_BODY);
  doc.text('Île-de-France, France', 45, contactY);
  doc.text('Email : ', 45, contactY + 12, { continued: true })
     .font('Helvetica-Bold').fillColor(COLOR_BLACK)
     .text('contact@cronos.build', { link: 'mailto:contact@cronos.build' });

  doc.font('Helvetica').fillColor(COLOR_BODY)
     .text('GitHub : ', 45, contactY + 24, { continued: true })
     .font('Helvetica-Bold').fillColor(COLOR_BLACK)
     .text('github.com/cronos-hub', { link: 'https://github.com/cronos-hub' });

  doc.font('Helvetica').fillColor(COLOR_BODY)
     .text('Discord : @cronos', 45, contactY + 36);

  // Embed QR Code on top right
  const qrSize = 58;
  const qrX = 550 - qrSize;
  const qrY = topY - 2;
  doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });
  doc.fontSize(6.8).font('Helvetica-Bold').fillColor(COLOR_BLACK)
     .text('PORTFOLIO EN LIGNE', qrX - 10, qrY + qrSize + 3, { width: qrSize + 20, align: 'center', link: 'https://cronos.build' });
  doc.fontSize(6.5).font('Helvetica').fillColor(COLOR_SUB)
     .text('cronos.build', qrX - 10, qrY + qrSize + 11, { width: qrSize + 20, align: 'center', link: 'https://cronos.build' });

  // Section divider helper
  const drawSection = (title, yOffset) => {
    doc.y = yOffset;
    doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_BLACK).text(title, 45, doc.y, { characterSpacing: 0.5 });
    doc.moveDown(0.2);
    doc.strokeColor(COLOR_LINE).lineWidth(0.75).moveTo(45, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);
  };

  // 2. Profil (Non-technical friendly, concrete)
  drawSection('PROFIL & SYNTHÈSE', topY + 105);
  doc.fontSize(8.8).font('Helvetica').fillColor(COLOR_BODY).text(
    'Développeur passionné par la conception d\'applications web ergonomiques et d\'outils logiciels fiables. ' +
    'Mon focus principal est de concevoir des interfaces claires, fluides et immédiatement accessibles pour les utilisateurs finaux, ' +
    'tout en assurant des bases techniques solides et réactives. ' +
    'Autonome et pragmatique, j\'ai déjà réalisé et mis en production plusieurs projets d\'envergure.',
    { lineGap: 3, align: 'justify' }
  );

  // 3. Projets & Réalisations Concrètes (Chronological, no em-dashes)
  drawSection('RÉALISATIONS & PROJETS SIGNIFICATIFS', doc.y + 12);

  // Project 1: Zenith
  doc.fontSize(9.8).font('Helvetica-Bold').fillColor(COLOR_BLACK)
     .text('Zenith : Plateforme de Gestion & Modération Discord (zenithbot.app)', { link: 'https://zenithbot.app/' });
  doc.fontSize(8.4).font('Helvetica-Bold').fillColor(COLOR_SUB)
     .text('Lead Architect & Développeur Full-Stack | 2025 / 2026 (En production)');
  doc.moveDown(0.2);
  doc.fontSize(8.6).font('Helvetica').fillColor(COLOR_BODY).text(
    '• Conception d\'un tableau de bord web réactif en SvelteKit : ergonomie soignée et configuration en temps réel.\n' +
    '• Moteur automatisé en Rust assurant le traitement instantané des flux de données sans ralentissement.\n' +
    '• Déployé et activement utilisé au quotidien sur des communautés Discord comptant plus de 500 membres.',
    { lineGap: 2.8 }
  );
  doc.moveDown(0.55);

  // Project 2: La Maison de l'ESS
  doc.fontSize(9.8).font('Helvetica-Bold').fillColor(COLOR_BLACK)
     .text('La Maison de l\'ESS : Plateforme Numérique & Réservation (lamaisondeless.org)', { link: 'https://lamaisondeless.org/' });
  doc.fontSize(8.4).font('Helvetica-Bold').fillColor(COLOR_SUB)
     .text('Développeur Web & Intégrateur (Stage pratique de 1 mois) | 2025');
  doc.moveDown(0.2);
  doc.fontSize(8.6).font('Helvetica').fillColor(COLOR_BODY).text(
    '• Réalisation complète du portail web officiel pour un pôle territorial d\'économie sociale et solidaire.\n' +
    '• Catalogue interactif des 6 espaces professionnels (kiosque gourmand, boutique, bureaux partagés, salles).\n' +
    '• Module de réservation avec calcul automatisé des tarifs et simplification des démarches usagers.\n' +
    '• Projet livré clé en main et hébergé en ligne pour les créateurs et associations partenaires.',
    { lineGap: 2.8 }
  );
  doc.moveDown(0.55);

  // Project 3: Studio UTy
  doc.fontSize(9.8).font('Helvetica-Bold').fillColor(COLOR_BLACK)
     .text('Studio UTy : Outil Collaboratif de Traduction de Jeu Vidéo (studio.zenith.fr)', { link: 'https://studio.xn--znith-bsa.fr/' });
  doc.fontSize(8.4).font('Helvetica-Bold').fillColor(COLOR_SUB)
     .text('Co-Lead & Développeur Principal (Équipe UTY FR) | 2024 / 2025');
  doc.moveDown(0.2);
  doc.fontSize(8.6).font('Helvetica').fillColor(COLOR_BODY).text(
    '• Interface web collaborative créée pour l\'équipe de traduction française du jeu Undertale Yellow.\n' +
    '• Centralisation et synchronisation de 9 865 répliques et 2 494 dialogues pour les traducteurs.\n' +
    '• Contrôle visuel en direct des contraintes physiques de texte afin d\'empêcher tout dépassement en jeu.\n' +
    '• Pipeline d\'export automatisé des patchs de jeu distribués à la communauté francophone.',
    { lineGap: 2.8 }
  );

  // 4. Formation
  drawSection('FORMATION ACADÉMIQUE', doc.y + 12);
  doc.fontSize(9.8).font('Helvetica-Bold').fillColor(COLOR_BLACK)
     .text('Terminale Baccalauréat Professionnel CIEL');
  doc.fontSize(8.4).font('Helvetica-Bold').fillColor(COLOR_SUB)
     .text('Cybersécurité, Informatique & Réseaux, Électronique | 2024 / 2026 | Île-de-France');
  doc.moveDown(0.2);
  doc.fontSize(8.6).font('Helvetica').fillColor(COLOR_BODY).text(
    '• Formation pratique aux fondements des architectures matérielles, des réseaux et des systèmes informatiques.\n' +
    '• Mise en œuvre directe des compétences à travers la réalisation de projets web et logiciels de A à Z.',
    { lineGap: 2.8 }
  );

  // 5. Compétences Clés (Organized 3-column table)
  drawSection('COMPÉTENCES CLÉS', doc.y + 12);
  const colY = doc.y;
  const c1 = 45;
  const c2 = 215;
  const c3 = 385;

  // Col 1
  doc.fontSize(9).font('Helvetica-Bold').fillColor(COLOR_BLACK).text('Interfaces & Web', c1, colY);
  doc.moveDown(0.2);
  doc.fontSize(8.4).font('Helvetica').fillColor(COLOR_BODY).text(
    '• SvelteKit & Svelte 5\n' +
    '• TypeScript / JavaScript\n' +
    '• HTML5 & CSS Moderne\n' +
    '• Ergonomie & Responsive',
    c1, doc.y, { lineGap: 2.2 }
  );

  // Col 2
  doc.fontSize(9).font('Helvetica-Bold').fillColor(COLOR_BLACK).text('Logique & Backend', c2, colY);
  doc.moveDown(0.2);
  doc.fontSize(8.4).font('Helvetica').fillColor(COLOR_BODY).text(
    '• Rust (Tokio)\n' +
    '• Node.js\n' +
    '• PostgreSQL & Redis\n' +
    '• APIs REST & WebSockets',
    c2, doc.y, { lineGap: 2.2 }
  );

  // Col 3
  doc.fontSize(9).font('Helvetica-Bold').fillColor(COLOR_BLACK).text('Systèmes & Outils', c3, colY);
  doc.moveDown(0.2);
  doc.fontSize(8.4).font('Helvetica').fillColor(COLOR_BODY).text(
    '• Environnement Linux\n' +
    '• Git & GitHub\n' +
    '• Déploiement web\n' +
    '• Fondations réseaux CIEL',
    c3, doc.y, { lineGap: 2.2 }
  );

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => {
      console.log('CV PDF successfully generated with QR code & deep black text at:', outputPath);
      resolve(outputPath);
    });
  });
}

generateCV().catch(console.error);
