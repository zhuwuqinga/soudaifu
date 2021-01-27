<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<!-- <view class="tab flex">
			<view :class="tabIndex==0?'tab_item active':'tab_item'" @click="tabClick(0)">
				<view class="num">1</view>
				<text>医生</text>
			</view>
			<view :class="tabIndex==1?'tab_item active':'tab_item'" @click="tabClick(1)">
				<view class="num">1</view>
				<text>用户</text>
			</view>
			<view :class="tabIndex==2?'tab_item active':'tab_item'" @click="tabClick(2)">
				<text>商品</text>
			</view>
			<view :class="tabIndex==3?'tab_item active':'tab_item'" @click="tabClick(3)">
				<text>服务</text>
			</view>
		</view> -->
		<view class="list" v-if="followList.length>0">
			<view class="doc_item flex" v-for="(item,index) in followList" :key="index">
				<image class="di_left" :src="item.docPhoto" mode=""></image>
				<view class="di_right">
					<view class="flex_y_center doc_name">
						<view>{{item.doctorName}} <text v-text="item.titleName"></text></view> 
						<view class="collect_status">已关注</view>
					</view>
					<view class="doc_hosp" v-text="item.organizationName"></view>
					<view class="doc_level flex_y_center">
						<image src="../../static/images/hosp_level.png" mode=""></image>
						<view v-show="item.organizationLevel==1">一甲</view>
						<view v-show="item.organizationLevel==1">二甲</view>
						<view v-show="item.organizationLevel==3">三甲</view>
					</view>
					<view class="see_num" v-text="'问诊量'+item.askNum"></view>
					<navigator :url="'/pages/consultingRoom/consultingRoom?id='+item.doctorId" hover-class="none" class="btn">进入诊室</navigator>
				</view>
			</view>
			<!-- <view class="doc_item flex">
				<view class="flex_y_center">
					<image class="di_left" src="../../static/images/man.png" mode=""></image>
					<view class="ui_right">
						<view class="doc_name">
							<view>何玲 <text>主任医生</text></view> 
						</view>
						<view class="ui_address">内蒙古  赤峰</view>
					</view>
				</view>
				<view class="collect_status">已关注</view>
			</view> -->
		</view>
		<NotData v-else></NotData>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	import NotData from "../../components/notData/NotData.vue"
	export default {
		components  : {
			Header,
			NotData
		},
		data() {
			return {
				title: "关注收藏",
				tabIndex:0,
				followList:[]
			}
		},
		onLoad() {
			this.loadData(1,10,0)
		},
		methods: {
			tabClick(e){
				this.tabIndex = e
				this.loadData(1,10,e)
			},
			loadData(pageNo,pageSize,type){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:this.$api.user.followList,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"pageNo": pageNo,
						"pageSize": pageSize,
						"type": type,
						"userId": uni.getStorageSync('user_info').userId
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							that.followList = res.data.data
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
	@import "../../static/css/myCollect.scss"
</style>
