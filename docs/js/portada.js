const jsonPath = 'data/artworks_with_dimensions.json';
const background = document.getElementById('background');

// Verifica si una obra es horizontal usando los campos numéricos
function esHorizontal(obra) {
  return obra.width && obra.height && obra.width > obra.height;
}

const contenedor = document.getElementById('contenedor');
const imagenTag = document.getElementById('imagen');

async function obtenerImagenesHorizontales() {
  const res = await fetch('data/artworks_with_dimensions.json');
  const data = await res.json();
  const imagenes = [];

  for (const categoria in data) {
    for (const anio in data[categoria]) {
      for (const obra of data[categoria][anio]) {
        if (obra.orientation === "horizontal") {
          imagenes.push(obra.image.replace('..', '.'));
        }
      }
    }
  }

  return imagenes;
}

async function iniciarPresentacion() {
  /* const imagenes = await obtenerImagenesHorizontales();
  if (imagenes.length === 0) return; */

  let imagenes = await obtenerImagenesHorizontales();
  if (imagenes.length === 0) return;

  // Mezclar el array aleatoriamente (Fisher-Yates shuffle)
  for (let i = imagenes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
  }


  let indice = 0;

  function cambiarImagen() {
    imagenTag.style.opacity = 0;

    setTimeout(() => {
      indice = (indice + 1) % imagenes.length;
      imagenTag.src = imagenes[indice];
      imagenTag.style.opacity = 1;
    }, 1000); // espera antes de mostrar la nueva
  }

  imagenTag.src = imagenes[0];
  imagenTag.style.opacity = 1;

  setInterval(cambiarImagen, 6000);
}

iniciarPresentacion();



