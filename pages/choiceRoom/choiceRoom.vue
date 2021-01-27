<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="title" v-text="detail.name"></view>
		<view class="search flex_y_center">
			<image src="../../static/images/index_search_icon.png" mode=""></image>
			<input placeholder="请输入科室、医生名称"></input>
		</view>
		<view class="person flex_y_center">
			<view class="" v-text="detail.patientName"></view>
			<image src="../../static/images/icon_right.png" mode=""></image>
		</view>
		<view class="scroll_box flex">
			<scroll-view scroll-y="true" class="scroll_left">
				<view @click="firstClick(item.deptCode)" v-for="(item,index) in deptList" :key="index" :class="curCode==item.deptCode?'sl_item active text_more':'sl_item text_more'"><view :class="curCode==item.deptCode?'active':''" v-text="item.deptName"></view></view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scroll_right">
				<view v-for="(item,index) in deptChildList" :key="index" @click="childClick(item.relId,item.deptName)" class="sr_item active text_more" v-text="item.deptName"></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	export default {
		components: {
			Header
		},
		data() {
			return {
				title: "选择科室",
				deptName:"",
				parentCode:"",
				pageNo:1,
				pageSize:10,
				detail :{
					id : "",
					name : "",
					patientId : '',
					patientName : ''
				},
				deptList:[],
				deptChildList:[],
				curCode : 0
			}
		},
		onLoad(options) {
			this.detail = options
			this.loaddata(this.deptName,this.detail.id,this.parentCode,this.pageNo,this.pageSize)
		},
		methods: {
			firstClick(code){
				const that = this
				that.curCode = code
				that.loaddata(that.deptName,that.detail.id,code,that.pageNo,that.pageSize)
			},
			
			childClick(id,deptName){
				wx.navigateTo({
					url: "/pages/choiseDoc2/choiseDoc2?id="+this.detail.id+"&name="+this.detail.name+"&patientId="+this.detail.patientId+"&patientName="+this.detail.patientName+"&code="+id+"&deptName="+deptName
				})
			},
			
			loaddata(deptName,orgId,parentCode,pageNo,pageSize){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.listDept,
					method:'post',
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"deptName": deptName,
						"orgId": orgId,
						"pageNo": pageNo,
						"pageSize": pageSize,
						"parentCode": parentCode,
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						uni.hideLoading()
						if(res.data.status==200){
							if(parentCode){
								that.deptChildList = res.data.data
							}else{
								that.deptList = res.data.data
								that.curCode = res.data.data[0].deptCode
								that.loaddata(that.deptName,that.detail.id,res.data.data[0].deptCode,that.pageNo,that.pageSize)
							}
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/chioceRoom.scss";
</style>
