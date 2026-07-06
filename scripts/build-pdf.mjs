/**
 * Gerador do PDF branded "O Plano Simples de Deus para a Salvacao".
 * -------------------------------------------------------------
 * Produz public/plano-de-salvacao.pdf com a identidade da igreja:
 * logo, nome, cores da marca, tipografia serifada, marca d'agua do
 * logo ao FUNDO (atras do texto, via evento pageAdded) e as
 * referencias biblicas destacadas em blocos com filete verde.
 * Rode com: npm run pdf
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'plano-de-salvacao.pdf');
const BG = path.join(__dirname, '..', 'public', 'images', 'bg-salvacao-desktop.png');

// Paleta da marca.
const EMERALD = '#1a6b4d';
const INK = '#151a18';
const BODY = '#262f2b';
const MUTED = '#5b625f';
const LINE = '#e2e4e0';

const logoSvg = (color) => `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
  <circle cx="50" cy="50" r="47" stroke="${color}" stroke-width="1.5"/>
  <circle cx="50" cy="50" r="42" stroke="${color}" stroke-width="1" opacity="0.55"/>
  <path d="M50 66C42 60 33 59 25 61V40C33 38 42 39 50 45C58 39 67 38 75 40V61C67 59 58 60 50 66Z" stroke="${color}" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M50 45V66" stroke="${color}" stroke-width="1.4"/>
  <path d="M31 46.5C36 45.5 41 46 45 48" stroke="${color}" stroke-width="0.9" opacity="0.6"/>
  <path d="M31 51.5C36 50.5 41 51 45 53" stroke="${color}" stroke-width="0.9" opacity="0.6"/>
  <path d="M55 48C59 46 64 45.5 69 46.5" stroke="${color}" stroke-width="0.9" opacity="0.6"/>
  <path d="M55 53C59 51 64 50.5 69 51.5" stroke="${color}" stroke-width="0.9" opacity="0.6"/>
  <path d="M50 14V41" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M40 24H60" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 56;
const CW = PAGE_W - M * 2;
const BOTTOM = 78; // margem inferior (deixa espaco para o rodape)

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: M, bottom: BOTTOM, left: M, right: M },
  bufferPages: true,
  autoFirstPage: false,
  info: {
    Title: 'O Plano Simples de Deus para a Salvacao',
    Author: 'Igreja Batista Emanuel de Jundiai',
    Subject: 'A Igreja da Biblia Aberta',
  },
});
doc.pipe(fs.createWriteStream(OUT));

// Fundo por pagina (desenhado na criacao, antes do texto):
//  - Pagina 1: faixa da foto (Biblia e oliveira) no topo, esmaecendo, como capa.
//  - Paginas internas: marca d'agua discreta do logo ao centro.
let pageCount = 0;
doc.on('pageAdded', () => {
  pageCount += 1;
  if (pageCount === 1) {
    const bandH = (PAGE_W * 941) / 1672; // preserva o aspecto da foto (16:9)
    doc.save();
    doc.opacity(0.3);
    doc.image(BG, 0, 0, { width: PAGE_W, height: bandH });
    doc.restore();
    // Esmaece a base da faixa para o branco, para o texto entrar limpo.
    const fade = doc.linearGradient(0, bandH * 0.2, 0, bandH);
    fade.stop(0, '#ffffff', 0).stop(1, '#ffffff', 1);
    doc.save();
    doc.rect(0, 0, PAGE_W, bandH).fill(fade);
    doc.restore();
  } else {
    const wm = 300;
    doc.save();
    SVGtoPDF(doc, logoSvg('#eef3f0'), (PAGE_W - wm) / 2, (PAGE_H - wm) / 2, { width: wm, height: wm });
    doc.restore();
  }
  doc.x = M;
  doc.y = doc.page.margins.top;
});

const pageBottom = () => PAGE_H - doc.page.margins.bottom;

// --- Helpers de conteudo ---
const para = (text, opts = {}) => {
  doc.font(opts.font || 'Times-Roman').fontSize(opts.size || 11.5).fillColor(opts.color || BODY)
    .text(text, { width: CW, align: opts.align || 'justify', lineGap: 2.5, paragraphGap: 9, ...opts });
};

const heading = (text) => {
  if (doc.y > pageBottom() - 70) doc.addPage();
  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').fontSize(12).fillColor(INK).text(text, { width: CW, paragraphGap: 6 });
};

// Referencia biblica destacada: filete verde + citacao em italico + referencia em verde.
const verse = (quote, ref) => {
  const w = CW - 22;
  doc.font('Times-Italic').fontSize(11.5);
  const qh = doc.heightOfString(`"${quote}"`, { width: w, lineGap: 2 });
  const blockH = qh + 22;
  if (doc.y + blockH > pageBottom()) doc.addPage();

  const top = doc.y + 6;
  doc.font('Times-Italic').fontSize(11.5).fillColor(INK)
    .text(`"${quote}"`, M + 18, top, { width: w, lineGap: 2 });
  doc.font('Helvetica-Bold').fontSize(8).fillColor(EMERALD)
    .text(ref.toUpperCase(), M + 18, doc.y + 4, { characterSpacing: 1.2 });
  const bottom = doc.y + 6;

  doc.save();
  doc.rect(M, top, 2.5, bottom - top).fillColor(EMERALD).fill();
  doc.restore();

  doc.x = M;
  doc.y = bottom + 6;
};

// --- Primeira pagina: cabecalho ---
doc.addPage();
SVGtoPDF(doc, logoSvg(EMERALD), M, 48, { width: 44, height: 44 });
doc.font('Helvetica-Bold').fontSize(14).fillColor(INK).text('Igreja Batista Emanuel', M + 56, 52);
doc.font('Helvetica').fontSize(9.5).fillColor(MUTED).text('A Igreja da Bíblia Aberta', M + 56, 71);
doc.moveTo(M, 106).lineTo(PAGE_W - M, 106).lineWidth(0.8).strokeColor(LINE).stroke();

doc.font('Helvetica-Bold').fontSize(8.5).fillColor(EMERALD)
  .text('O PLANO DE SALVAÇÃO', M, 128, { characterSpacing: 2 });
doc.font('Times-Bold').fontSize(28).fillColor(INK)
  .text('O Plano Simples de Deus para a Salvação', M, 144, { width: CW, lineGap: 2 });
doc.moveDown(0.8);

// --- Corpo completo, com referencias evidenciadas ---
para('Meu amigo: gostaria de fazer-lhe a pergunta mais importante de sua vida. Sua alegria ou tristeza para toda a eternidade depende de sua resposta. A pergunta é: você é salvo? Não pergunto se você é uma pessoa boa, nem se você é membro de uma igreja, mas se você é salvo? Você tem certeza que irá para o céu quando morrer?');

heading('Você precisa nascer de novo');
para('Deus diz que para ir para o céu você tem que nascer de novo. Em João 3:7, Jesus disse a Nicodemos:');
verse('Necessário vos é nascer de novo.', 'João 3:7');
para('Na Bíblia, Deus nos dá o plano de como nascer de novo, ou seja, como ser salvo. O plano de Deus é simples! Você pode ser salvo hoje. Como?');

heading('Reconheça que você é pecador');
para('Primeiro, meu amigo, você precisa reconhecer que você é um pecador.');
verse('Porque todos pecaram e destituídos estão da glória de Deus.', 'Romanos 3:23');
para('Por você ser um pecador, você está condenado à morte, o que inclui separação eterna de Deus.');
verse('Porque o salário do pecado é a morte.', 'Romanos 6:23');
verse('E, como aos homens está ordenado morrerem uma vez, vindo, depois disso, o juízo.', 'Hebreus 9:27');

heading('Deus proveu um substituto');
para('Mas o amor de Deus por você é tão grande que Ele deu Seu único Filho, Jesus, para carregar o seu pecado e morrer em seu lugar. Jesus teve que derramar o Seu próprio sangue e morrer.');
verse('Àquele que não conheceu pecado, o fez pecado por nós; para que, nele, fôssemos feitos justiça de Deus.', '2 Coríntios 5:21');
verse('Porque a vida da carne está no sangue.', 'Levítico 17:11');
verse('E sem derramamento de sangue não há remissão.', 'Hebreus 9:22');
verse('Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.', 'Romanos 5:8');
para('Embora não possamos entender como, Deus lançou os meus pecados e os seus sobre Jesus, e Ele morreu em nosso lugar. Ele tornou-se o nosso substituto. É verdade, pois Deus não pode mentir.');

heading('Arrependa-se e creia');
para('Deus anuncia agora a todos os homens, em todo lugar, que se arrependam (Atos 17:30). Este arrependimento envolve uma mudança de mentalidade que concorda com a declaração que Deus faz de que um indivíduo é pecador, e também concorda com o que Jesus fez por nós na cruz. Em Atos 16:30-31, o carcereiro de Felipo perguntou a Paulo e Silas: "Senhores, que é necessário que eu faça para me salvar?" E eles disseram:');
verse('Crê no Senhor Jesus Cristo e serás salvo.', 'Atos 16:31');
para('Simplesmente confie nEle como aquEle que tomou o seu pecado, morreu no seu lugar, foi sepultado e a quem Deus ressuscitou. Sua ressurreição assegura vida eterna a quem recebe Jesus como Salvador pessoal.');
verse('Mas a todos quantos o receberam deu-lhes o poder de serem feitos filhos de Deus: aos que crêem no seu nome.', 'João 1:12');
verse('Porque todo aquele que invocar o nome do Senhor será salvo.', 'Romanos 10:13');
para('"Todo aquele" inclui você. "Será salvo" não significa talvez, nem poderá, mas "será salvo".');

// --- Bloco da oracao (destacado) ---
{
  para('Com certeza, você admite que é um pecador. Agora mesmo, onde você estiver, arrependido, eleve o seu coração a Deus em oração. Em Lucas 18:13, o pecador orou: "Ó Deus, tem misericórdia de mim, pecador!". Simplesmente ore:');

  const prayerText = '"Ó Deus, eu sei que sou pecador. Creio que Jesus foi meu substituto quando Ele morreu na cruz. Creio que o sangue que Ele verteu, que a Sua morte, sepultamento e ressurreição foram por mim. Eu agora O recebo como meu Salvador. Agradeço-te pelo perdão dos meus pecados, pelo dom da salvação e vida eterna, por causa da Sua graça misericordiosa. Amém."';
  doc.font('Times-Italic').fontSize(12.5);
  const ph = doc.heightOfString(prayerText, { width: CW - 36, lineGap: 3 });
  if (doc.y + ph + 40 > pageBottom()) doc.addPage();

  const top = doc.y + 4;
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(EMERALD).text('UMA ORAÇÃO', M + 18, top + 14, { characterSpacing: 2 });
  doc.font('Times-Italic').fontSize(12.5).fillColor(INK).text(prayerText, M + 18, doc.y + 4, { width: CW - 36, lineGap: 3 });
  const bottom = doc.y + 14;
  doc.save();
  doc.roundedRect(M, top, CW, bottom - top, 8).lineWidth(1).strokeColor(EMERALD).strokeOpacity(0.35).stroke();
  doc.rect(M, top, 3, bottom - top).fillColor(EMERALD).fill();
  doc.restore();
  doc.x = M;
  doc.y = bottom + 10;
}

para('Simplesmente aceite a Palavra de Deus e receba Sua salvação pela fé. Creia e você será salvo. Nenhuma igreja, nenhuma instituição religiosa, nenhuma boa obra poderá salvá-lo. Lembre-se, somente Deus pode salvar!');
para('O plano simples de Deus para salvação é: porque você é pecador, você precisa de salvação. Portanto, a menos que você creia em Jesus, que morreu no seu lugar, você passará a eternidade no inferno. Se você crer nEle como seu Salvador crucificado, sepultado e ressurreto, você receberá perdão por todos os seus pecados e Seu dom de salvação eterna pela fé.');
para('Você diz: "com certeza, não pode ser tão simples assim". Sim, é bem simples e bíblico. Este é o plano de Deus. Meu amigo, creia em Jesus e O receba como seu Salvador pessoal hoje.');
para('Se o plano de Deus não estiver perfeitamente claro, leia este folheto várias vezes, sem parar, até que você o entenda. Sua alma é mais valiosa que o mundo inteiro.');
verse('Pois que aproveitaria ao homem ganhar todo o mundo e perder a sua alma?', 'Marcos 8:36');
para('Tenha certeza de que você é salvo. O poder de Deus o salvará, o manterá salvo e fará com que você viva uma vida cristã vitoriosa.');
verse('Não veio sobre vós tentação, senão humana; mas fiel é Deus, que vos não deixará tentar acima do que podeis; antes, com a tentação dará também o escape, para que a possais suportar.', '1 Coríntios 10:13');
para('Não confie em seus sentimentos, pois eles mudam. Confie nas promessas de Deus. Elas nunca mudam.');

heading('Depois de ser salvo');
para('Há três coisas para praticar diariamente para o seu crescimento espiritual: Orar (você fala com Deus), Ler a sua Bíblia (Deus fala com você) e Testemunhar (você fala a outros de Deus). Você deve ser batizado em obediência ao Senhor Jesus Cristo, como testemunho público de sua salvação, e, sem demora, unir-se a uma igreja que pregue a Bíblia.');
verse('Portanto, não te envergonhes do testemunho de nosso Senhor.', '2 Timóteo 1:8');
verse('Portanto, qualquer que me confessar diante dos homens, eu o confessarei diante de meu Pai, que está nos céus.', 'Mateus 10:32');

doc.moveDown(0.4);
para('Folheto "O Plano Simples de Deus para a Salvação", por Ford Porter (POR 164).', {
  font: 'Helvetica', size: 8.5, color: MUTED, align: 'left',
});

// --- Rodape em todas as paginas (por cima, na margem inferior) ---
const range = doc.bufferedPageRange();
console.log('paginas geradas:', range.count);
for (let i = 0; i < range.count; i += 1) {
  doc.switchToPage(range.start + i);
  doc.page.margins.bottom = 0; // evita paginas em branco ao escrever no rodape
  const fy = PAGE_H - 54;
  doc.moveTo(M, fy).lineTo(PAGE_W - M, fy).lineWidth(0.8).strokeColor(LINE).stroke();
  doc.font('Helvetica').fontSize(8).fillColor(MUTED)
    .text('Igreja Batista Emanuel de Jundiai  .  Cultos: Domingos 09h e 18h, Quartas 19h30', M, fy + 8, { width: CW - 44, lineBreak: false });
  doc.font('Helvetica').fontSize(8).fillColor(MUTED)
    .text(`${i + 1} / ${range.count}`, PAGE_W - M - 44, fy + 8, { width: 44, align: 'right', lineBreak: false });
}

doc.end();
console.log('PDF gerado em', OUT);
