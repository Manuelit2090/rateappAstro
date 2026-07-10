<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeUbicacion } from './UI/storeUbication'
import { calculeDistance } from '../lib/calculateDistance'

interface Props {
  resLat: number
  resLon: number
}

const props = defineProps<Props>()

const latUser = ref<number | null>(null)
const lonUser = ref<number | null>(null)
const distanceTotal = ref<number>(0)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    await storeUbicacion.detectarUbicacion()
    
    const coordinates = storeUbicacion.getCoordinates()
    if (coordinates) {
      latUser.value = coordinates.lat
      lonUser.value = coordinates.lng
      
      console.log('User coords:', { lat: latUser.value, lng: lonUser.value })
      console.log('Restaurant coords:', { lat: props.resLat, lng: props.resLon })
      
      distanceTotal.value = calculeDistance(latUser.value, lonUser.value, props.resLat, props.resLon)
      
      console.log('Distance calculated:', distanceTotal.value)
    }
  } catch (err) {
    error.value = 'Error calculating distance'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="loading" class="text-sm text-neutral">Calculando distancia...</div>
    <div v-else-if="error" class="text-sm text-error">{{ error }}</div>
    <div v-else class="text-sm text-accent-content/85 l">
      Distancia: <span class="font-semibold text-primary">{{ distanceTotal.toFixed(2) }} km</span>
    </div>
  </div>
</template>
