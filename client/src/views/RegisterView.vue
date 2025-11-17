<script setup lang="ts">
import { reactive } from 'vue';
import router from '@/router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/api/axios';

interface State {
  form: {
    username: string;
    password: string;
  };
}
const state = reactive<State>({
  form: {
    username: '',
    password: '',
  },
});

const toast = useToast();
const store = useAuthStore();

const handleSubmit = async () => {
  try {
    const response = await api.post('/register', state.form);
    toast.success('You have registered successfully!');
    router.push('/');
    localStorage.setItem('token', response.data.token);
    await store.setToken(response.data.token);
  } catch (err) {
    toast.error('Register failed');
  }
};
</script>

<template>
  <section class="container m-auto max-w-lg py-24">
    <div class="bg-neutral-600 px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
      <form @submit.prevent="handleSubmit" class="flex flex-col items-center">
        <h2 class="text-3xl text-center font-semibold mb-8">Register</h2>
        <div class="w-3/5">
          <input
            v-model="state.form.username"
            type="text"
            class="border rounded w-full py-2 px-3 mb-6"
            placeholder="Username"
            required
          />
          <input
            v-model="state.form.password"
            type="password"
            class="border rounded w-full py-2 px-3 mb-6"
            placeholder="Password"
            required
          />
        </div>
        <p class="mb-6">
          Already have an account?
          <RouterLink
            to="/register"
            class="font-semibold text-cyan-400 hover:text-cyan-200 underline"
            >Sign in</RouterLink
          >
        </p>
        <button
          type="submit"
          class="hover:bg-neutral-500 border font-bold py-2 px-4 rounded-full w-3/5 focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </div>
  </section>
</template>
