// src/storeUbicacion.js
import { reactive } from 'vue';



// Este objeto es global y reactivo. Cualquier componente que lo use verá los cambios en tiempo real.
export const storeUbicacion = reactive({
    ciudad: 'Obteniendo ubicación...',
    latitud: null,
    longitud: null,

    async detectarUbicacion() {
        if (!navigator.geolocation) {
            this.ciudad = "Geolocalización no soportada";
            return;
        }

        const posicion = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        }).catch(async (error) => {
            console.error('Geolocation error:', error);

            switch (error.code) {
                case 1:
                    this.ciudad = "Permiso de ubicación denegado";
                    break;
                case 2:
                    this.ciudad = "Ubicación no disponible desde el servicio de red";
                    break;
                case 3:
                    this.ciudad = "Tiempo de espera agotado";
                    break;
                default:
                    this.ciudad = "Error al obtener ubicación";
            }

            // Fallback por IP si la geolocalización nativa falla.
            await this._obtenerUbicacionPorIp();
            return null;
        });

        if (!posicion) {
            return;
        }

        this.latitud = posicion.coords.latitude;
        this.longitud = posicion.coords.longitude;

        // Llamamos a OpenStreetMap Nominatim para obtener la ciudad
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitud}&lon=${this.longitud}`;
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();

            if (data.address) {
                this.ciudad = data.address.city ||
                              data.address.town ||
                              data.address.village ||
                              data.address.municipality ||
                              "Ciudad no detectada";
            }
        } catch (error) {
            this.ciudad = "Error al obtener ciudad";
            console.error(error);
        }
    },

    async _obtenerUbicacionPorIp() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) {
                throw new Error('IP geolocation no disponible');
            }
            const data = await response.json();

            if (data) {
                this.ciudad = data.city || data.region || data.country_name || this.ciudad;
                if (!this.latitud && data.latitude && data.longitude) {
                    this.latitud = parseFloat(data.latitude);
                    this.longitud = parseFloat(data.longitude);
                }
            }
        } catch (error) {
            console.error('IP fallback failed:', error);
        }
    }
});
