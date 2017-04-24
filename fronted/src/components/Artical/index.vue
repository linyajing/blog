<template>
	<div class="artical">
		<ul 
		:style="{minHeight:minHeight}">
			<li v-for="item in articalData">
				<h1>{{item.title}}</h1>
				<div class="meta">
					<span>分类:<i>{{item.category}}</i></span>
					<span>发布时间:<i>{{item.ctime}}</i></span>
					<span>作者:<i>{{item.username}}</i></span>
					<span>阅读量:<i>{{item.views}}</i></span>
				</div>
				<p>简介:{{item.desc}}<a>查看全文>></a></p>					
			</li>
		</ul>
	  <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="pageInfo.pageSizes"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				articalData:[{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      },{
					title:'css入门',
					category:'css',
	        username:'test1',
					ctime:'2017-2-2',
					views:100,
	        desc:'开启css之旅',
					commentNum:100,
	        content:'啊啊啊啊啊啊啊啊啊啊啊啊'
	      }],
	      pageInfo:{
      		currentPage:1,
      		pageSizes:[10,20,30,40],
      		pageSize:10,
      		currentPage:1,
      		total:0
      	}, 
			}
		},
		methods:{
		  handleSizeChange(limit){
		  },
		  handleCurrentChange(currentPage){
		  }
		},
		computed:{
			minHeight(){
				return (document.documentElement.clientHeight-280)+'px';
			}
		}
	}
</script>
<style scoped lang="scss">
	.artical{
		ul{

			li{
				margin-bottom: 20px;
				h1{
					text-align: center;
					font-family: "微软雅黑";
					font-size: 24px;
					line-height: 48px;
				}
				.meta{
					text-align: center;
					margin: 0 50px;
					line-height: 48px;
					span{
						margin-right: 10px;
						i{
							font-style: normal;
							//color: #f40;
						}
					}
				}
				p{
					text-align: center;
					a{
						color: #f40;
						margin-left: 40px;
						cursor: pointer;
					}
				}
			}
		}	
		.page{
			width: 100%;
			text-align: center;
			padding: 40px 0;
		}	
	}
</style>