<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="top">
			<view class="flex_y_center search">
				<image src="../../static/images/index_search_icon.png" mode=""></image>
				<input type="text" value="" placeholder="请输入科室、医生名称" />
			</view>
			<view class="tab flex_y_center">
				<view class="picher flex_y_center">
					<view class="">全部科室</view>
					<image src="../../static/images/icon_down.png" mode=""></image>
				</view>
				<view class="picher flex_y_center" style="margin-left: auto;">
					<view class="">综合排序</view>
					<image src="../../static/images/icon_down.png" mode=""></image>
				</view>
				<view class="dept_cup" v-show="status==1">
					<view class="dept_item flex_y_center" >
						<view class="">全部专业</view>
						<image src="../../static/images/circle0.png" mode=""></image>
					</view>
					<view class="dept_item flex_y_center" v-for="item in deptList" :key="item.deptCode ">
						<view class="" v-text="item.deptName"></view>
						<image src="../../static/images/circle0.png" mode=""></image>
					</view>
				</view>	
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in docList" :key="item.doctorId">
				<navigator hover-class="none" :url="'/pages/choiseDocDetail/choiseDocDetail?id='+item.doctorId">
					<view class="flex i_top">
						<view class="left">
							<image :src="item.avatar" mode=""></image>
							<view v-show="item.onlineStatus==1" class="active">在线</view>
							<view v-show="item.onlineStatus==0" class="">离线</view>
						</view>
						<view class="right">
							<view class="flex_y_center">
								<view class="name" v-text="item.doctorName"></view>
								<view class="doc_level" v-text="item.titleName"></view>
								<view class="flex_all_center hosp_level">
									<image src="../../static/images/hosp_level.png" mode=""></image>
									<view v-show="item.organizationLevel==1">一甲</view>
									<view v-show="item.organizationLevel==2">二甲</view>
									<view v-show="item.organizationLevel==3">三甲</view>
								</view>
							</view>
							<view class="hospital" v-text="item.organizationName"></view>
							<view class="text_more" v-text="'擅长：'+item.professional"></view>
							<view class="see_num" v-text="'问诊量'+item.askNum"></view>
						</view>
					</view>
					<view class="i_bottom" v-text="'￥'+item.minPrice+'起'"></view>
				</navigator>
				<view v-show="item.followTag==0" class="collect flex_all_center" @click="collect(item.doctorId)">
					<image src="../../static/images/collect.png" mode=""></image>
					<view>关注</view>
				</view>
				<view v-show="item.followTag==1" class="collect_act" @click="cancelCollect(item.doctorId)">已关注</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	export default {
		components  : {
			Header
		},
		data() {
			return {
				title: "选择专家",
				id:'',
				deptName:'',
				pageNo:1,
				pageSize:10,
				deptPageNo:1,
				deptPageSize:10,
				deptList:[],
				status:0,
				organizationId:0,
				docList:[],
				deptId : '',
				load_more : true
			}
		},
		onLoad(options) {
			this.organizationId = options.id
			this.loadDept(options.id,this.deptName,this.deptPageNo,this.deptPageSize,)
			this.loadDoc('',this.pageNo,this.pageSize)
		},
		onReachBottom() {
			if(this.load_more){
				console.log(1)
				this.pageNo = this.pageNo+1
				this.loadDoc(this.deptId,this.pageNo,this.pageSize)
			}
		},
		methods: {
			// 获取医生
			loadDoc(deptId,pageNo,pageSize){
				const that = this
				let user_id = uni.getStorageSync('user_info').userId
				// console.log(uni.getStorageSync('user_info').userId)
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.listDoc,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"deptId": deptId,
						"deptName": "",
						"docType": 2,
						// "doctorId": 0,
						// "doctorName": "string",
						// "idCardNo": "string",
						// "nickName": "string",
						// "offset": 0,
						"organizationId" : that.organizationId,
						// "organizationName": "",
						"pageNo": pageNo,
						"pageSize": pageSize,
						// "phone": "",
						"sort": 1,
						// "subDeptIdList": [
						// ],
						"userId": user_id,
						// "userName": "string"
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							let data = res.data.data
							for(let i in data){
								data[i].minPrice = parseFloat(data[i].minPrice/100).toFixed(2)
							}
							if(pageNo>1){
								that.docList = that.docList.concat(data)
								if(data.length==0){
									that.load_more = false
								}
							}else{
								that.docList = data
							}
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			// 获取科室
			loadDept(id,deptName,pageNo,pageSize){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:this.$api.user.listDept,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"deptName": deptName,
						"offset": 0,
						"orgId": id,
						"pageNo": pageNo,
						"pageSize": pageSize,
						"parentCode": ""
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							that.deptList = res.data.data
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			itemClick(){
				console.log('点击跳页')
			},
			collect(e){
				console.log(e)
				const that = this
				uni.request({
					url:this.$api.user.addFollow,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"followId": e,
						"type": 0,
						"userId": uni.getStorageSync('user_info').userId
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							that.loadDoc(that.deptId,that.pageNo,that.pageSize)
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			cancelCollect(e){
				console.log(e)
				const that = this
				uni.request({
					url:this.$api.user.cancelFollowByType,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"followId": e,
						"type": 0,
						"userId": uni.getStorageSync('user_info').userId
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							that.loadDoc(that.deptId,that.pageNo,that.pageSize)
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
	@import "../../static/css/choiseDoc.scss"
</style>
