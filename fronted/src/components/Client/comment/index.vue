<template>
	<ul class="comments">
		<li v-for="(item,index) in commentList">
			<div class="comment-title">
				<img src="../../Head/photo.jpg">
				<div>
					<h6>{{item.name}}</h6>
					<span>{{index+1}}楼.{{item.ctime}}</span>
				</div>
			</div>
			<p class="comment-content">{{item.content}}</p>
		</li>
	</ul>
</template>
<script>
	export default{
		data() {
			return {
				commentList:[{
					name:'蔺亚静',
					ctime:'2017-05-30 23:23:34',
					content:'棒棒哒'
				}]
			}
		}
	}
</script>
<style scope lang="scss">
	.comments{
		width: 620px;
		margin: 0 auto;
		li{
			.comment-title{
				display: flex;
				justify-content: flex-start;
				flex-direction: row;
				img{
					width: 50px;
					height: 50px;
					border-radius: 50%;
					margin-right: 10px;
				}
				&>div{
					h6{
						font-size: 16px;
						line-height: 2em;
						color: #333;
						font-weight: normal;
					}
					span{
						font-size: 12px;
						color:#969696;
					}
				}
			}
			.comment-content{
				margin: 15px 0;
				color: #333;
			}
		}
	}
</style>