/* Este script se encargará de:

    Detectar el clic en un cover.

    Cargar todas las imágenes del año correspondiente.

    Navegar entre ellas con flechas.

    Mostrar la descripción. */

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("obras-content");
   if (!contenedor) return;
   
  contenedor.addEventListener("click", async (e) => {
    const item = e.target.closest('.cover-item[data-category="drawings"]');
    if (!item) return;

    const year = item.dataset.year;

    try {
      /* const response = await fetch("../data/artworks_with_dimensions.json");
      const data = await response.json();
      const obras = data.drawings[year]; */

      let jsonPath = "../data/artworks_with_dimensions.json";
      if (window.location.pathname.includes("-es")) {
        jsonPath = "../data/artworks_with_dimensions-es.json";
      }

      const response = await fetch(jsonPath);
      const data = await response.json();
      const obras = data.drawings[year];


      if (!obras || obras.length === 0) {
        console.warn("No hay obras para el año:", year);
        return;
      }

      mostrarVisor(obras);
    } catch (err) {
      console.error("Error al cargar el visor:", err);
    }
  });
});

function mostrarVisor(obras) {
  let indice = 0;

  const overlay = document.createElement('div');
  overlay.id = 'visor-overlay';
  overlay.innerHTML = `
  <div class="visor-contenido">
    <span class="visor-flecha izquierda"></span>
    <img class="visor-imagen" src="" alt="">
    <span class="visor-flecha derecha"></span>
    <div class="visor-descripcion"></div>
  </div>
`;

  document.body.appendChild(overlay);

  const img = overlay.querySelector('.visor-imagen');
  const desc = overlay.querySelector('.visor-descripcion');
  const flechaIzq = overlay.querySelector('.visor-flecha.izquierda');
  const flechaDer = overlay.querySelector('.visor-flecha.derecha');

  function actualizarContenido() {
    const obra = obras[indice];
    img.src = obra.image;
    desc.innerHTML = `
    ${obra.serie ? `<strong>${obra.serie}</strong><br>` : ""}
    ${obra.title ? `<em>${obra.title}</em>` : "S/T"}${obra.subtitle ? ` — <em>${obra.subtitle}</em>` : ""}, ${obra.year}<br>
    ${obra.materials}<br>
    ${obra.dimensions}
  `;


    flechaIzq.style.visibility = indice > 0 ? 'visible' : 'hidden';
    flechaDer.style.visibility = indice < obras.length - 1 ? 'visible' : 'hidden';
  }

  flechaIzq.addEventListener('click', () => {
    if (indice > 0) {
      indice--;
      actualizarContenido();
    }
  });

  flechaDer.addEventListener('click', () => {
    if (indice < obras.length - 1) {
      indice++;
      actualizarContenido();
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  actualizarContenido();
}
