<template>
	<div class="artical">
		<ul 
		:style="{minHeight:minHeight}">
			<li v-for="item in articalData">
				<h1 class="artical-title" @click="detail(item._id)">{{item.title}}</h1>
				<div class="meta">
					<span>分类:<i>{{item.category.name}}</i></span>
					<span>发布时间:<i>{{item.ctime}}</i></span>
					<span>阅读量:<i>{{item.views}}</i></span>
				</div>
				<p>简介:{{item.desc}}</p>					
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
import {post} from '../../common/js/api.js'
import {formatTime} from '../../common/js/methods.js'
	export default{
		data() {
			return {
				articalData:[],
	      pageInfo:{
      		currentPage:1,
      		pageSizes:[10,20,30,40],
      		pageSize:10,
      		currentPage:1,
      		total:0
      	}, 
			}
		},
		mounted() {
			var pageInfo = {
        currentPage:1,
        limit:this.pageInfo.pageSize
      };
			post("admin/artical/list",pageInfo).then((res) => {
    		if(res.code == 200) {
          this.pageInfo.total = res.meta.total;
          this.articalData = res.data.map((item, index) => {
          	 let itemTrans = Object.assign({}, item);
          	 itemTrans.ctime = formatTime(item.ctime);
          	 //itemTrans.commentNum = item.comment.length;
          	 itemTrans.commentNum = 0;
          	 return itemTrans;
          });
        } else {
          this.$message('文章获取失败');
        }
    	})
		},
		methods:{
		  handleSizeChange(limit){
		  	var pageInfo = {
	        currentPage:1,
	        limit:limit
	      };
	      post("admin/artical/list",pageInfo).then((res) => {
	    		if(res.code == 200) {
	          this.pageInfo.total = res.meta.total;
	          this.articalData = res.data.map((item, index) => {
	          	 let itemTrans = Object.assign({}, item);
	          	 itemTrans.ctime = formatTime(item.ctime);
	          	 itemTrans.commentNum = item.comment.length;
	          	 return itemTrans;
	          });
	        } else {
	          this.$message('文章获取失败');
	        }
	    	})
		  },
		  handleCurrentChange(currentPage){
			  var pageInfo = {
	        currentPage:currentPage,
	        limit:this.pageInfo.pageSize
	      };
	      post("admin/artical/list",pageInfo).then((res) => {
	    		if(res.code == 200) {
	          this.pageInfo.total = res.meta.total;
	          this.articalData = res.data.map((item, index) => {
	          	 let itemTrans = Object.assign({}, item);
	          	 itemTrans.ctime = formatTime(item.ctime);
	          	 itemTrans.commentNum = item.comment.length;
	          	 return itemTrans;
	          });
	        } else {
	          this.$message('文章获取失败');
	        }
	    	})
			},
			detail(id) {
				console.log(id);
				this.$router.push({name:'articaldetail', params:{id:id}});
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
					&:hover{
						text-decoration: underline;
						cursor: pointer;
					}
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