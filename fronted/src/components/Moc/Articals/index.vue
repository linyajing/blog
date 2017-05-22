<template>
	<div class="articals">
		<el-button type="primary" class="btn-new" @click="newArtical">新建文章</el-button>
	  <el-table
	    :data="articalsData"
	    style="width: 100%">
	    <el-table-column
	      prop="_id"
	      label="文章ID"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="名称"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="category.name"
	      label="分类"
	      >
	    </el-table-column>
	    <el-table-column
	      label="上传时间"
	      >
	      <template scope="scope">
	      	<span>
	      		{{scope.row.ctime}}
	      	</span>
        </template>
	    </el-table-column>
	    <el-table-column
	      prop="views"
	      label="阅读量"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="comment"
	      label="评论量"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="desc"
	      label="简介"
	      >
	    </el-table-column>
	    <el-table-column
        label="操作"
        >
        <template scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row, scope.$index)">编辑</el-button>
        </template>
	    </el-table-column>
	  </el-table>
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
import {formatTime} from '../../../common/js/methods.js';
import {post} from '../../../common/js/api.js';
	export default{
		data(){
			return {
				articalsData:[],
				pageInfo:{
					currentPage:1,
					pageSizes:[10,20,30,40],
					pageSize:10,
					currentPage:1,
					total:0
				}
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
          this.articalsData = res.data.map((item, index) => {
          	 let itemTrans = Object.assign({}, item);
          	 itemTrans.ctime = formatTime(item.ctime);
          	 itemTrans.comment = item.comment.length;
          	 return itemTrans;
          });
        } else {
          this.$message('文章获取失败');
        }
    	})
		},
		methods:{
			//每页条数改变时触发
			handleSizeChange(limit){
			  var pageInfo = {
			        currentPage:1,
			        limit:limit
			      };
			  post("admin/artical/list",pageInfo).then((res) => {
	    		if(res.code == 200) {
	          this.pageInfo.total = res.meta.total;
	          this.articalsData = res.data.map((item, index) => {
	          	 let itemTrans = Object.assign({}, item);
	          	 itemTrans.ctime = formatTime(item.ctime);
	          	 itemTrans.comment = item.comment.length;
	          	 return itemTrans;
	          });
	        } else {
	          this.$message('文章获取失败');
	        }
	    	})			  
			},
			//当前页改变时触发
			handleCurrentChange(currentPage){
			  var pageInfo = {
			        currentPage:currentPage,
			        limit:this.pageInfo.pageSize
			      };
			  post("admin/artical/list",pageInfo).then((res) => {
	    		if(res.code == 200) {
	          this.pageInfo.total = res.meta.total;
	          this.articalsData = res.data.map((item, index) => {
	          	 let itemTrans = Object.assign({}, item);
	          	 itemTrans.ctime = formatTime(item.ctime);
	          	 itemTrans.comment = item.comment.length;
	          	 return itemTrans;
	          });
	        } else {
	          this.$message('文章获取失败');
	        }
	    	})
			},
			//点击编辑
			edit(list, index) {
				console.log(list, index)
				this.$router.replace({name:'edit',query:{articalId:list._id}});
			},
			//点击新建
			newArtical() {
				this.$router.replace({name:'edit'});
			}
		}
	}
</script>
<style scoped lang="scss">
.btn-new{
	margin: 10px;
}
.articals{
	position: absolute;
	left: 0px;
	top: 60px;
	width: 100%;
	height: calc(100% - 140px);
	overflow:auto;
}
.page{
	//position:fixed;
	width: 100%;
	bottom: 30px;
	left: 0px;
	text-align: center;
}
</style>