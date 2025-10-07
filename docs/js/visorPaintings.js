document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("obras-content");
  if (!contenedor) return;

  contenedor.addEventListener("click", async (e) => {
    const item = e.target.closest('.cover-item[data-category="paintings"]');
    if (!item) return;

    const year = item.dataset.year;

    try {
      /* const response = await fetch("../data/artworks_with_dimensions.json");
      const data = await response.json();
      const obras = data.paintings[year]; */

      let jsonPath = "../data/artworks_with_dimensions.json";
      if (window.location.pathname.includes("-es")) {
        jsonPath = "../data/artworks_with_dimensions-es.json";
      }

      const response = await fetch(jsonPath);
      const data = await response.json();
      const obras = data.paintings[year];

      if (!obras || obras.length === 0) {
        console.warn("No hay pinturas para el año:", year);
        return;
      }

      mostrarVisorPaintings(obras);
    } catch (err) {
      console.error("Error cargando pinturas:", err);
    }
  });
});

function mostrarVisorPaintings(obras) {
  let indice = 0;

  const overlay = document.createElement('div');
  overlay.id = 'visor-paintings-overlay';
  overlay.innerHTML = `
  <div class="visor-paintings-contenido">
    <span class="visor-paintings-flecha izquierda"></span>
    <div class="visor-paintings-imagen-texto">
      <div class="visor-paintings-imagen-wrapper">
        <img class="visor-paintings-imagen" src="" alt="">
      </div>
      <div class="visor-paintings-descripcion"></div>
    </div>
    <span class="visor-paintings-flecha derecha"></span>
  </div>
`;

  document.body.appendChild(overlay);

  const img = overlay.querySelector('.visor-paintings-imagen');
  const desc = overlay.querySelector('.visor-paintings-descripcion');
  const flechaIzq = overlay.querySelector('.visor-paintings-flecha.izquierda');
  const flechaDer = overlay.querySelector('.visor-paintings-flecha.derecha');

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
