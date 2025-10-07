console.log("✅ proposals.js cargado");

// Detectar idioma según el nombre del archivo
let jsonPath;
let textos;

if (window.location.pathname.includes("-es")) {
  jsonPath = "../data/artworks_with_dimensions-es.json";
  textos = {
    drawings: "Dibujos",
    paintings: "Pinturas",
    installations: "Instalaciones"
  };
} else {
  jsonPath = "../data/artworks_with_dimensions.json";
  textos = {
    drawings: "Drawings",
    paintings: "Paintings",
    installations: "Installations"
  };
}

console.log("🧭 JSON seleccionado:", jsonPath);


const AÑOS_DIBUJOS = ["2011", "2012", "2013", "2024"];
const contenedor = document.getElementById("obras-content");

// Crear el título
const titulo = document.createElement("h2");
titulo.className = "category-title";

titulo.textContent = textos.drawings;
contenedor.appendChild(titulo);

// Crear la fila para los covers
const fila = document.createElement("div");
fila.className = "cover-row";

// Cargar el JSON correspondiente
fetch(jsonPath)


// fetch("../data/artworks_with_dimensions.json")
  .then(res => res.json())
  .then(data => {
    const dibujos = data.drawings;

    AÑOS_DIBUJOS.forEach(anio => {
      const obrasDelAnio = dibujos[anio] || [];

      if (obrasDelAnio.length > 0) {
        const obra = obrasDelAnio[Math.floor(Math.random() * obrasDelAnio.length)];

        const item = document.createElement("div");
        item.className = "cover-item";
        item.dataset.category = "drawings";
        item.dataset.year = anio;


        const img = document.createElement("img");
        img.src = obra.image;
        img.alt = obra.title || "Obra sin título";

        const year = document.createElement("div");
        year.className = "cover-year";
        year.textContent = anio;

        item.appendChild(img);
        item.appendChild(year);
        fila.appendChild(item);
      }
    });

    contenedor.appendChild(fila);

      // ======== PAINTINGS ========

    const container = document.getElementById("obras-content");

const paintings = data.paintings;
const paintingsTitle = document.createElement("h2");
paintingsTitle.className = "category-title";
paintingsTitle.textContent = textos.paintings;
container.appendChild(paintingsTitle);

const paintingsRow = document.createElement("div");
paintingsRow.className = "cover-row";

Object.keys(paintings).slice(0, 4).forEach((year) => {
  const obrasDelAnio = paintings[year];
  if (!obrasDelAnio || obrasDelAnio.length === 0) return;

  const indiceAleatorio = Math.floor(Math.random() * obrasDelAnio.length);
  const obra = obrasDelAnio[indiceAleatorio];

  const item = document.createElement("div");
  item.className = "cover-item";
  item.dataset.category = "paintings";
  item.dataset.year = year;


  const imagen = document.createElement("img");
  imagen.src = obra.image;
  imagen.alt = obra.title || "Obra sin título";

  const anio = document.createElement("div");
  anio.className = "cover-year";
  anio.textContent = year;

  item.appendChild(imagen);
  item.appendChild(anio);
  paintingsRow.appendChild(item);
});

container.appendChild(paintingsRow);

// ======== INSTALLATIONS ========

const installations = data.installations;

const installationsTitle = document.createElement("h2");
installationsTitle.className = "category-title";
installationsTitle.textContent = textos.installations;
container.appendChild(installationsTitle);

const installationsRow = document.createElement("div");
installationsRow.className = "cover-row";

Object.keys(installations).slice(0, 3).forEach((year) => {
  const obrasDelAnio = installations[year];
  if (!obrasDelAnio || obrasDelAnio.length === 0) return;

  // Buscar la obra que tiene la imagen marcada como cover
  const cover = obrasDelAnio.find((obra) =>
    obra.image.includes("-cover")
  );

  if (!cover) return;

  const item = document.createElement("div");
item.className = "cover-item installation-cover";
item.dataset.year = year;


  const imagen = document.createElement("img");
  imagen.src = cover.image;
  imagen.src = cover.image;
console.log("🖼️ Instalación:", year, "→", cover.image);

  imagen.alt = cover.title || "Obra sin título";

  const anio = document.createElement("div");
  anio.className = "cover-year";
  anio.textContent = year;

  item.appendChild(imagen);
  item.appendChild(anio);
  installationsRow.appendChild(item);
  
});

container.appendChild(installationsRow);
if (typeof activarVisorInstallations === "function") {
  activarVisorInstallations();
}



  })
  .catch(err => console.error("❌ Error al cargar el JSON:", err));


