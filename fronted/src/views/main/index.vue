<template>
	<div>
		<v-head></v-head>
    <v-banner></v-banner>
    <div class="contents">
    	<div class="main">
        <v-artical></v-artical> 
      </div>      
      <v-login></v-login>
    </div> 
	</div>
</template>
<script>
import Head from "../../components/Head/index.vue";
import Banner from "../../components/Banner/index.vue"
import Login from "../../components/Login/index.vue"
import Artical from "../../components/Artical/index.vue"
	export default {
		components:{
    	vHead:Head,
    	vBanner:Banner,
    	vLogin:Login,
      vArtical:Artical
  	}
	}
</script>
<style lang="scss" scoped>
.contents{
 	padding: 0 20px;
  margin-top: 40px;
  display: flex;
  .main{
		flex:1;
		// border: 1px solid #333;
  }
}
</style>