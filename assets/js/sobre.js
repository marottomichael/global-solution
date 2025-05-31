// Inicialização do GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animação dos títulos das seções
gsap.utils.toArray('.titulo-secao').forEach(title => {
    gsap.from(title, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
        }
    });
});

// Animação dos cards de valores
gsap.utils.toArray('.card-valor').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
        }
    });
});

// Animação dos depoimentos
gsap.utils.toArray('.depoimento-item').forEach((depoimento, index) => {
    gsap.from(depoimento, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.3,
        scrollTrigger: {
            trigger: depoimento,
            start: "top 80%",
        }
    });
});

// Animação dos cards de estatísticas
gsap.utils.toArray('.card').forEach((card, index) => {
    gsap.from(card, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.15,
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        }
    });
});

// Animação dos ícones de valores
gsap.utils.toArray('.rounded-circle').forEach((icon, index) => {
    gsap.from(icon, {
        rotation: -180,
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: icon,
            start: "top 85%",
        }
    });
});

// Animação dos textos de valores
gsap.utils.toArray('.d-flex.align-items-start').forEach((item, index) => {
    gsap.from(item, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
        }
    });
});

// Animação do texto da seção Nossa História
gsap.from('.nossa-historia .titulo-secao', {
    opacity: 0,
    y: -50,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.nossa-historia',
        start: "top 70%",
    }
});

gsap.from('.nossa-historia .lead', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.4,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.nossa-historia',
        start: "top 70%",
    }
});

// Efeito de fade no vídeo
gsap.from('.video-historia', {
    opacity: 0,
    scale: 1.1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: '.nossa-historia',
        start: "top 70%",
    }
});

// Animação das camadas de parallax
gsap.from('.parallax-bg', {
    opacity: 0,
    scale: 1.5,
    duration: 1.5,
    scrollTrigger: {
        trigger: '.nossa-historia',
        start: "top 70%",
    }
});

gsap.from('.parallax-foreground', {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    delay: 0.3,
    scrollTrigger: {
        trigger: '.nossa-historia',
        start: "top 70%",
    }
});

// Efeito Parallax para a seção Nossa História
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    const parallaxFg = document.querySelector('.parallax-foreground');
    
    if (parallaxBg && parallaxFg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.3}px) scale(2)`;
        parallaxFg.style.transform = `translateY(${scrolled * 0.1}px) scale(1)`;
    }
});

// Animação do footer
gsap.from('footer', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: 'footer',
        start: "top 90%",
    }
});

// Animação da seção de valores
gsap.from('#missao-visao-valores .titulo-secao', {
    opacity: 0,
    y: -50,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '#missao-visao-valores',
        start: "top 70%",
    }
});

// Animação do vídeo de fundo
gsap.from('.video-valores', {
    opacity: 0,
    scale: 1.1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: '#missao-visao-valores',
        start: "top 70%",
    }
});

// Animação sequencial dos cards
gsap.utils.toArray('.card-valor').forEach((card, index) => {
    // Reset inicial
    gsap.set(card, {
        opacity: 0,
        y: 50
    });

    // Animação do card
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Animação dos ícones
    const icon = card.querySelector('.rounded-circle');
    gsap.set(icon, {
        scale: 0,
        rotation: -180
    });

    gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 1,
        delay: index * 0.3 + 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Animação do texto
    const title = card.querySelector('h3');
    const text = card.querySelector('p');

    gsap.set([title, text], {
        opacity: 0,
        y: 30
    });

    gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.3 + 0.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.3 + 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Efeito de parallax no vídeo
ScrollTrigger.create({
    trigger: '#missao-visao-valores',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
        const video = document.querySelector('.video-valores');
        if (video) {
            video.style.transform = `scale(${1 + self.progress * 0.1})`;
        }
    }
});

// Animação dos cards de impacto
const cardsImpacto = document.querySelectorAll('.card-impacto');
cardsImpacto.forEach((card, index) => {
    gsap.set(card, {
        opacity: 0,
        y: 50
    });

    ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        onEnter: () => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power2.out"
            });
        }
    });
});

// Animação dos números de impacto
const impactNumbers = [
    { element: '.impacto-ongs', start: 0, end: 50, duration: 2 },
    { element: '.impacto-campanhas', start: 0, end: 100, duration: 2 },
    { element: '.impacto-arrecadado', start: 0, end: 1000000, duration: 2 },
    { element: '.impacto-doadores', start: 0, end: 1000, duration: 2 }
];

impactNumbers.forEach(({ element, start, end, duration }) => {
    const el = document.querySelector(element);
    if (!el) return;

    ScrollTrigger.create({
        trigger: el,
        start: "top bottom-=100",
        onEnter: () => {
            animateValue(el, start, end, duration);
        }
    });
});

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (end >= 1000000) {
            element.textContent = `R$${(value / 1000000).toFixed(1)}M+`;
        } else if (end >= 1000) {
            element.textContent = `${(value / 1000).toFixed(1)}K+`;
        } else {
            element.textContent = `${value}+`;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
} 