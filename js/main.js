// ============================
// Scroll Reveal (Intersection Observer)
// ============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// ============================
// Navbar Scroll Effect
// ============================
const navbar = document.querySelector('.navbar');
const navSectionLinks = Array.from(
  document.querySelectorAll('.navbar-links a[href^="#"]:not(.navbar-cta)')
);
const navSections = navSectionLinks
  .map((link) => ({
    link,
    section: document.querySelector(link.getAttribute('href')),
  }))
  .filter((item) => item.section);

function updateActiveNavLink() {
  if (!navSections.length) return;

  const activationLine = navbar.offsetHeight + 24;
  let activeItem = navSections[0];

  for (const item of navSections) {
    const rect = item.section.getBoundingClientRect();

    if (rect.top <= activationLine && rect.bottom > activationLine) {
      activeItem = item;
      break;
    }

    if (rect.top <= activationLine) {
      activeItem = item;
    }
  }

  navSectionLinks.forEach((link) => {
    link.classList.toggle('active', link === activeItem.link);
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  updateActiveNavLink();
});

updateActiveNavLink();

// ============================
// Mobile Menu Toggle
// ============================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.navbar-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// ============================
// Floating Particles
// ============================
function createParticles(container, count = 15) {
  const el = document.querySelector(container);
  if (!el) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 2;
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${6 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite;
      opacity: ${0.2 + Math.random() * 0.4};
    `;
    el.appendChild(particle);
  }
}

createParticles('.hero');

// ============================
// Stats Counter Animation
// ============================
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count, 10);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// ============================
// Stores Filter
// ============================
// ============================
// STORES DATA & FILTER
// ============================
// [name, city, estado, url]
var STORES_DATA = [
  ['GMAD ABC Madeiras', 'Região ABC', 'SP', 'https://www.gmad.com.br/institucional/nossas-lojas/abc-madeiras'],
  ['GMAD Americana', 'Americana', 'SP', 'https://www.gmad.com.br/institucional/nossas-lojas/americana'],
  ['GMAD Aracaju', 'Aracaju', 'SE', 'https://www.gmad.com.br/institucional/nossas-lojas/gmad-aracaju'],
  ['GMAD Bauru', 'Bauru', 'SP', 'https://www.gmad.com.br/institucional/nossas-lojas/bauru'],
  ['GMAD BM Madeiras', 'Espírito Santo', 'ES', 'https://www.gmad.com.br/institucional/nossas-lojas/grupo-bridi'],
  ['GMAD Bridi Madeiras', 'Espírito Santo', 'ES', 'https://www.gmad.com.br/institucional/nossas-lojas/grupo-bridi'],
  ['GMAD Buogini', 'São Paulo', 'SP', 'https://www.gmad.com.br/institucional/nossas-lojas/buogini'],
  ['GMAD Campinas', 'Campinas', 'SP', 'https://www.gmad.com.br/institucional/nossas-lojas/campinas'],
  ['GMAD Campo Grande', 'Campo Grande', 'MS', 'https://www.gmad.com.br/institucional/nossas-lojas/campo-grande'],
  ['GMAD Campo Largo', 'Campo Largo', 'PR', 'https://www.gmad.com.br/institucional/nossas-lojas/campo-largo'],
  ['GMAD Canoas', 'Canoas', 'RS', 'https://www.gmad.com.br/institucional/nossas-lojas/placa-sul-canoas'],
  ['GMAD Cariri Madeireira', 'Juazeiro do Norte', 'CE', 'https://www.gmad.com.br/institucional/nossas-lojas/cariri'],
  ['GMAD Casa da Madeira Anápolis', 'Anápolis', 'GO', 'https://www.gmad.com.br/institucional/nossas-lojas/casa-da-madeira-anapolis'],
  ['GMAD Casa da Madeira Brasília', 'Brasília', 'DF', 'https://www.gmad.com.br/institucional/nossas-lojas/-casa-da-madeira-brasilia'],
  ['GMAD Casa da Madeira Taguatinga', 'Taguatinga', 'DF', 'https://www.gmad.com.br/institucional/nossas-lojas/casa-da-madeira-taguatinga'],
  ['GMAD Casa do Marceneiro Coimbra', 'Brasília', 'DF', 'https://www.gmad.com.br/institucional/nossas-lojas/casa-do-marceneiro-coimbra'],
  ['GMAD Casa do Marceneiro Palmas', 'Palmas', 'TO', 'https://www.gmad.com.br/institucional/nossas-lojas/casa-do-marceneiro-tocantins'],
  ['GMAD Casa do Marceneiro T63', 'Goiânia', 'GO', 'https://www.gmad.com.br/institucional/nossas-lojas/casa-do-marceneiro-goiania'],
  ['GMAD Casa do MDF', 'Presidente Prudente', 'SP', 'https://www.gmad.com.br/gmad-casadomdf'],
  ['GMAD Caxias do Sul', 'Caxias do Sul', 'RS', 'https://www.gmad.com.br/gmad-caxias-lp'],
  ['GMAD Centro do Alumínio', 'Manaus', 'AM', 'https://www.gmad.com.br/institucional/nossas-lojas/gmad-centro-do-aluminio'],
  ['GMAD Centro Oeste', 'Cuiabá', 'MT', 'https://www.gmad.com.br/gmad-centrooeste'],
  ['GMAD Chapecomp', 'Chapecó', 'SC', 'https://www.gmad.com.br/gmad-chapecomp'],
  ['GMAD Compin', 'Curitiba', 'PR', 'https://www.gmad.com.br/gmad-compin'],
  ['GMAD Complond', 'Londrina', 'PR', 'https://www.gmad.com.br/gmad-complond'],
  ['GMAD Compmag', 'Maringá', 'PR', 'https://www.gmad.com.br/institucional/nossas-lojas/compmag'],
  ['GMAD Curitiba', 'Curitiba', 'PR', 'https://www.gmad.com.br/institucional/nossas-lojas/'],
  ['GMAD Detalhes MDF Belém', 'Belém', 'PA', 'https://www.gmad.com.br/gmad-detalhesmdf-belem'],
  ['GMAD Detalhes MDF Castanhal', 'Castanhal', 'PA', 'https://www.gmad.com.br/gmad-detalhesmdf-castanhal'],
  ['GMAD Feira de Santana', 'Feira de Santana', 'BA', 'https://www.gmad.com.br/gmad-feiradesantana'],
  ['GMAD Flaviense', 'Campo Grande', 'RJ', 'https://www.gmad.com.br/gmad-flaviensecampogrande'],
  ['GMAD Flaviense Nova Iguaçu', 'Nova Iguaçu', 'RJ', 'https://www.gmad.com.br/gmad-flaviensenovaiguacu'],
  ['GMAD Flaviense Zona Norte', 'Rio de Janeiro', 'RJ', 'https://www.gmad.com.br/gmad-flaviensezonanorte'],
  ['GMAD Flaviense Curirica', 'Rio de Janeiro', 'RJ', 'https://www.gmad.com.br/gmad-flaviensecuricica'],
  ['GMAD Flaviense São Gonçalo', 'São Gonçalo', 'RJ', 'https://www.gmad.com.br/gmad-flaviensesaogoncalo'],
  ['GMAD Flaviense Maricá', 'Maricá', 'RJ', 'https://www.gmad.com.br/gmad-flaviensemarica'],
  ['GMAD Flaviense Campo Grande', 'Campo Grande', 'RJ', 'https://www.gmad.com.br/gmad-flaviensecampogrande'],
  ['GMAD Flaviense Duque Filial 2', 'Duque de Caxias', 'RJ', 'https://www.gmad.com.br/gmad-flavienseduquefilial2'],
  ['GMAD Flaviense Duque', 'Duque de Caxias', 'RJ', 'https://www.gmad.com.br/gmad-flavienseduque'],
  ['GMAD Fortaleza Madeireira', 'Fortaleza', 'CE', 'https://www.gmad.com.br/gmad-fortaleza'],
  ['GMAD Guarapuava', 'Guarapuava', 'PR', 'https://www.gmad.com.br/gmad-guarapuava'],
  ['GMAD Jamad Cabedelo', 'Cabedelo', 'PB', 'https://www.gmad.com.br/gmad-jamadcabedelo'],
  ['GMAD Jamad Natal', 'Natal', 'RN', 'https://www.gmad.com.br/gmad-jamad'],
  ['GMAD JKV Madeiras', 'São Paulo', 'SP', 'https://www.gmad.com.br/gmad-jkvmadeiras'],
  ['GMAD JR Madeiras', 'Vale do Paraíba', 'SP', 'https://www.gmad.com.br/gmad-jrmadeiras'],
  ['GMAD Lauro de Freitas', 'Lauro de Freitas', 'BA', 'https://www.gmad.com.br/institucional/nossas-lojas/'],
  ['GMAD Lojão do Marceneiro - Paulo Leal', 'Porto Velho', 'RO', 'https://www.gmad.com.br/gmad-lojaodomarceneiro'],
  ['GMAD Lojão do Marceneiro - Matriz', 'Porto Velho', 'RO', 'https://www.gmad.com.br/gmad-lojaodomarceneiromatriz'],
  ['GMAD Lojão do Marceneiro - Ji-Paraná', 'Ji-Paraná', 'RO', 'https://www.gmad.com.br/gmad-lojaodomarceneirojiparana'],
  ['GMAD Lojão do Marceneiro - Porto Velho', 'Porto Velho', 'RO', 'https://www.gmad.com.br/institucional/nossas-lojas/'],
  ['GMAD Lojão do Marceneiro - Rio Branco', 'Rio Branco', 'AC', 'https://www.gmad.com.br/gmad-lojaodomarceneiroriobranco'],
  ['GMAD Madcentro Itu', 'Itu', 'SP', 'https://www.gmad.com.br/gmad-madcentroitu'],
  ['GMAD Madcentro Sorocaba', 'Sorocaba', 'SP', 'https://www.gmad.com.br/gmad-madcentrosorocaba'],
  ['GMAD Madcentro Jundiaí', 'Jundiaí', 'SP', 'https://www.gmad.com.br/gmad-madcentrojundiai'],
  ['GMAD Madcompen', 'Ponta Grossa', 'PR', 'https://www.gmad.com.br/gmad-madcompen'],
  ['GMAD Madecari', 'São Paulo', 'SP', 'https://www.gmad.com.br/gmad-madecari'],
  ['GMAD Madecenter Caruaru', 'Caruaru', 'PE', 'https://www.gmad.com.br/gmad-madecentercaruaru'],
  ['GMAD Madecenter Centro 2', 'Recife', 'PE', 'https://www.gmad.com.br/gmad-madecentercentro2'],
  ['GMAD Madecenter Imbiribeira', 'Recife', 'PE', 'https://www.gmad.com.br/gmad-madecenterimbiribeira'],
  ['GMAD Madecenter Matriz', 'Recife', 'PE', 'https://www.gmad.com.br/gmad-madecentermatriz'],
  ['GMAD Madeireira Palowa BR040', 'Belo Horizonte', 'MG', 'https://www.gmad.com.br/gmad-palowa'],
  ['GMAD Madeireira Palowa Ipatinga', 'Ipatinga', 'MG', 'https://www.gmad.com.br/gmad-madeireirapalowaipatinga'],
  ['GMAD Madeireira Palowa Tamoios', 'Belo Horizonte', 'MG', 'https://www.gmad.com.br/gmad-madeireirapalowatamoios'],
  ['GMAD Madeireira Palowa Tupis', 'Belo Horizonte', 'MG', 'https://www.gmad.com.br/gmad-madeireirapalowatupis'],
  ['GMAD Madville', 'Joinville', 'SC', 'https://www.gmad.com.br/gmad-madville'],
  ['GMAD MF Madeiras', 'São Paulo', 'SP', 'https://www.gmad.com.br/gmad-mfmadeiras'],
  ['GMAD Montes Claros', 'Montes Claros', 'MG', 'https://www.gmad.com.br/gmad-montes-claros'],
  ['GMAD Nova Riga', 'São Paulo', 'SP', 'https://www.gmad.com.br/gmad-novariga'],
  ['GMAD Piracicaba', 'Piracicaba', 'SP', 'https://www.gmad.com.br/institucional/nossas-lojas/'],
  ['GMAD Placa Foz', 'Foz do Iguaçu', 'PR', 'https://www.gmad.com.br/gmad-placafoz'],
  ['GMAD Placa Sul', 'Porto Alegre', 'RS', 'https://www.gmad.com.br/gmad-placasul'],
  ['GMAD Placas Uberaba', 'Uberaba', 'MG', 'https://www.gmad.com.br/gmad-placasuberaba'],
  ['GMAD Placavel', 'Cascavel', 'PR', 'https://www.gmad.com.br/gmad-placavel'],
  ['GMAD Ponto do Marceneiro', 'Florianópolis', 'SC', 'https://www.gmad.com.br/gmad-pontodomarceneiro'],
  ['GMAD Pouso Alegre', 'Pouso Alegre', 'MG', 'https://www.gmad.com.br/gmad-pouso-alegre'],
  ['GMAD Ribeirão', 'Ribeirão Preto', 'SP', 'https://www.gmad.com.br/gmad-ribeirao'],
  ['GMAD Riga Itaqua', 'Itaquaquecetuba', 'SP', 'https://www.gmad.com.br/gmad-rigaitaqua'],
  ['GMAD Rio Preto', 'São José do Rio Preto', 'SP', 'https://www.gmad.com.br/gmad-riopreto'],
  ['GMAD RV Madeiras', 'São Paulo', 'SP', 'https://www.gmad.com.br/gmad-rvmadeiras'],
  ['GMAD Salvador', 'Salvador', 'BA', 'https://www.gmad.com.br/gmad-salvador'],
  ['GMAD Santo Antônio de Jesus', 'Sto. Antônio de Jesus', 'BA', 'https://www.gmad.com.br/gmad-santoantoniodejesus'],
  ['GMAD Taboão Madeiras', 'Taboão da Serra', 'SP', 'https://www.gmad.com.br/gmad-taboaomadeiras'],
  ['GMAD Vitória da Conquista', 'Vitória da Conquista', 'BA', 'https://www.gmad.com.br/gmad-vitoriadaconquista'],
  ['GMAD Volta Redonda', 'Volta Redonda', 'RJ', 'https://www.gmad.com.br/gmad-voltaredonda'],
];

var _STORE_ARROW = '<svg class="store-item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

function _removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function renderStores(stores) {
  var list = document.getElementById('stores-list');
  var empty = document.getElementById('stores-empty');
  if (!list) return;

  list.querySelectorAll('.store-item').forEach(function (el) { el.remove(); });
  document.getElementById('stores-count').textContent = stores.length;

  if (stores.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  stores.forEach(function (s) {
    var a = document.createElement('a');
    a.className = 'store-item';
    a.href = s[3];
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML =
      '<div class="store-item-info">' +
        '<span class="store-item-name">' + s[0] + '</span>' +
        '<span class="store-item-city">' + s[1] + '</span>' +
      '</div>' +
      '<span class="store-item-state">' + s[2] + '</span>' +
      _STORE_ARROW;
    list.insertBefore(a, empty);
  });
}

function filterStores() {
  var estado = document.getElementById('filter-estado').value;
  var busca = _removeAccents(document.getElementById('filter-cidade').value.trim());
  var filtered = STORES_DATA.filter(function (s) {
    var matchEstado = !estado || s[2] === estado;
    var matchBusca = !busca || _removeAccents(s[0]).includes(busca) || _removeAccents(s[1]).includes(busca);
    return matchEstado && matchBusca;
  });
  renderStores(filtered);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);

// Initial render of all stores
renderStores(STORES_DATA);

