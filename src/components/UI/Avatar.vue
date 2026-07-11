<script setup lang="ts">
import { dataUser, loadDataUserFromAPI, logoutUser } from '../../store/dataUser';
import { computed, onMounted } from 'vue';

onMounted( async () => {
    await loadDataUserFromAPI();


});
const userInitial = computed(() => {
    return dataUser.user?.name ? dataUser.user.name.charAt(0).toUpperCase() : '?';
});
</script>

<template>
    <div class="avatar placeholder">
        <div
            class=" w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-neutral text-base-content text-6xl font-bold">
            <span class="w-full h-full flex justify-center items-center">{{ userInitial }}</span>
        </div>
    </div>
</template>