<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  restaurantId: { type: Number, required: true },
  initialImage: { type: String, default: '' },
});

// Safe reactive bindings without invalid destructured declarations
const selectedFile = ref(null);
const isUploading = ref(false);
const imageUrl = ref('');

// Initialize and keep in sync using a simple watcher
const currentImage = ref(props.initialImage);

watch(() => props.initialImage, (newVal) => {
  currentImage.value = newVal;
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) selectedFile.value = file;
};

const uploadImage = async () => {
  const file = selectedFile.value;
  if (!file || !props.restaurantId) return;
  isUploading.value = true;

  try {
    const presigned = await fetch('/api/get-presigned-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    if (!presigned.ok) {
      throw new Error('No se pudo obtener URL firmada');
    }

    const { uploadUrl, fileUrl } = await presigned.json();

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) throw new Error('Error subiendo a R2');

    const saveResp = await fetch('/api/restaurant', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: props.restaurantId, image: fileUrl }),
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

<template>
  <div class="flex flex-col gap-2 items-start">
    <p class="text-2xl font-bold">Sube la imagen de tu restaurante</p>

    <div v-if="currentImage">
      <img :src="currentImage" alt="Imagen actual" class="preview" />
    </div>

    <input 
      class="file-input file-input-warning" 
      type="file" 
      @change="handleFileChange" 
      accept="image/*" 
    />

    <button 
      @click="uploadImage" 
      :disabled="!selectedFile || isUploading || !props.restaurantId" 
      class="btn btn-primary"
    >
      {{ isUploading ? 'Subiendo...' : (currentImage ? 'Actualizar Imagen' : 'Subir Imagen') }}
    </button>

    <div v-if="imageUrl" class="result">
      <p>¡Subido con éxito!</p>
      <input type="text" :value="imageUrl" readonly />
      <img :src="imageUrl" alt="Imagen subida" class="preview" />
    </div>
  </div>
</template>
