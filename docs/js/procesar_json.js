const fs = require('fs');
const path = require('path');

// Ruta de entrada y salida
const inputPath = path.join(__dirname, 'data', 'artworks.json');
const outputPath = path.join(__dirname, 'data', 'artworks_with_dimensions.json');

function extraerDimensiones(texto) {
  if (!texto) return null;
  const match = texto.match(/([\d.,]+)\s*x\s*([\d.,]+)/i);
  if (!match) return null;

  const height = parseFloat(match[1].replace(",", "."));
  const width = parseFloat(match[2].replace(",", "."));

  return { width, height }; // ← ahora están correctamente asignados
}


function procesarObras(obj) {
  for (const categoria in obj) {
    for (const anio in obj[categoria]) {
      obj[categoria][anio] = obj[categoria][anio].map(obra => {
        const dims = extraerDimensiones(obra.dimensions);
        if (dims) {
          obra.width = dims.width;
          obra.height = dims.height;
          if (dims.width && dims.height) {
            obra.orientation = dims.width > dims.height ? "horizontal" : "vertical";
          }
        }
        return obra;
      });
    }
  }
  return obj;
}


try {
  const jsonOriginal = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const jsonProcesado = procesarObras(jsonOriginal);

  fs.writeFileSync(outputPath, JSON.stringify(jsonProcesado, null, 2), 'utf-8');
  console.log('✅ JSON procesado y guardado como:', outputPath);
} catch (error) {
  console.error('❌ Error procesando el archivo:', error);
}
