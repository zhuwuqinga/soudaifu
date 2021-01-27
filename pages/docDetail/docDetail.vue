<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="doc_info flex">
			<image class="left" :src="docDetail.docPhoto" mode=""></image>
			<view class="right">
				<view class="flex_y_center">
					<view class="name" v-text="docDetail.doctorName"></view>
					<view class="doc_level" v-text="docDetail.titleName">主任医生</view>
					<view class="collect">关注</view>
				</view>
				<view class="hospital" v-text="docDetail.organizationName"></view>
				<view class="hosp_level flex_all_center">
					<image src="../../static/images/hosp_level.png" mode=""></image>
					<view class="" v-show="docDetail.organizationLevel==1">一甲</view>
					<view class="" v-show="docDetail.organizationLevel==2">二甲</view>
					<view class="" v-show="docDetail.organizationLevel==3">三甲</view>
				</view>
				<view class="flex_y_center see_num">
					<view v-text="'问诊量 '+docDetail.askNum"></view>
					<navigator hover-class="none" class="flex_all_center">
						<image src="../../static/images/rili.png" mode=""></image>
						<view>排班表</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="tzq flex_y_center">
				<image src="../../static/images/tzq.png" mode=""></image>
				<view>开通家庭医生，尊享在家随时问诊</view>
			</view>
			<view class="doctor_detail">
				<view class="dd_list">
					<view class="dd_title">擅长疾病</view>
					<view class="dd_content" v-text="doctxt.professional"></view>
				</view>
				<view class="dd_list">
					<view class="dd_title">个人简介</view>
					<view class="dd_content" v-text="doctxt.personalProfile"></view>
				</view>
				<view class="dd_list">
					<view class="dd_title">论文专著</view>
					<view class="dd_content">《少儿哮喘缓解期的中医治疗分析》（《现代中医》201608期）</view>
				</view>
			</view>
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
				title: "",
				docDetail: {
					avatar:'',
					doctorName:'',
					titleName:''
				},
				doctxt:{
					personalProfile : '', 
					professional : ''
				}
			}
		},
		onLoad(options) {
			this.loadDoc(options.id)
			this.loadDocDetail(options.id)
		},
		methods: {
			// 获取医生
			loadDoc(id){
				const that = this
				let user_id = uni.getStorageSync('user_info').userId
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.getDoc,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"doctorId": id,
						"userId": user_id
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							that.docDetail = res.data.data
							that.title = res.data.data.doctorName+res.data.data.titleName
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			loadDocDetail(id){
				const that = this
				let user_id = uni.getStorageSync('user_info').userId
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.getProfile,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"doctorId": id
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							that.doctxt = res.data.data
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
	@import "../../static/css/consultingRoom.scss";
	.doc_info{
		padding: 20px 15px 20px 15px;
	}
	.content{
		top: 0px;
	}
	.doctor_detail{
		width: 100%;
		background: #fff;
		border-radius: 10rpx;
		.dd_list{
			padding: 40rpx;
			.dd_title{
				font-size: 28rpx;
				font-weight: bold;
			}
			.dd_content{
				font-size: 26rpx;
				line-height: 40rpx;
				margin-top: 20rpx;
			}
		}
	}
	.doctor_detail .dd_list:not(:last-child){
		border-bottom : 1rpx solid #eee;
	}
</style>
