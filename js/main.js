const WHATSAPP = '5551983225661';

const demoData = {
  landing: {
    src: 'demos/landing.html',
    appSrc: 'demos/app-landing.html',
    url: 'seunegocio.com.br',
    appLabel: '📱 App Landing Page',
    title: 'Landing Page Institucional',
    desc: 'Perfeito para apresentar seu negócio, receber mensagens e converter visitantes em clientes pelo WhatsApp.',
    service: 'Landing Page / Site Institucional',
    tier: 'Apenas o Site',
    range: 'R$ 1.200 a R$ 1.800',
  },
  portfolio: {
    src: 'demos/portfolio.html',
    appSrc: 'demos/app-portfolio.html',
    url: 'studioaurora.com.br',
    appLabel: '📱 App Portfólio Premium',
    title: 'Portfólio Premium',
    desc: 'Para quem quer se destacar com visual único, galeria de trabalhos e animações que impressionam.',
    service: 'Portfólio / Site Premium',
    tier: 'Apenas o Site',
    range: 'R$ 2.500 a R$ 3.500',
  },
  dynamic: {
    src: 'demos/dynamic.html',
    appSrc: 'demos/app-dynamic.html',
    url: 'technews.com.br',
    appLabel: '📱 App Blog / Portal',
    title: 'Site Dinâmico / Blog',
    desc: 'Blog, portal de notícias ou catálogo — com busca, categorias e painel para você publicar sozinho.',
    service: 'Site Dinâmico',
    tier: 'Site + Painel CMS',
    range: 'R$ 4.500 a R$ 7.000',
  },
  ecommerce: {
    src: 'demos/ecommerce.html',
    appSrc: 'demos/app-ecommerce.html',
    url: 'vivastore.com.br',
    appLabel: '📱 App Loja Virtual',
    title: 'E-commerce / Loja Virtual',
    desc: 'Loja completa com produtos, carrinho, checkout, Pix/cartão e app Android para seus clientes.',
    service: 'E-commerce / Loja Virtual',
    tier: 'Site + Painel CMS',
    range: 'R$ 8.000 a R$ 12.000',
  },
};

const typingWords = [
  'atrai clientes',
  'passa confiança',
  'vende mais',
  'funciona no celular',
  'gera contatos',
];

function switchDemo(key) {
  const data = demoData[key];
  if (!data) return;

  const frames = {
    browser: [
      document.getElementById('demo-frame'),
      document.getElementById('hero-demo-frame'),
    ],
    app: [
      document.getElementById('app-frame'),
      document.getElementById('hero-app-frame'),
    ],
  };

  frames.browser.forEach((el) => {
    if (el) el.src = data.src;
  });
  frames.app.forEach((el) => {
    if (el) el.src = data.appSrc;
  });

  const demoUrl = document.getElementById('demo-url');
  const heroUrl = document.getElementById('hero-demo-url');
  if (demoUrl) demoUrl.textContent = data.url;
  if (heroUrl) heroUrl.textContent = data.url;

  const phoneLabel = document.getElementById('demo-phone-label');
  const heroPhoneLabel = document.getElementById('hero-phone-label');
  if (phoneLabel) phoneLabel.textContent = data.appLabel;
  if (heroPhoneLabel) heroPhoneLabel.textContent = data.appLabel;

  const demoInfo = document.getElementById('demo-info');
  if (demoInfo) {
    demoInfo.innerHTML = `
      <h4>${data.title}</h4>
      <p>${data.desc}</p>
      <div class="demo-info-actions">
        <a href="${data.src}" target="_blank" class="btn btn-outline btn-sm">Abrir site demo</a>
        <a href="${data.appSrc}" target="_blank" class="btn btn-outline btn-sm">Abrir app demo</a>
        <button class="btn btn-primary open-modal-btn" data-service="${data.service}" data-tier="${data.tier}" data-range="${data.range}">
          Quero este modelo
        </button>
      </div>
    `;
    demoInfo.querySelector('.open-modal-btn')?.addEventListener('click', (e) => {
      const b = e.currentTarget;
      openModal(b.dataset.service, b.dataset.tier, b.dataset.range);
    });
  }

  document.querySelectorAll('.demo-tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.demo === key);
  });
}

// Typing effect
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = typingWords[wordIndex];
    if (!deleting) {
      el.textContent = word.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    } else {
      el.textContent = word.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }
  tick();
})();

(function initShowcase() {
  const list = document.getElementById('showcase-list');
  if (!list) return;
  const items = list.querySelectorAll('li');
  let index = 0;
  setInterval(() => {
    items.forEach((li) => li.classList.remove('active'));
    index = (index + 1) % items.length;
    items[index].classList.add('active');
  }, 2800);
})();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => navMenu?.classList.toggle('open'));
navMenu?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => navMenu?.classList.remove('open'));
});

const overlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalService = document.getElementById('modal-service');
const formService = document.getElementById('form-service');
const formTier = document.getElementById('form-tier');
const formRange = document.getElementById('form-range');
const quoteForm = document.getElementById('quote-form');

