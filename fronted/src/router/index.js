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
    path:"/admin",
    name:"admin",
    component:resolve => require(['../views/admin/index.vue'],resolve),
    children:[
      {
        path:"users",
        name:"users",
        component:resolve => require(['../components/Moc/users.vue'],resolve)
      },{
        path:'articals',
        name:'articals',
        component:resolve => require(['../components/Moc/articals.vue'],resolve)
      },{
        path:"/edit",
        name:"edit",
        component:resolve => require(['../components/Moc/Edit/index.vue'],resolve), 
      }
    ]
  }]
})
