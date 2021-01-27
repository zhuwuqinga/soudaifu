<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="top">
			<view class="user_info flex_y_bottom">
				<view class="">
					<view class="user_name" v-text="user_info.nickName"></view>
					<view class="user_age">
						<text v-if="user_info.sex==1">男</text>
						<text v-else-if="user_info.sex==2">女</text>
						<text v-else="user_info.sex==3">保密</text>
						<text style="margin-left: 30rpx;" v-text="user_info.age"></text>
					</view>
				</view>
				<view class="flex_all_center">
					<image src="../../static/images/tijian.png" mode=""></image>
					<view>健康体检</view>
				</view>
			</view>
			<view class="tablist flex">
				<navigator url="caseHistory" hover-class="none" class="tab_item flex_all_center2" style="color: #00BE72;">
					<view v-text="heath_info.countArchive"></view>
					<view>电子病历</view>
				</navigator>
				<navigator url="myDoctor" hover-class="none" class="tab_item flex_all_center2" style="color: #F65C22;">
					<view v-text="heath_info.countDoctor"></view>
					<view>我的医生</view>
				</navigator>
				<view class="tab_item flex_all_center2" style="color: #F69935;">
					<view v-text="'80%'"></view>
					<view>健康信息</view>
				</view>
				<navigator hover-class="none" class="tab_item flex_all_center2" style="color: #29BDCB;">
					<view >0</view>
					<view>取样分析报告</view>
				</navigator>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in heath_info.dtos" :key="index">
				<view class="title flex_y_center">
					<image src="../../static/images/hr_line.png" mode=""></image>
					<text v-text="item.newsName"></text>
				</view>
				<view class="content" v-text="item.content"></view>
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
				title: "健康档案",
				user_info:{},
				heath_info:{}
			}
		},
		onLoad(options) {
			this.loadData()
			this.loaduser()
		},
		methods: {
			loaduser(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.getUser,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							that.user_info = res.data.data
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			loadData(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.healthRecord.listAll,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							that.heath_info = res.data.data
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
	@import "../../static/css/healthRecord.scss"
</style>
