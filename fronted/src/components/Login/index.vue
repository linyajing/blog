<template>
	<div class="right">
		<div class="login form" v-if="type==='login'">
			<h2><span>登录</span></h2>
			<ul>
				<li>				
					<label>用户名:</label>
					<input type="text" name="username" v-model="login.username">
				</li>
				<li>
					<label>密码:</label>
					<input type="password" name="password" v-model="login.password">
				</li>
				<li>
					<label></label>
					<button @click="doLogin">登录</button>
				</li>
				<li>
					<label></label>
					<p>还没注册？<a href="javascript::0" @click.prevent="type='register'">马上注册</a></p>
				</li>
			</ul>
			<div class="message">{{message}}</div>
		</div>
		<div class="register form" v-if="type==='register'">
			<h2><span>注册</span></h2>
			<ul>
				<li>				
					<label>用户名:</label>
					<input type="text" name="username" v-model="register.username">
				</li>
				<li>
					<label>密码:</label>
					<input type="password" name="password" v-model="register.password">
				</li>
				<li>
					<label>重复密码:</label>
					<input type="password" name="repassword" v-model="register.repassword">
				</li>
				<li>
					<label></label>
					<button @click="doRegist">注册</button>
				</li>
				<li>
					<label></label>
					<p>已经注册？<a href="" @click.prevent="type='login'">马上登录</a></p>
				</li>
			</ul>
			<div class="message">{{message}}</div>
		</div>
		<div class="info" v-if="type==='logined'">
			<span>欢迎你{{userInfo.username}}来到我的博客</span><br>
			<span v-if="userInfo.isAdmin">您是管理员</span><br>
			<span v-if="!userInfo.isAdmin">您是普通用户</span><br>
			<a href="" @click.prevent="quit">退出登录</a>
			<a href="" v-if="userInfo.isAdmin" @click.prevent="moc">进入后台</a>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
	export default {
		data() {
			return {
				type:"register",
				login:{
					username:'',
					password:'',
				},
				register:{
					username:'',
					password:'',
					repassword:'',
				},
				message:''
			}
		},
		computed:{
			...mapGetters([
				'userInfo'
			]),
		},
		watch:{
			userInfo:{
				handler:function(val,oldVal){
					console.log(val,oldVal,'watch');
					this.type  = val && val.username ? 'logined':'register';
				},
				deep:true
			}
		},
		methods:{
			...mapActions([
				'setUserInfo'
			]),
			doLogin() {
				if(this.login.username == '') {
					this.message = '用户名不能为空';
				} else if(this.login.password == '') {
					this.message = '密码不能为空';
				} else {
					this.$http.post('/api/api/user/login',this.login).then((res) =>{
						console.log('res',res.body)
						if(res.body.code == 2) {
							this.message = res.body.message;
						} else {
							this.message = res.body.message;
							var that = this;
							setTimeout(() => {
								that.messge = '';  
								that.userInfo = res.body.userInfo;
								console.log('设置vuex',that.userInfo);
								that.setUserInfo(that.userInfo);
								that.type = 'logined';
							}, 500);
						}
					},(res) =>{
						this.message = res.body.message;
					})
				}
				
			},
			doRegist() {
				if(this.register.username ==""){
					this.message = '用户名不能为空';
					return false;
				} else if (this.register.password == '') {
					this.message = '密码不能为空';
					return false;
				} else if (this.register.password !== this.register.repassword) {
					this.message ='两次输入的密码不一致';
					return false;
				} else {
					this.$http.post('/api/api/user/register',this.register).then((res) => {
					  if(res.body.code == 4) {
					  	this.message=res.body.message;
					  } else {
					  	var that = this;
					  	this.message = res.body.message;
					  	setTimeout(function(){
					  		that.message = '';
					  		that.type = 'login';
					  	},500);
					  }
					},(res) =>{
					  this.message = res.body.message;
					});
				}
			},
			quit() {
				this.$http.get('/api/api/user/layout').then((res) => {
					console.log('layout',res)
					if(res.body.code == 0){
						this.type = 'register';
						this.message = '';
					}				
				}).catch( 
					function() {
						console.log('退出错误')
					}
				)
			},
			moc(){
				//这里需要根据用户类型决定跳转到那个路由
				this.$router.replace({name:'users'});
			}
		},
		mounted() {
			console.log("有从新加载login")
			this.type = this.userInfo && this.userInfo.username ? 'logined':'register';		
		}
	}
</script>
<style lang="scss" scoped>
	.right{
		flex:0 0 250px;
		width: 100px;
		//border: 1px solid #999;
		//box-shadow: 1px 2px 10px rgba(0,0,0,.2);
		padding: 10px;
		.form{
			h2{
				font-size: 18px;
				font-family: '微软雅黑';
				border-bottom: 1px solid rgba(0,0,0,0.1);
				color: #555;
				span{
					border-bottom: 2px solid #f40;
				}
			}
			ul{
				li{
					margin: 10px 0;
					height: 30px;
					line-height: 30px;
					label{
						display: inline-block;
						width:80px;
					}
					input{
						width: 150px;
						height: 25px;
						border-radius: 2px;
						border:1px solid #999;
					}
					button{
						width:150px;
						height:30px;
						border: none;
						border-radius:2px;
						background: #f40;
						color:#fff;
						font-size: 14px;
					}
					p{
						display: inline-block;
						width:150px;
						text-align: right;
						font-size: 12px;
						a{
							color: #f40;
						}
					}
				}
			}
			.message{
				text-align: center;
				color: #f40;
				font-size: 12px;
			}
		}
		.info{
			font-size: 12px;
			line-height: 36px;
			a{
				color: #f40;
			}
		}
	}
</style>