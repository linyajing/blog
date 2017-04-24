<template>
	<div class="banner">
		<ul>
			<li 
				v-for="(item, index) in list"
				:class="{active:item.isActive}"
				@click="changeCate(item, index)"
				@mouseover="changeActiveOver(item, index)"
				@mouseout="changeActiveOut(item, index)">
				<span>{{item.name}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return{
				list:[{
					name:'全部',
					isActive:false
				}]
			}
		},
		mounted() {
			this.$http.get("/api/admin/category/get").then((res) => {
        if(res.body.code == 200) {
        	res.body.data.forEach(item => {
        		this.list.push({name:item.name,isActive:false});
        	});
        } else {
         	this.$message('获取分类失败,请稍后重试');
        }
      }).catch(e => {
      	this.$message(e);
      });
		},
		methods:{
			changeCate(val,index) {

			},
			changeActiveOver(val, index) {
				this.list.splice(index,1,{name:val.name,isActive:true});
			},
			changeActiveOut(val, index) {
				this.list.splice(index,1,{name:val.name,isActive:false});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.banner{
		border-bottom: 1px dashed #58dbef;
		padding: 0 20px;
		ul{
			display:flex;
			flex-wrap: wrap;
			width: 100%;
			li{
				flex:0 0 100px;
				text-align:center;
				line-height:50px;
				color: #333;
				cursor: pointer;
				font-weight: bold;
				font-family: '微软雅黑';
				border-bottom: 2px solid #fff;
				//transition: 2s;
				&.active{					
					background: #58dbef;
					color: #fff;
					//transform:skew(-30deg, 0);
					span{
						//transform:skew(0, 30deg);
					}
				}
			}
		}
	}
</style>