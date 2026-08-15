<template>
  <div class="uploader-container">
    <input type="file" @change="handleFileChange" accept="image/*" />
    <button @click="uploadImage" :disabled="!selectedFile || isUploading">
      {{ isUploading ? 'Subiendo...' : 'Subir Imagen' }}
    </button>

    <!-- Mostrar el link y la imagen una vez subida -->
    <div v-if="imageUrl" class="result">
      <p>¡Subido con éxito!</p>
      <input type="text" :value="imageUrl" readonly click-to-select />
      <img :src="imageUrl" alt="Imagen subida" class="preview" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedFile = ref(null);
const isUploading = ref(false);
const imageUrl = ref('');

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadImage = async () => {
  if (!selectedFile.value) return;

  isUploading.value = true;
  try {
    // 1. Solicitar la URL firmada a nuestro backend de Astro
    const response = await fetch('/api/get-presigned-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: selectedFile.value.name,
        contentType: selectedFile.value.type,
      }),
    });

    const { uploadUrl, fileUrl } = await response.json();

    // 2. Subir el archivo directamente a Cloudflare R2 usando la URL firmada
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'selectedFile.value.type' },
      body: selectedFile.value,
    });

    if (uploadResponse.ok) {
      // 3. Guardar la URL final para consumirla en la app
      imageUrl.value = fileUrl;
    } else {
      alert('Error al subir el archivo a R2');
    }
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error en el proceso');
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
.uploader-container { border: 1px dashed #ccc; padding: 20px; text-align: center; }
.preview { max-width: 300px; margin-top: 15px; display: block; }
</style>
