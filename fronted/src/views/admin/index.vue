<template>
	<div class="admin">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="main">首页</el-menu-item>
    	<el-menu-item index="users">用户管理</el-menu-item>
      <el-menu-item index="articals">文章管理</el-menu-item>
  		<el-menu-item index="comments">评论管理</el-menu-item>
      <el-menu-item index="categories">文章分类管理</el-menu-item>     
    </el-menu>
    <router-view></router-view>
	</div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 'users'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.replace({name:key});
    }
  }
}
</script>