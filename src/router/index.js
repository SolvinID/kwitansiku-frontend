// router.js
import { createRouter, createWebHistory } from 'vue-router';
import TheWelcome from '@/views/TheWelcome.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import HomeView from '@/views/HomeView.vue';
import PasienTki from '@/views/pasien/PasienTki.vue';
import PasienUmum from '@/views/pasien/PasienUmum.vue';
import RekapKwitansi from '@/views/RekapKwitansi.vue';
import BlankoKwitansi from '@/views/BlankoView.vue';

const routes = [
  { path: '/', name:'Welcome', component: TheWelcome },
  { path: '/login', name:'Login', component: LoginView},
  {path: '/register', name:'Register', component: RegisterView},
  {
    path: '/dashboard', 
    name:'Dashboard', 
    component: DashboardView, 
    children:[
      {
        path: "",
        name:'Home', 
        component: HomeView, 
      },
      {
        path: '/pasien-tki',
        name:'Tki',
        component: PasienTki, 
      },
      {
        path: '/pasien-umum',
        name:'Umum',
        component: PasienUmum, 
      },
      {
        path: '/rekap-kwitansi',
        name:'RekapKwitansi',
        component: RekapKwitansi, 
      },
      {
        path: '/blanko-kwitansi',
        name:'BlankoKwitansi',
        component: BlankoKwitansi, 
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  try {
    const isAuthenticated = await checkAuthentication();
    
    if (to.name !== 'Login' && to.name !== 'Register' && to.name !== "Welcome" && !isAuthenticated) {
      next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    // Tindakan yang sesuai jika terjadi kesalahan saat memeriksa otentikasi
    next(error);
  }
});

async function checkAuthentication() {
  return new Promise(resolve => {
    const isAuthenticated = localStorage.getItem('accessToken');
    resolve(isAuthenticated);
  });
}


export default router;