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



// app.js

// Ejemplo de funciones que harían fetch a un backend real
// Ajusta la URL ("/api/update_angle") a tu ruta real

async function aumentar(articulacion) {
  try {
    const resp = await fetch('/api/update_angle', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        articulacion: articulacion,
        accion: 'aumentar'
      })
    });
    const data = await resp.json();
    console.log("Ángulo actualizado:", data);
    // luego podrías refrescar la imagen
    await refrescarImagen();
  } catch (err) {
    console.error("Error al aumentar ángulo:", err);
  }
}

async function disminuir(articulacion) {
  try {
    const resp = await fetch('/api/update_angle', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        articulacion: articulacion,
        accion: 'disminuir'
      })
    });
    const data = await resp.json();
    console.log("Ángulo actualizado:", data);
    await refrescarImagen();
  } catch (err) {
    console.error("Error al disminuir ángulo:", err);
  }
}

// Función para pedir la imagen actual al servidor
async function refrescarImagen() {
  try {
    const resp = await fetch('/api/get_robot_image'); // tu endpoint
    const blob = await resp.blob();
    // Crea un ObjectURL
    const imgURL = URL.createObjectURL(blob);
    // Actualiza el <img> en la página
    document.querySelector('#robot-image-container img').src = imgURL;
  } catch (err) {
    console.error("Error al refrescar imagen:", err);
    // Si falla la carga, muestra la imagen de error
    document.querySelector('#robot-image-container img').src = "img/error.png";
  }
}

// Si quieres refrescar la imagen cada X segundos:
document.addEventListener('DOMContentLoaded', () => {
  // Llamamos a refrescarImagen() cada 5s, por ejemplo
  setInterval(refrescarImagen, 5000);
});
