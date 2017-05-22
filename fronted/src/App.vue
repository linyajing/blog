<template>
  <div id="app">
    <router-view></router-view>  
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {get} from './common/js/api'
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
		get("api/user/userInfo").then((res) => {
      if(res.code == 200) {
        this.setUserInfo(res.data);
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
