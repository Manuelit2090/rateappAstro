<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { showAviso } from '../store/alerts';
import { dataUser, loadDataUserFromAPI } from '../store/dataUser';
import HeaderPage from './UI/HeaderPage.vue';

type ShopItem = {
  id: number;
  description: string;
  price: number;
  category: string;
  restaurant_name?: string;
  restaurant_image?: string;
  restaurant_slug?: string;
};

const items = ref<ShopItem[]>([]);
const loading = ref(false);
const ownedCouponIds = computed(() =>
  new Set((dataUser.user?.cuponsBuy ?? []).map((coupon) => String(coupon.id)))
);

function isCouponOwned(couponId: number | string) {
  return ownedCouponIds.value.has(String(couponId));
}

async function loadItems() {
  loading.value = true;
  try {
    const res = await fetch('/api/shop');
    if (!res.ok) throw new Error('Error al cargar items');
    const data = await res.json();
    items.value = data.items || [];
  } catch (err: any) {
    console.error(err);
    showAviso('No se pudieron cargar los artículos de la tienda', 'error');
  } finally {
    loading.value = false;
  }
}

async function redeem(itemId: number, price: number) {
  if (isCouponOwned(itemId)) {
    showAviso('Ya compraste este cupón. Lo encontrarás en tu perfil.', 'error');
    return;
  }

  try {
    const res = await fetch('/api/shop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'redeem', shop_id: itemId })
    });
    const data = await res.json();
    if (!res.ok) {
      showAviso(data.error || 'No se pudo canjear', 'error');
      return;
    }
    await loadDataUserFromAPI();
    showAviso('Canje exitoso: ' + (data.coupon?.code ?? ''), 'success');
    await loadItems();
  } catch (err) {
    console.error(err);
    showAviso('Error al canjear el artículo', 'error');
  }
}

onMounted(async () => {
  await loadDataUserFromAPI();
  await loadItems();
});
</script>

<template>
  <div class="container mx-auto ">
    <!-- Encabezado de la página -->
    <HeaderPage title="Shop" subtitle="Gasta tus puntos y desbloquea recompensas"/>
    
    <h1 class="text-3xl font-bold text-base-content">Tienda de cupones</h1>

    <!-- Estado de Carga con Spinner de DaisyUI -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Grid de Tarjetas Receptivo -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <div v-for="it in items" :key="it.id" class="card card-compact bg-base-100 shadow-xl border border-base-200 shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300">
        
        <!-- Cuerpo de la Tarjeta -->
        <div class="card-body justify-between">
          <div class="flex items-start gap-4">
            <!-- Imagen del Restaurante -->
            <img 
              v-if="it.restaurant_image" 
              :src="it.restaurant_image" 
              alt="logo" 
              class="w-16 h-16 object-cover rounded-xl border border-base-300 shrink-0" 
            />
            
            <div class="space-y-1">
              <!-- Insignia de Categoría (Opcional si viene en tu tipo) -->
              <div v-if="it.category" class="badge badge-sm badge-outline text-xs capitalize">{{ it.category }}</div>
              <!-- Descripción -->
              <h3 class="card-title text-base leading-tight text-base-content">{{ it.description }}</h3>
              <!-- Nombre de Restaurante -->
              <p class="text-xs text-base-content/60">
                Restaurante: <span class="font-medium text-base-content">{{ it.restaurant_name || '---' }}</span>
              </p>
            </div>
          </div>

          <!-- Precio e Interacciones -->
          <div class="mt-4 pt-4 border-t border-base-200 flex flex-col gap-3">
            <div class="flex justify-between items-center">
              <span class="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Costo</span>
              <span class="text-lg font-bold text-primary">{{ it.price }} pts</span>
            </div>

            <!-- Acciones -->
            <div class="card-actions flex gap-2">
              <a 
                v-if="it.restaurant_slug" 
                :href="`/restaurant/${it.restaurant_slug}`" 
                class="btn btn-sm btn-outline flex-1"
              >
                Ver local
              </a>
              <button 
                :disabled="isCouponOwned(it.id)"
                :class="[
                  'btn btn-sm flex-1 text-white',
                  isCouponOwned(it.id) ? 'btn-disabled bg-base-200 text-base-content/60 border-base-300' : 'btn-primary'
                ]"
                @click="redeem(it.id, it.price)"
              >
                {{ isCouponOwned(it.id) ? 'Comprado' : 'Canjear' }}
              </button>
            </div>
            <p v-if="isCouponOwned(it.id)" class="text-xs text-warning mt-1">
              Ya compraste este cupón y está guardado en tu perfil.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
