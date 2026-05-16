// Obtiene la ubicación del usuario
export function getUserLocation(){
   if (!navigator.geolocation) {
            this.ciudad = "Geolocalización no soportada";
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                this.latitud = position.coords.latitude;
                this.longitud = position.coords.longitude;})
            };