<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="case_top">
			<swiper @change="swiperChange" class="banner" :indicator-dots="true" indicator-active-color="#00BE72" indicator-color="#ffffff" >
				<swiper-item v-for="(item,index) in paientList" :key="index">
					<view class="swiper_item">
						<view class="flex_y_center">
							<view v-text="item.patientName"></view>
							<navigator class="flex_all_center" hover-class="none" url="/pages/patient/patient">
								<image src="../../static/images/edit1.png" mode=""></image>
							</navigator>
						</view>
						<view class="sexText">
							<text v-text="item.sexText"></text>
							<text style="margin-left: 20rpx;" v-text="item.age+'岁'"></text>
							<text style="margin-left: 20rpx;" v-text="item.patientPhone"></text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="list">
			<view class="item flex" v-for="(item,index) in docList" :key="index">
				<image class="left" :src="item.docPhoto" mode=""></image>
				<view class="right">
					<view class="flex_y_center">
						<view class="flex_y_bottom">
							<view v-text="item.doctorName"></view>
							<view class="level" v-text="item.titleName"></view>
						</view>
						<view class="flex_all_center">
							<image v-show="item.followTag==0" src="../../static/images/collect2.png" mode=""></image>
							<view>{{item.followTag==0?'关注':'已关注'}}</view>
						</view>
					</view>
					<view class="org_name">{{item.organizationName}}-{{item.deptName}}</view>
					<view class="flex_all_center hosp_level">
						<image src="../../static/images/hosp_level.png" mode=""></image>
						<view v-show="item.organizationLevel==1">一甲</view>
						<view v-show="item.organizationLevel==2">二甲</view>
						<view v-show="item.organizationLevel==3">三甲</view>
					</view>
					<view class="ask_num">
						<text>问诊量{{item.askNum}}</text>
						<text style="margin-left: 30rpx;">最近就诊日期：{{item.createTime.split(' ')[0]}}</text>
					</view>
					<view class="btn" @click="navDoc(item.doctorId)">联系医生</view>
				</view>
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
				title: "我的医生",
				paientList : [],
				patientId:'',
				docList:[]
			}
		},
		onLoad(options) {
			this.loadPaient()
		},
		onShow() {
			
		},
		methods: {
			navDoc(e){
				uni.navigateTo({
					url:'/pages/consultingRoom/consultingRoom?id='+e
				})
			},
			swiperChange(e){
				this.patientId = this.paientList[e.detail.current].patientId
				this.loadDoctor(this.patientId)
			},
			
			loadPaient(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.patient_list,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"userId": uni.getStorageSync('user_info').userId,
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							that.paientList = res.data.data
							that.patientId = res.data.data[0].patientId
							that.loadDoctor(res.data.data[0].patientId)
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			// 问诊记录
			loadDoctor(patientId,docName){
				const that = this
				uni.request({
					url:that.$api.healthRecord.listDoctor,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"patientId": patientId
					},
					success:res=>{
						// console.log(res)
						if(res.data.status==200){
							that.docList = res.data.data
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
	@import "../../static/css/myDoctor.scss"
</style>
