const URL_DRIVE = "https://script.google.com/macros/s/AKfycbyHZY6rKZPofs6osVUqr2fJsPi3lEMVwyW3m--dB5mpviTMemxeSgii1sAoREMdyyN49A/exec";

export const obtenerFotosDeDrive = async () => {
  try {
    const respuesta = await fetch(URL_DRIVE);
    if (!respuesta.ok) throw new Error("Error en la respuesta");
    return await respuesta.json();
  } catch (error) {
    console.error("Error cargando fotos de Drive:", error);
    return null;
  }
};