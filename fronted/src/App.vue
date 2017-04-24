<template>
  <div id="app">
    <router-view></router-view>  
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	methods:{
		...mapActions([
			'setUserInfo'
		])
	},
	computed:{
		...mapGetters([
			'userInfo'
		])
	},
	mounted() {
		this.$http.get("/api/api/user/userInfo").then((res) => {
      if(res.body.code == 200) {
        this.setUserInfo(res.body.data);
        console.log(this.userInfo)
      } else {
        this.setUserInfo({});
      }
    });
	}
}
</script>
<style>
  body{
    margin: 0;
    padding: 0;
  }
</style>
