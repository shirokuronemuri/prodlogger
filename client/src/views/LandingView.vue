<template>
  <section class="bg-neutral-700 py-20 mb-4">
    <div class="max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold sm:text-5xl md:text-6xl">
        Show your progress<br />
        to the world
      </h1>
      <p class="my-4 text-lg sm:text-xl md:text-2xl mb-10">
        We make changelogs more appealing for everyone
      </p>
      <div class="flex justify-center gap-4">
        <RouterLink
          to="/register"
          class="border py-3 px-6 text-lg sm:text-xl md:text-2xl rounded-lg bg-cyan-900 hover:bg-cyan-700"
          >Register</RouterLink
        >
        <RouterLink
          to="/signin"
          class="border py-3 px-6 text-lg sm:text-xl md:text-2xl rounded-lg hover:bg-neutral-600"
          >Sign in</RouterLink
        >
      </div>
    </div>
  </section>
</template>
