<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const store = useAuthStore();
</script>

<template>
  <nav class="bg-neutral-700 border-b border-neutral-900 text-neutral-200">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-center flex-1">
        <RouterLink class="flex items-center mr-2" to="/">
          <i class="pi pi-file-edit text-2xl"></i>
          <span class="hidden md:block text-2xl font-bold ml-2">Prodlogger</span>
        </RouterLink>
        <div class="md:ml-auto">
          <div class="flex space-x-2">
            <template v-if="store.state.isSignedIn">
              <RouterLink to="/myprojects" class="rounded-md px-3 py-2 hover:bg-neutral-900">
                My projects
              </RouterLink>
              <RouterLink to="/profile" class="rounded-md px-3 py-2 hover:bg-neutral-900">
                Profile
              </RouterLink>
              <RouterLink
                to="/"
                @click="store.logout"
                class="rounded-md px-3 py-2 hover:bg-neutral-900"
              >
                Logout
              </RouterLink>
            </template>
            <template v-else>
              <RouterLink to="/signin" class="rounded-md px-3 py-2 hover:bg-neutral-900">
                Sign in
              </RouterLink>
              <RouterLink to="/register" class="rounded-md px-3 py-2 hover:bg-neutral-900">
                Register
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
