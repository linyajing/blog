<template>
	<div class="users">
	  <el-table
	    :data="usersData"
	    style="width: 100%">
	    <el-table-column
	      prop="_id"
	      label="用户ID"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="username"
	      label="用户名"
	      >
	    </el-table-column>
      <el-table-column
        label="用户性质"
        >
        <template scope="scope">
          <span>{{ scope.row.isAdmin?'管理员':'普通用户' }}</span>
        </template>
      </el-table-column>
	    <el-table-column
        label="操作"
        >
        <template scope="scope">
          <el-button type="text" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
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
import {post} from '../../../common/js/api.js';
  export default {
    data() {
      return {
      	pageInfo:{
      		currentPage:1,
      		pageSizes:[10,20,30,40],
      		pageSize:10,
      		currentPage:1,
      		total:0
      	},     	
        usersData: []
      }
    },
    methods:{
      //每页条数改变时触发
      handleSizeChange(limit){
        var pageInfo = {
              currentPage:1,
              limit:limit
            };
        post("admin/users",pageInfo).then((res) => {
          if(res.code == 200) {
            this.pageInfo.total = res.meta.total;
            this.usersData = res.data;
          } else {
            this.$message('用户列表获取失败');
          }
        });
      },
      //当前页改变时触发
      handleCurrentChange(currentPage){
        var pageInfo = {
              currentPage:currentPage,
              limit:this.pageInfo.pageSize
            };
        post("admin/users",pageInfo).then((res) => {
          if(res.code == 200) {
            this.pageInfo.total = res.meta.total;
            this.usersData = res.data;
          } else {
            this.$message('用户列表获取失败');
          }
        });
      },
      del(row,index) {
        console.log(row, index)
      }
    },
    mounted(){
      var pageInfo = {
        currentPage:1,
        limit:this.pageInfo.pageSize
      };
    	post("admin/users",pageInfo).then((res) => {
    		if(res.code == 200) {
          this.pageInfo.total = res.meta.total;
          this.usersData = res.data;
        } else {
          this.$message('用户列表获取失败');
        }
    	})
    }
  }
</script>
<style lang="scss" scoped>
.users{
	position: absolute;
	left: 0px;
	top: 60px;
	width: 100%;
	height: calc(100% - 140px);
	overflow:auto;
  .page{
    position:fixed;
    width: 100%;
    bottom: 30px;
    left: 0px;
    text-align: center;
  }
}

</style>