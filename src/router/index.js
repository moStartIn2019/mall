import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// router懒加载写法
const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Shopcart = () => import('views/shopcart/Shopcart');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/home'

    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/category',
      name: 'Category',
      component: Category,
      // meta: {
      //   title: '关于'
      // },
      // beforeEnter: (to, from, next) => {
      //   // console.log('about,beforeEnter');
      //   next();
      // }
    },
    {
      path: '/shopcart',
      name: 'Shopcart',
      component: Shopcart
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      // 非query方式
      // path: '/detail/did=:iid',
      
      // query方式
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  //   {
  //     path: '/user/:userId',
  //     name: 'User',
  //     component: User,
  //     meta: {
  //       title: '用户'
  //     }
  //   }
  ],
  mode: 'history',
  // linkActiveClass: 'active',
})

// router.beforeEach((to, from, next) => {
//   document.title = to.matched[0].meta.title;
//   // console.log(to);
//   next();
// });

// 传到main.js的Vue实例
export default router;
