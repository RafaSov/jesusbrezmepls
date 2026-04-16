/**
 * Jesus Brez Me Pls - Landing Page
 * @description Scroll animations, particles, parallax e interações
 */

/**
 * Hidrata o DOM com valores do window.APP_CONFIG (definido em config.js).
 * Roda ANTES de qualquer outra inicialização para que o formulário e os links
 * tenham os valores corretos antes de qualquer interação do usuário.
 *
 * Elementos marcadores no HTML:
 *   - [data-config="discord-invite"]  → recebe o href do convite do Discord
 *   - [data-config="form"]            → form que recebe a action (submitUrl)
 *   - [data-config="form-subject"]    → input oculto que recebe o assunto do e-mail
 */
function hydrateConfig(): void {
  const config = window.APP_CONFIG;
  if (!config) {
    console.warn('[config] window.APP_CONFIG não foi carregado. Verifique se config.js está antes de main.js.');
    return;
  }

  document.querySelectorAll<HTMLAnchorElement>('[data-config="discord-invite"]').forEach((el) => {
    el.href = config.discord.inviteUrl;
  });

  document.querySelectorAll<HTMLFormElement>('[data-config="form"]').forEach((form) => {
    form.action = config.form.submitUrl;
  });

  document.querySelectorAll<HTMLInputElement>('[data-config="form-subject"]').forEach((input) => {
    input.value = config.form.subject;
  });
}

/** Configuração do Intersection Observer para animações de scroll */
const SCROLL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.15,
} as const;

/** Cores das partículas do hero */
const PARTICLE_COLORS: readonly string[] = [
  'rgba(201, 162, 39, 0.3)',
  'rgba(201, 162, 39, 0.15)',
  'rgba(139, 105, 20, 0.2)',
] as const;

/** Seletor dos elementos animados ao scroll */
const ANIMATABLE_SELECTORS = '.section-inner, .contact-content, [data-scroll-animate]';

/** ID do elemento de partículas */
const HERO_PARTICLES_ID = 'hero-particles';

/** ID do input de redirect do formulário */
const FORM_NEXT_ID = 'form-next';

/** Limite de scroll para ativar o header */
const SCROLL_THRESHOLD = 50;

/** Intensidade do parallax (px) */
const PARALLAX_INTENSITY = 30;

/** Opacidade mínima do hero ao scroll */
const HERO_OPACITY_MIN = 0.7;

/**
 * Inicializa o observer para animações de scroll nas seções
 */
function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const section = entry.target as HTMLElement;
        section.querySelectorAll(ANIMATABLE_SELECTORS).forEach((el) => {
          el.classList.add('visible');
        });
        observer.unobserve(section);
      });
    },
    SCROLL_OBSERVER_OPTIONS
  );

  document.querySelectorAll<HTMLElement>('.section').forEach((section) => {
    observer.observe(section);
  });
}

/**
 * Configura o efeito de scroll no header (background ao rolar)
 */
function initHeaderScrollEffect(): void {
  const header = document.querySelector<HTMLElement>('.header');
  if (!header) return;

  let ticking = false;

  const updateHeader = (): void => {
    header.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      requestAnimationFrame(updateHeader);
      ticking = true;
    },
    { passive: true }
  );
}

/**
 * Configura o toggle do menu mobile
 */
function initMobileNav(): void {
  const nav = document.querySelector<HTMLElement>('.nav');
  const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') ?? false;
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navMenu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav?.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

/**
 * Cria as partículas animadas no hero
 */
function createHeroParticles(): void {
  const container = document.getElementById(HERO_PARTICLES_ID);
  if (!container) return;

  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.setAttribute('role', 'presentation');
    particle.className = 'particle';

    const size = 2 + Math.random() * 4;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 5;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
  }
}

/**
 * Configura a URL de redirect do formulário (compatível com GitHub Pages)
 */
function initFormRedirect(): void {
  const formNext = document.getElementById(FORM_NEXT_ID) as HTMLInputElement | null;
  if (!formNext) return;

  const basePath = window.location.pathname.replace(/\/index\.html$/i, '') || '/';
  formNext.value = `${window.location.origin}${basePath}#contato`;
}

/**
 * Configura o efeito parallax no conteúdo do hero
 */
function initHeroParallax(): void {
  const heroContent = document.querySelector<HTMLElement>('.hero-content');
  if (!heroContent) return;

  let ticking = false;

  const updateParallax = (): void => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;
      const translateY = progress * PARALLAX_INTENSITY;
      const opacity = 1 - progress * (1 - HERO_OPACITY_MIN);
      heroContent.style.transform = `translateY(${translateY}px)`;
      heroContent.style.opacity = String(opacity);
    }

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      requestAnimationFrame(updateParallax);
      ticking = true;
    },
    { passive: true }
  );
}

/**
 * Inicializa a aplicação quando o DOM estiver pronto
 */
function init(): void {
  hydrateConfig();
  initScrollAnimations();
  initHeaderScrollEffect();
  initMobileNav();
  createHeroParticles();
  initFormRedirect();
  initHeroParallax();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
