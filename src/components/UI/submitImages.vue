<template>
  <div class="uploader-container">
    <div v-if="initialImage" class="current">
      <p>Imagen actual:</p>
      <img :src="currentImage || initialImage" alt="Imagen actual" class="preview" />
    </div>

    <input type="file" @change="handleFileChange" accept="image/*" />
    <button @click="uploadImage" :disabled="!selectedFile || isUploading || !restaurantId">
      {{ isUploading ? 'Subiendo...' : (currentImage || initialImage ? 'Actualizar Imagen' : 'Subir Imagen') }}
    </button>

    <div v-if="imageUrl" class="result">
      <p>¡Subido con éxito!</p>
      <input type="text" :value="imageUrl" readonly />
      <img :src="imageUrl" alt="Imagen subida" class="preview" />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  restaurantId: { type: Number, required: true },
  initialImage: { type: String, default: '' },
});

const { restaurantId, initialImage } = toRefs(props);

const selectedFile = ref(null);
const isUploading = ref(false);
const imageUrl = ref('');
const currentImage = ref('');

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) selectedFile.value = file;
};

const uploadImage = async () => {
  if (!selectedFile.value || !restaurantId.value) return;

  isUploading.value = true;
  try {
    const presigned = await fetch('/api/get-presigned-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: selectedFile.value.name,
        contentType: selectedFile.value.type,
      }),
    });

    if (!presigned.ok) throw new Error('No se pudo obtener URL firmada');

    const { uploadUrl, fileUrl } = await presigned.json();

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': selectedFile.value.type },
      body: selectedFile.value,
    });

    if (!uploadResponse.ok) throw new Error('Error subiendo a R2');

    // Guardar en DB llamando al endpoint de restaurante
    const saveResp = await fetch('/api/restaurant', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: restaurantId.value, image: fileUrl }),
    });

    if (!saveResp.ok) throw new Error('Error guardando URL en la base de datos');

    imageUrl.value = fileUrl;
    currentImage.value = fileUrl;
    alert('Imagen subida y guardada correctamente');
  } catch (err) {
    console.error(err);
    alert('Ocurrió un error en el proceso: ' + (err.message || err));
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
.uploader-container { border: 1px dashed #ccc; padding: 20px; text-align: center; }
.preview { max-width: 300px; margin-top: 15px; display: block; }
.current { margin-bottom: 12px; }
</style>
