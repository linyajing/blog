<template>
	<div class="comment">
		<div class="avart" >
			<div class="input">
				<textarea placeholder="请写下您的评论"></textarea>
			</div>
			<div class="btn">
				<button>取消</button>
				<button>发表</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scope lang="scss">
	.comment {
		width: 650px;
		margin: 0 auto;
		.avart{
			width: 100%;
			.input textarea{
				width: 620px;
				height: 80px;
				padding: 10px 15px;
    		font-size: 13px;
    		border: 1px solid #dcdcdc;
    		border-radius: 4px;
   			background-color: hsla(0,0%,71%,.1);
   			resize: none;
    		outline-style: none
			}
			.btn{
				display: flex;
				justify-content:flex-end;
				button{
				  width: 78px;
    			margin: 10px 0 10px 10px;
   				padding: 8px 18px;
   				font-size: 16px;
    			border: none;
    			border-radius: 4px;
    			color: #fff;
    			background-color: #42c02e;
    			cursor: pointer;
    			outline: none;
    			&:nth-of-type(1){
    				color: #969696;
    				background-color: transparent;
    			}
				}
			}
		}
	}
</style>