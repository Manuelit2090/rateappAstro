<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  restaurantId: { type: Number, required: true },
  initialImage: { type: String, default: '' },
});

const selectedFile = ref(null);
const isUploading = ref(false);
const imageUrl = ref('');
const currentImage = ref(props.initialImage);

watch(() => props.initialImage, (newVal) => {
  currentImage.value = newVal;
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const uploadImage = async () => {
  const file = selectedFile.value;
  if (!file || !props.restaurantId) return;

  isUploading.value = true;

  // Garantizar un MIME type válido para la validación del backend
  const mimeType = file.type || 'image/png';

  try {
    // 1. Obtener la URL firmada desde nuestro backend
    const presignedRes = await fetch('/api/get-presigned-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        contentType: mimeType,
      }),
    });

    const presignedData = await presignedRes.json();

    if (!presignedRes.ok) {
      throw new Error(presignedData.error || 'No se pudo obtener la URL firmada');
    }

    const { uploadUrl, fileUrl } = presignedData;

    // 2. Subir directamente a Cloudflare R2 usando el método PUT
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType, // DEBE coincidir exacto con el enviado a /api/get-presigned-url
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Error subiendo la imagen a R2 (${uploadResponse.status})`);
    }

    // 3. Guardar el enlace en la base de datos
    const saveResp = await fetch('/api/restaurant', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: props.restaurantId, image: fileUrl }),
    });

    if (!saveResp.ok) {
      throw new Error('Error guardando la imagen en la base de datos');
    }

    imageUrl.value = fileUrl;
    currentImage.value = fileUrl;
    selectedFile.value = null; // Limpiar selección
    alert('¡Imagen subida y actualizada con éxito!');
  } catch (err) {
    console.error('Error en el proceso de carga:', err);
    alert('Ocurrió un error: ' + (err.message || err));
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 items-start">
    <p class="text-2xl font-bold">Sube la imagen de tu restaurante</p>

    <div v-if="currentImage">
      <img :src="currentImage" alt="Imagen actual" class="preview max-w-xs rounded-lg shadow-md mb-2" />
    </div>

    <input 
      class="file-input file-input-warning" 
      type="file" 
      @change="handleFileChange" 
      accept="image/png, image/jpeg, image/webp" 
    />

    <button 
      @click="uploadImage" 
      :disabled="!selectedFile || isUploading || !props.restaurantId" 
      class="btn btn-primary mt-2"
    >
      {{ isUploading ? 'Subiendo...' : (currentImage ? 'Actualizar Imagen' : 'Subir Imagen') }}
    </button>

    <div v-if="imageUrl" class="result mt-4 flex flex-col gap-2">
      <p class="text-green-500 font-semibold">¡Subido con éxito!</p>
      <input 
        type="text" 
        :value="imageUrl" 
        readonly 
        class="input input-bordered w-full max-w-xs text-xs" 
      />
    </div>
  </div>
</template>