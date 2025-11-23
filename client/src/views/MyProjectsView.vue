<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue';
import { api } from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import type { Project } from '@/types';
import { onMounted, reactive } from 'vue';
import { useToast } from 'vue-toastification';

interface State {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
}
const state = reactive<State>({
  isError: false,
  isLoading: true,
  projects: [],
});

const toast = useToast();
const store = useAuthStore();

onMounted(async () => {
  try {
    const response = await api.get<{ data: Project[] }>('/products', {
      headers: { Authorization: `Bearer ${store.state.token}` },
    });
    state.projects = response.data.data;
  } catch (err) {
    state.isError = true;
    console.log('Failed getting project list: ', err);
    toast.error('Failed getting project list');
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="mx-auto py-6 max-w-7xl container">
    <div class="bg-neutral-700 px-6 py-8 rounded-xl shadow-md m-0 md:m-4">
      <h1 class="text-4xl mb-8 text-center font-bold">Projects</h1>
      <div class="divide-y divide-neutral-500 border border-neutral-500">
        <ProjectList
          :projects="state.projects"
          :is-error="state.isError"
          :is-loading="state.isLoading"
        />
      </div>
    </div>
  </section>
</template>
