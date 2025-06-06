<script>
  document.addEventListener('DOMContentLoaded', function() {
    const images = [
      'assets/images/Carrossel/aid.jpg',
      'assets/images/Carrossel/drone.jpg',
      'assets/images/Carrossel/agua.jpg'
    ];

    const bars = document.querySelectorAll('.bar');
    const heroImage = document.getElementById('heroImage');

    bars.forEach(bar => {
      bar.addEventListener('click', () => {
        const index = bar.getAttribute('data-index');

        // troca imagem
        heroImage.classList.add('animate');
        heroImage.src = images[index];

        // remove active de todas
        bars.forEach(b => b.classList.remove('active'));
        bar.classList.add('active');

        // remove animação depois de um tempo
        setTimeout(() => {
          heroImage.classList.remove('animate');
        }, 500);
      });
    });
  });
</script>


