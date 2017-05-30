<template>
	<div class="edit">
		<div class="form-wrap">
			<el-form label-width="80px" class="form-left">
	  		<el-form-item label="文章名称">
	    		<el-input v-model="articalData.title"></el-input>
	  		</el-form-item>
	  		<el-form-item label="文章描述">
	    		<el-input type="textarea" v-model="articalData.desc"></el-input>
	  		</el-form-item>
	  		<el-form-item label="所属分类">
	    		<el-select v-model="articalData.category">
	      		<el-option 
	      			v-if="Categories"
	      			v-for="(item, index) in Categories"
	      			key="index" 
	      			:label="item.name" 
	      			:value="item._id">
	      		</el-option>
	    		</el-select>
	    		<el-button type="text" @click="addCategory">添加分类</el-button>
	  		</el-form-item>
	  		<el-form-item label="操作">
					<el-button type="text" @click="sendAddArtical">保存</el-button>
					<el-button type="text">存到草稿箱</el-button>
				</el-form-item>
			</el-form>
			<div class="form-right">
			</div>
		</div>
		<div class="edit-area">
			<textarea spellcheck="false" v-model="articalData.content" class="edit-content" @keyup="changeHtml"></textarea>
			<div class="edit-preview" v-html="markdownContent"></div>
		</div>
		<div class="modal">
			<el-dialog title="添加分类" v-model="dialogVisible" size="tiny">
				<el-input 
					placeholder="请输入分类名称" 
					v-model.trim="categoryValue">
				</el-input>
				<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogVisible = false">取消</el-button>
    			<el-button type="primary" @click="sendAddReq">确定</el-button>
  			</span>		
			</el-dialog>
		</div>
	</div>
</template>
<script>
import {markdown} from 'markdown';
import marked from 'marked';
import {get, post} from '../../../common/js/api.js'
import '../../../common/css/markdown.css';
	export default{
		data(){
			return {
				articalData:{
					title:'',
					desc:'',
					content:'',
					category:''
				},
				Categories:[],
				markdownContent:'',
				categoryValue:'',//分类输入框的值
				dialogVisible:false,//对话框是否可见
				aritcalId:'',
			}
		},
		mounted() {
			//发送分类列表获取接口
			this.getCategories();
			console.log(this.$route.query);
			if(this.$route.query && this.$route.query.articalId) {
				this.aritcalId = this.$route.query.articalId;
				//若是再次编辑，获取文章内容
				this.getContent(this.aritcalId);
			}
		},
		methods:{
			changeHtml() {
				//this.markdownContent = markdown.toHTML(this.articalData.content);
				this.markdownContent = marked(this.articalData.content)
				console.log(this.markdownContent);
			},
			addCategory() {
				this.dialogVisible = true;
			},
			//发送添加分类请求
			sendAddReq() {
				const  categoryInfo ={name:this.categoryValue};
				//先判断当前列表中有没有categoryValue
				var isHas = this.Categories.some((item, index) => {
					return item.name === this.categoryValue
				});
				if(isHas){
				 	this.$message('已经有相同分类，不要重复添加');
				 	this.dialogVisible = false;
				 	return;
				}
				if(this.categoryValue) {
					post("admin/category/add",categoryInfo).then((res) => {
          	if(res.code == 200) {
          		this.Categories.push(res.data);
          		this.articalData.category = res.data._id;
            	this.message('分类添加成功');
          	} else {
           	 	this.$message('添加失败,请稍后重试');
          	}
        	}).catch(e => {
        		this.$message(e);
        	});
				}
				this.dialogVisible = false;
			},
			//发送分类获取接口
			getCategories() {
				get("admin/category/get").then((res) => {
	        if(res.code == 200) {
	        	res.data.forEach(item => {
	        		this.Categories.push(item);
	        	});
	        } else {
	         	this.$message('分类获取请稍后重试');
	        }
	      }).catch(e => {
	      	this.$message(e);
	      });
			},
			//提交文章保存
			sendAddArtical() {
				var data = {};
				data.title = this.articalData.title;
				data.desc = this.articalData.desc;
				data.category = this.articalData.category;
				data.content = this.articalData.content;
				if(this.aritcalId) {//如果是编辑
					data._id = this.articalId;
				}
				post("admin/artical/edit",data).then((res) => {
        	if(res.code == 200) {
          	this.$message('新建文章成功');
        	} else {
         	 	this.$message('新建文章失败,请稍后重试');
        	}
      	}).catch(e => {
      		this.$message(e);
      	});
			}
		}
	}
</script>
<style scoped lang="scss">
	.edit{
		position: absolute;
		left: 0;
		height:0;
		width:100%;
		height:100%;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding:20px 0px 0 0px;
		.form-wrap{
			display: flex;
			justify-content: space-between;
			.form-left,form-right{
				flex:0 0 50%;
			}
			.form-right{
				margin-right: 20px;
			}
		}
		.edit-area{
			display: flex;
			flex:1;
			background-color: #ccc;
			font-family: -apple-system, "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;

			.edit-content,.edit-preview{
				box-sizing: border-box;
				padding: 40px 40px 0;
    		resize: none;
    		color: #2f2f2f;
    		font-size: 18px;
    		font-weight: normal;
    		line-height: 30px;
				&::-webkit-scrollbar {
					width:12px;
				}
					/* 滚动槽 */
				&::-webkit-scrollbar-track {
					-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
					border-radius:10px;
				}
					/* 滚动条滑块 */
				&::-webkit-scrollbar-thumb {
					border-radius:10px;
					background:rgba(0,0,0,0.1);
					-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
				}
				&::-webkit-scrollbar-thumb:window-inactive {
					background:rgba(255,0,0,0.4);
				}
			}
			.edit-content{
				flex: 0 0 50%;
				border:none;
				outline: none;
				overflow:auto;
				background:#f9f2f4;
				resize: none;
				color: #333;

			}
			.edit-preview{
				flex:0 0 50%;
				overflow: auto; 
			}
		}
	}
</style>