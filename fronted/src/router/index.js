import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect:'/main'
  },{
  	path: '/main',
  	name: 'main',
  	component: resolve => require(['../views/main/index.vue'], resolve)
  },{
    path: '/articaldetail/:id',
    name:  'articaldetail',
    component: resolve => require(['../components/Client/articalDetail/index.vue'],resolve)
  },{
    path:"/admin",
    name:"admin",
    component:resolve => require(['../views/admin/index.vue'],resolve),
    children:[
      {
        path:"users",
        name:"users",
        component:resolve => require(['../components/Moc/Users/index.vue'],resolve)
      },{
        path:'articals',
        name:'articals',
        component:resolve => require(['../components/Moc/Articals/index.vue'],resolve)
      },{
        path:"edit",
        name:"edit",
        component:resolve => require(['../components/Moc/Edit/index.vue'],resolve), 
      },{
        path:"comments",
        name:"comments",
        component:resolve => require(['../components/Moc/Comments/index.vue'],resolve), 
      },{
        path:"categories",
        name:"categories",
        component:resolve => require(['../components/Moc/Categories/index.vue'],resolve), 
      }
    ]
  }]
})
