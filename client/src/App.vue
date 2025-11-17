<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const store = useAuthStore();

onMounted(async () => {
  await store.loadState();
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>
