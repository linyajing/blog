<template>
	<div>
		<v-head></v-head>
		<div class="content">
			<h1>{{articalInfo.title}}</h1>
			<div class="meta">
				<span>创作时间:{{articalInfo.ctime}}</span>
				<span>阅读量:{{articalInfo.views}}</span>
				<span>评论:{{articalInfo.commentNum}}</span>
			</div>
			<div class="show-content" v-html="markdownContent"></div>
		</div>
		<div class="detail-comment"> 
			<Send></Send>
			<Comment></Comment>
		</div>
	</div>
</template>
<script>
	import {post} from '../../../common/js/api.js';
	import {formatTime} from '../../../common/js/methods.js';
	import Head from '../../Head/index.vue';
	import Send from '../comment/sendComment.vue';
	import Comment from '../comment/index.vue';
	import {markdown} from 'markdown';
	export default {
		data() {
			return {
				articalInfo:{},
				markdownContent:''
			}
		},
		mounted() {
			const id = {id:this.$route.params.id};
			post("admin/artical/detail",id).then((res) => {
    		if(res.code == 200) {
    			let newData = Object.assign({}, res.data);
	        newData.ctime = formatTime(newData.ctime);
	        newData.commentNum = newData.comment.length;
	        this.articalInfo =  Object.assign({}, newData);
	        this.markdownContent = markdown.toHTML(newData.content);         
        } else {
          this.$message(res.message);
        }
    	});
		},
		methods:{
			
		},
		components:{
			vHead:Head,
			Send,
			Comment,
		}
	}
</script>
<style lang="scss" scope>
	.content{
		text-align: center;
		h1{
			width: 100%;
			word-break: break-word;
    	margin: 20px 0 0;
    	font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    	font-size: 34px;
    	font-weight: 700;
    	line-height: 1.3
		}
		.meta{
			margin: 20px 0;
			span{
				margin-right: 5px;
				font-size: 12px;
    		color: #969696;
    		font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
			}
		}
		.show-content{
			text-align: left;
			width: 620px;
			margin: 0 auto;
			p{
				color: #2f2f2f;
				margin: 0 0 25px;
		    word-break: break-word;
		    font-size: 16px;
		    font-weight: 400;
		    line-height: 1.7;
		    font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
			}
		}
	}
	.detail-comment{
		padding-bottom: 200px;
	}
	
</style>