const formBot = document.getElementById('form-bot');
const formBotMessage = document.getElementById('form-bot-message');

const BOT_DEFAULT = 'Oi! Preencha os campos e eu te ajudo a enviar tudo certinho para o Lucas.';
const BOT_SUCCESS = 'Perfeito! Abrindo o WhatsApp com sua mensagem... 🚀';

function showBotMessage(text, mood = 'neutral') {
  if (!formBot || !formBotMessage) return;
  formBot.classList.remove('bot-shake', 'bot-happy', 'bot-warn');
  if (mood === 'warn') formBot.classList.add('bot-shake', 'bot-warn');
  if (mood === 'happy') formBot.classList.add('bot-happy');
  formBotMessage.textContent = text;
}

function resetBot() {
  showBotMessage(BOT_DEFAULT);
  clearFieldErrors();
}

function clearFieldErrors() {
  document.querySelectorAll('.field-error').forEach((el) => {
    el.hidden = true;
    el.textContent = '';
  });
  document.querySelectorAll('#quote-form .input-invalid').forEach((el) => {
    el.classList.remove('input-invalid');
  });
}

function setFieldError(id, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(`error-${id.replace('client-', '')}`);
  if (input) input.classList.add('input-invalid');
  if (error) {
    error.textContent = message;
    error.hidden = false;
  }
}

function validateQuoteForm() {
  clearFieldErrors();
  const name = document.getElementById('client-name')?.value.trim() || '';
  const phone = document.getElementById('client-phone')?.value.trim() || '';
  const email = document.getElementById('client-email')?.value.trim() || '';
  const message = document.getElementById('client-message')?.value.trim() || '';
  const missing = [];

  if (name.length < 2) {
    setFieldError('client-name', 'Digite seu nome (mínimo 2 letras).');
    missing.push('seu nome');
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    setFieldError('client-phone', 'Informe um WhatsApp válido com DDD.');
    missing.push('seu WhatsApp');
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError('client-email', 'Esse e-mail não parece válido.');
    missing.push('um e-mail válido');
  }

  if (message.length < 10) {
    setFieldError('client-message', 'Descreva o projeto com pelo menos 10 caracteres.');
    missing.push('a descrição do projeto');
  }

  if (missing.length === 0) {
    return { ok: true, name, phone, email, message };
  }

  let botText = 'Não dá para enviar ainda! ';
  if (missing.length === 1) {
    botText += `Falta preencher ${missing[0]}.`;
  } else if (missing.length === 2) {
    botText += `Faltam ${missing[0]} e ${missing[1]}.`;
  } else {
    botText += `Faltam: ${missing.slice(0, -1).join(', ')} e ${missing[missing.length - 1]}.`;
  }
  showBotMessage(botText, 'warn');
  return { ok: false };
}

function openModal(service, tier, range) {
  if (modalService) modalService.textContent = `${service} — ${tier} (${range})`;
  if (formService) formService.value = service;
  if (formTier) formTier.value = tier;
  if (formRange) formRange.value = range;
  resetBot();
  overlay?.classList.add('active');
  overlay?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay?.classList.remove('active');
  overlay?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  resetBot();
}

modalClose?.addEventListener('click', closeModal);
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.querySelectorAll('.price-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.service-card');
    const service = card?.dataset.service || 'Projeto web';
    openModal(service, btn.dataset.tier, btn.dataset.range);
  });
});

document.querySelectorAll('.open-modal-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    openModal(btn.dataset.service, btn.dataset.tier, btn.dataset.range);
  });
});

['client-name', 'client-phone', 'client-email', 'client-message'].forEach((id) => {
  document.getElementById(id)?.addEventListener('input', () => {
    const input = document.getElementById(id);
    input?.classList.remove('input-invalid');
    const error = document.getElementById(`error-${id.replace('client-', '')}`);
    if (error) error.hidden = true;
    if (formBot?.classList.contains('bot-warn')) {
      showBotMessage(BOT_DEFAULT);
    }
  });
});

quoteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validateQuoteForm();
  if (!result.ok) return;

  const { name, phone, email, message } = result;
  const service = formService?.value || '';
  const tier = formTier?.value || '';
  const range = formRange?.value || '';

  showBotMessage(BOT_SUCCESS, 'happy');

  const text = [
    `*Novo pedido de orçamento*`,
    ``,
    `*Serviço:* ${service}`,
    `*Pacote:* ${tier}`,
    `*Faixa:* ${range}`,
    ``,
    `*Nome:* ${name}`,
    `*Telefone:* ${phone}`,
    email ? `*E-mail:* ${email}` : '',
    ``,
    `*Descrição do projeto:*`,
    message,
  ]
    .filter(Boolean)
    .join('\n');

  setTimeout(() => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
    closeModal();
    quoteForm.reset();
  }, 700);
});

document.querySelectorAll('.demo-tab').forEach((tab) => {
  tab.addEventListener('click', () => switchDemo(tab.dataset.demo));
});

document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    const cat = card.dataset.category;
    if (cat && demoData[cat]) switchDemo(cat);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
