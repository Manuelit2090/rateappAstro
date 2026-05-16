export function translateCity(latitud, longitud) {
    // Llamamos a la API pública de OpenStreetMap (Nominatim)
    const url = `https://openstreetmap.org${latitud}&lon=${longitud}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.address) {
                // Buscamos la ciudad en las diferentes etiquetas que usa la API
                const ciudad = data.address.city || 
                               data.address.town || 
                               data.address.village || 
                               data.address.municipality;

                if (ciudad) {
                    console.log("Ciudad encontrada:", ciudad);
                    return ciudad;
                    // Aquí actualizas tu HTML, por ejemplo:
                    // document.getElementById("tu-caja-texto").innerText = ciudad;
                } else {
                    console.log("No se detectó ciudad, ubicación general:", data.display_name);
                }
            } else {
                console.log("No se encontraron resultados para estas coordenadas.");
            }
        })
        .catch(error => console.error("Error al conectar con el servidor:", error));
}
