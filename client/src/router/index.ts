import LandingView from '@/views/LandingView.vue';
import MyProjectsView from '@/views/MyProjectsView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/SignInView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import ProjectView from '@/views/ProjectView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/myprojects',
      name: 'myprojects',
      component: MyProjectsView,
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectView,
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'landing' && useAuthStore().state.isSignedIn) {
    next({ name: 'myprojects' });
  } else {
    next();
  }
});

export default router;
