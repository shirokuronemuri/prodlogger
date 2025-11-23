<script setup lang="ts">
import { api } from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import type { Project, Update } from '@/types';
import { onMounted, reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { VueSpinnerPulse } from 'vue3-spinners';

const toast = useToast();
const store = useAuthStore();

interface Props {
  id: string;
}
const { id: projectId } = defineProps<Props>();

interface State {
  project: Project | null;
  updates: Update[] | null;
  isLoadingProject: boolean;
  isLoadingUpdate: boolean;
  isError: boolean;
  isCreatingUpdate: boolean;
  isEditingUpdate: boolean;
}
const state = reactive<State>({
  project: null,
  updates: null,
  isLoadingProject: true,
  isLoadingUpdate: false,
  isError: false,
  isCreatingUpdate: false,
  isEditingUpdate: false,
});

interface Form {
  title: string;
  body: string;
  version: string;
  updatePoints: {
    contents: string;
    type: 'FEATURE' | 'IMPROVEMENT' | 'BUGFIX';
  }[];
}

const emptyForm = {
  title: '',
  body: '',
  version: '',
  updatePoints: [],
};
const form = reactive<Form>(structuredClone(emptyForm));

const toggleCreateUpdate = () => {
  state.isCreatingUpdate = !state.isCreatingUpdate;
  Object.assign(form, emptyForm);
};

const handleCreateUpdate = async () => {
  try {
    state.isLoadingUpdate = true;
    const projectResponse = await api.post(`/products/${projectId}/updates`, form, {
      headers: { Authorization: `Bearer ${store.state.token}` },
    });
    state.updates?.push(projectResponse.data.data);
    state.isLoadingUpdate = false;
    toast.success('Update created successfully');
    toggleCreateUpdate();
  } catch (err) {
    toast.error('Failed creating update');
    console.error(err);
    state.isError = true;
  }
};

onMounted(async () => {
  try {
    const projectResponse = await api.get(`/products/${projectId}`);
    state.project = projectResponse.data.data;
    const updatesResponse = await api.get(`/products/${projectId}/updates`);
    state.updates = updatesResponse.data.data;
    state.isLoadingProject = false;
  } catch (err) {
    toast.error('Failed fetching project');
    console.error(err);
    state.isError = true;
  }
});
</script>

<template>
  <section class="mx-auto py-6 max-w-7xl container">
    <div class="bg-neutral-700 min-h-96 px-6 py-8 rounded-xl shadow-md m-0 md:m-4">
      <div
        v-if="state.isLoadingProject"
        class="text-center h-96 flex flex-col justify-center items-center"
      >
        <VueSpinnerPulse color="#fff" />
      </div>
      <div
        v-else-if="state.isError"
        class="text-center h-96 flex flex-col justify-center items-center"
      >
        <i class="pi pi-exclamation-triangle text-5xl mb-4"></i>
        <p class="text-2xl">
          Oops! Failed loading the project...<br />
          Please try refreshing the page.
        </p>
      </div>
      <template v-else-if="state.project">
        <div class="text-center">
          <h1 class="text-4xl mb-4 font-bold">{{ state.project.name }}</h1>
          <p class="text-lg mb-8 px-8">{{ state.project.description }}</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button
            @click="toggleCreateUpdate"
            class="text-center mb-8 border py-3 px-6 text-lg sm:text-xl md:text-2xl rounded-lg bg-cyan-900 hover:bg-cyan-700"
          >
            <i v-if="!state.isCreatingUpdate" class="pi pi-plus font-4xl"></i>
            <i v-else class="pi pi-minus font-4xl"></i>
            Add new
          </button>
          <form
            @submit.prevent="handleCreateUpdate"
            v-if="state.isCreatingUpdate"
            class="flex flex-col items-center border py-8 px-4 mb-8"
          >
            <div class="">
              <input
                v-model="form.title"
                type="text"
                class="border rounded w-full py-2 px-3 mb-6"
                placeholder="Title"
                required
              />
              <textarea
                v-model="form.body"
                class="border rounded w-full py-2 px-3 mb-6"
                placeholder="Description..."
              />
              <input
                v-model="form.version"
                type="text"
                class="border rounded w-full py-2 px-3 mb-6"
                placeholder="Version"
                required
              />
            </div>
            <button
              type="submit"
              class="hover:bg-neutral-500 border font-bold py-2 rounded-full w-2/5 focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </form>
        </div>
        <div class="min-h-96 bg-neutral-600">
          <div v-for="update in state.updates" :id="update.id" class="">
            {{ update }}
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
