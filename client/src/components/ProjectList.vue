<script setup lang="ts">
import type { Project } from '@/types';
import { VueSpinnerPulse } from 'vue3-spinners';

interface Props {
  projects: Project[];
  isError: boolean;
  isLoading: boolean;
}
const { projects, isError, isLoading } = defineProps<Props>();
</script>

<template>
  <div v-if="isLoading" class="text-center h-96 flex flex-col justify-center items-center">
    <VueSpinnerPulse color="#fff" />
  </div>
  <div v-else-if="isError" class="text-center h-96 flex flex-col justify-center items-center">
    <i class="pi pi-exclamation-triangle text-5xl mb-4"></i>
    <p class="text-2xl">
      Oops! Failed loading the list...<br />
      Please try refreshing the page.
    </p>
  </div>
  <template v-else>
    <div class="h-20 flex items-center justify-center divide-neutral-800 hover:bg-neutral-800">
      <i class="pi pi-plus text-3xl"></i>
      <p class="text-2xl pl-4">Create project</p>
    </div>

    <RouterLink
      v-for="project in projects"
      :id="project.id"
      :to="{ name: 'project', params: { id: project.id } }"
      class="flex justify-between items-center py-4 px-4 divide-neutral-800 hover:bg-neutral-800"
    >
      <div class="flex-1">
        <p class="text-2xl font-semibold mb-2">{{ project.name }}</p>
        <p class="text-sm">{{ project.description || 'No description' }}</p>
      </div>
      <p class="text-sm text-right pr-4 pl-8">{{ new Date(project.updatedAt).toLocaleString() }}</p>
    </RouterLink>
  </template>
</template>
