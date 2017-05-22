<template>
	<div class="head">
		<h1 class="title">MissPuff的博客</h1>
		<router-link to="/">
			<img src="./photo.jpg">
		</router-link>
		<p>前端小白的成长之路</p>
	</div>	
</template>
<script>
	export default{
		data(){
			return {
				user:{
					username:'',
					id:'', 
				}
			}
		},
		methods:{
			login(){

			}
		}
	}
</script>
<style lang="scss" scoped>
	.login,.logined{
		line-height: 48px;
		text-align: right;
		margin-right: 50px;
		cursor: pointer;
		color: #f40;
		//text-decoration: underline;
	}
	.head{
		background: url(./head1.jpg) no-repeat 0  -200px ;
		background-size:cover;
		height: 200px;
		color: #fff;
		text-align:center;
		.title{			
			font-size: 30px;
			line-height: 60px;		
		}
		img{
			text-align: center;
			width:100px;
			height:100px;
			border-radius: 50%;
		}
		p{
			//margin: 0;
			padding:0 20px 0 0;
			text-align: right;
			font-size:20px;
			font-weight: bold;
		}
	}
</style>