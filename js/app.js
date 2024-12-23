document.addEventListener('DOMContentLoaded', () => {
    const elementos = document.querySelectorAll('.oculto');
  
    const inViewportSince = new WeakMap();
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          inViewportSince.set(entry.target, Date.now());
  
          const checkTime = () => {
            if (inViewportSince.has(entry.target)) {
              const tiempoEnViewport = Date.now() - inViewportSince.get(entry.target);
              if (tiempoEnViewport >= 100) { 
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                inViewportSince.delete(entry.target);
              } else {
                setTimeout(checkTime, 100);
              }
            }
          };
          checkTime();
  
        } else {
          inViewportSince.delete(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.5 
    });
  
    elementos.forEach(el => observer.observe(el));
  });
  
  
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  });

  

  document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.top-nav');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navBar.classList.add('scrolled');
      } else {
        navBar.classList.remove('scrolled');
      }
    });
  });

  