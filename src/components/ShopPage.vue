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
    <HeaderPage title="Shop" subtitle="Gasta tus puntos y desbloquea recompensas" />


    <div class="w-full flex flex-col justify-center items-center gap-8 bg-base-100 my-12">

      <a href="#" class="  hover-3d   cursor-pointer">

        <!-- content -->
        <div
          class="card md:w-200 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
          <div class="card-body">
            <div class="flex justify-between mb-10">
              <div class="font-bold">RateApp Wallet</div>
              <div class="text-5xl opacity-10">❁</div>
            </div>
            <div class="text-lg mb-4 opacity-40">0210 8820 1150 0222</div>
            <div class="flex justify-between">
              <div>
                <div class="text-xs opacity-20">CARD USER</div>
                <div>{{ dataUser.user?.name || 'USER' }}</div>
              </div>
              <div>
                <div class="text-xs opacity-20">PUNTOS</div>
                <div>{{ dataUser.user?.totalPoints || 0 }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 8 empty divs needed for the 3D effect -->
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </a>
    </div>

    <!-- Estado de Carga con Spinner de DaisyUI -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Grid de Tarjetas Receptivo -->
   <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 border-t-base-200 rounded-2xl bg-base-300">
  <div 
    v-for="it in items" 
    :key="it.id" 
    class="group card bg-base-200 border border-base-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
  >
    <!-- Cuerpo de la Tarjeta -->
    <div class="card-body p-5 justify-between gap-4">
      
      <!-- Información Principal (Cupón) -->
      <div class="flex flex-col items-start gap-4">
        <!-- Contenedor de la Imagen con Efecto Zoom -->
        <div  class="w-full h-32 rounded-2xl overflow-hidden border border-base-200 shrink-0 shadow-sm bg-base-200">
          <img 
            :src="it.restaurant_image || 'https://pub-d80845b9e313461db9d75fa6897f1bf3.r2.dev/cupon_banner.jpeg'" 
            alt="logo" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        <div class="space-y-1.5 flex-1 min-w-0">
          <!-- Categoría -->
          <div v-if="it.category" class="badge badge-sm bg-primary/10 border-none text-primary font-medium tracking-wide text-[10px] uppercase">
            {{ it.category }}
          </div>
          
          <!-- Título / Descripción del Cupón -->
          <h3 class="font-bold text-base leading-snug text-base-content line-clamp-2 group-hover:text-primary transition-colors duration-200" :title="it.description">
            {{ it.description }}
          </h3>
          
          <!-- Nombre de Restaurante -->
          <p class="text-xs text-base-content/60 flex items-center gap-1 truncate">
            <span>Por:</span>
            <span class="font-semibold text-base-content hover:underline cursor-pointer">{{ it.restaurant_name || '---' }}</span>
          </p>
        </div>
      </div>

      <!-- Footer: Costo y Acciones -->
      <div class="mt-2 space-y-3">
        <!-- Línea divisoria punteada estilo cupón -->
        <div class="border-t border-dashed border-base-300 pt-4 flex justify-between items-baseline">
          <span class="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">Valor</span>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-black text-primary tracking-tight">{{ it.price }}</span>
            <span class="text-xs font-bold text-primary/80 uppercase">pts</span>
          </div>
        </div>

        <!-- Acciones -->
        <div class="card-actions flex gap-2">
          <a 
            v-if="it.restaurant_slug" 
            :href="`/restaurant/${it.restaurant_slug}`" 
            class="btn btn-sm btn-outline border-base-300 hover:border-primary hover:bg-primary/5 hover:text-primary flex-1 font-medium capitalize"
          >
            Ver local
          </a>
          
          <button 
            :disabled="isCouponOwned(it.id)" 
            :class="[ 
              'btn btn-sm flex-1 font-semibold border-none transition-all duration-200 shadow-sm', 
              isCouponOwned(it.id) 
                ? 'bg-base-200 text-base-content/40 cursor-not-allowed shadow-none' 
                : 'bg-primary hover:bg-primary-focus text-primary-content shadow-primary/20' 
            ]" 
            @click="redeem(it.id, it.price)"
          >
            {{ isCouponOwned(it.id) ? 'Canjeado' : 'Canjear' }}
          </button>
        </div>

        <!-- Mensaje de Estado Auxiliar -->
        <div v-if="isCouponOwned(it.id)" class="flex items-center justify-center gap-1 text-[11px] font-medium text-success bg-success/10 py-1.5 rounded-lg border border-success/20 animate-fade-in">
          <span>✓ Ya tienes este cupón</span>
        </div>
      </div>

    </div>
  </div>
</div>
  </div>
</template>
