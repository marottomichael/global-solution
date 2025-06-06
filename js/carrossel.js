document.addEventListener('DOMContentLoaded', function() {
  const images = [
    'assets/images/Carrossel/aid.jpg',
    'assets/images/Carrossel/drone.jpg',
    'assets/images/Carrossel/agua.jpg'
  ];

  const bars = document.querySelectorAll('.bar');
  const heroImage = document.getElementById('heroImage');

  // Ativar a primeira barra por padrão
  if (bars.length > 0) {
    bars[2].classList.add('active'); // Terceira imagem (agua.jpg) como padrão
  }

  bars.forEach(bar => {
    bar.addEventListener('click', () => {
      const index = parseInt(bar.getAttribute('data-index'));

      // Verifica se o índice é válido
      if (index >= 0 && index < images.length) {
        // Adiciona animação de saída
        heroImage.classList.add('animate');
        
        // Após um breve delay, troca a imagem
        setTimeout(() => {
          heroImage.src = images[index];
          
          // Remove classe active de todas as barras
          bars.forEach(b => b.classList.remove('active'));
          
          // Adiciona classe active na barra clicada
          bar.classList.add('active');
          
          // Remove a animação após a transição
          setTimeout(() => {
            heroImage.classList.remove('animate');
          }, 100);
        }, 250);
      }
    });

    // Adiciona efeito hover nas barras
    bar.addEventListener('mouseenter', () => {
      if (!bar.classList.contains('active')) {
        bar.style.transform = 'scale(1.1)';
      }
    });

    bar.addEventListener('mouseleave', () => {
      if (!bar.classList.contains('active')) {
        bar.style.transform = '';
      }
    });
  });

  // Auto-play opcional (descomente se quiser rotação automática)
  /*
  setInterval(() => {
    const activeBar = document.querySelector('.bar.active');
    const activeIndex = parseInt(activeBar.getAttribute('data-index'));
    const nextIndex = (activeIndex + 1) % images.length;
    const nextBar = document.querySelector(`[data-index="${nextIndex}"]`);
    
    if (nextBar) {
      nextBar.click();
    }
  }, 5000); // Troca a cada 5 segundos
  */
});


