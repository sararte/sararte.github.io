console.log("✅ visorInstallations.js cargado");

function activarVisorInstallations() {
  document.querySelectorAll(".installation-cover").forEach(item => {
    const year = item.dataset.year;

    item.addEventListener("click", () => {
      console.log("🟢 Click sobre instalación detectado:", year);
      mostrarInstalacion(year);
    });
  });
}

function mostrarInstalacion(year) {
  /* fetch("../data/artworks_with_dimensions.json")
    .then(res => res.json())
    .then(data => {
      const obras = data.installations[year]; */

      let jsonPath = "../data/artworks_with_dimensions.json";
      if (window.location.pathname.includes("-es")) {
        jsonPath = "../data/artworks_with_dimensions-es.json";
      }

      fetch(jsonPath)
        .then(res => res.json())
        .then(data => {
          const obras = data.installations[year];

      console.log("🔍 Instalaciones encontradas:", obras);

      if (!obras || obras.length === 0) return;

      // Crear visor
      const visor = document.createElement("div");
      visor.id = "instalation-lightbox";

      const contenido = document.createElement("div");
      contenido.className = "visor-contenido";

      // Agregar imágenes
      obras.forEach(obra => {
        const img = document.createElement("img");
        img.src = obra.image;
        contenido.appendChild(img);
      });

      // Si alguna obra tiene video, lo agregamos al final
      const obraConVideo = obras.find(o => o.video);
      if (obraConVideo) {
        const video = document.createElement("video");
        video.src = obraConVideo.video;
        video.controls = true;
        video.preload = "metadata";
        contenido.appendChild(video);
      }

      // Descripción general (usamos la primera obra como referencia)
      const ref = obras[0];
      const descripcion = document.createElement("div");
      descripcion.className = "descripcion-general";

      const partes = [];
      if (ref.series) partes.push(ref.series);
      if (ref.title) partes.push(ref.title);
      if (ref.subtitle) partes.push(ref.subtitle);
      if (ref.year) partes.push(ref.year);
      if (ref.materials) partes.push(ref.materials);
      if (ref.dimensions) partes.push(ref.dimensions);

      descripcion.textContent = partes.join(" — ");

      contenido.appendChild(descripcion);
      visor.appendChild(contenido);
      document.body.appendChild(visor);

      // Cerrar al hacer clic fuera del contenido
      visor.addEventListener("click", e => {
        if (e.target === visor) visor.remove();
      });
    })
    .catch(err => {
      console.error("❌ Error al cargar instalación:", err);
    });
}
