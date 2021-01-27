<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="top flex_y_center">
			<view v-show="detail.sheetAskListResp.sheetStatus==0">待支付</view>
			<view v-show="detail.sheetAskListResp.sheetStatus==1">待就诊</view>
			<view v-show="detail.sheetAskListResp.sheetStatus==2">进行中</view>
			<view v-show="detail.sheetAskListResp.sheetStatus==3">待评价</view>
			<view v-show="detail.sheetAskListResp.sheetStatus==5">退款/售后</view>
			<!-- <view v-show="detail.sheetPayResp" class="end_time">距离结束还有1小时59分</view> -->
		</view>
		<view class="detail_list">
			<view class="detail_item">
				<view class="di_top flex_y_center">
					<image class="di_nav" :src="detail.sheetAskListResp.docPhoto" mode=""></image>
					<view class="di_name">{{detail.sheetAskListResp.doctorName}}{{detail.sheetAskListResp.doctorTitle}}</view>
					<view class="text_more" v-text="detail.sheetAskListResp.orgName"></view>
					<image class="di_right" src="../../static/images/user3.png" mode=""></image>
					<view v-show="detail.sheetAskListResp.sheetPresTag==1" class="di_status">药</view>
				</view>
				<view class="di_bottom">
					<view class="dib_status" v-text="detail.sheetAskListResp.askType"></view>
					<view class="dib_list">
						<view class="dib_item flex_y_center">
							<view class="title">问诊详情：</view>
							<view class="text_more" v-text="detail.sheetAskListResp.askDetail"></view>
						</view>
						<view class="dib_item flex_y_center">
							<view class="title">就 诊 人：</view>
							<view class="text_more">{{detail.sheetAskListResp.patientName}} {{detail.sheetAskListResp.patientSex}} {{detail.sheetAskListResp.patientAge}}岁</view>
						</view>
						<view class="dib_item flex_y_center">
							<view class="title">问诊时间：</view>
							<view class="text_more" v-text="detail.sheetAskListResp.createTime"></view>
						</view>
					</view>
					<view class="btn_list flex_y_center" v-if="detail.sheetAskListResp.sheetStatus==0">
						<view>￥{{detail.sheetAskListResp.amount}}</view>
						<view class="pay_btn">支付</view>
					</view>
					<view class="btn_list flex_y_center" v-else-if="detail.sheetAskListResp.sheetStatus==1">
						<view>￥{{detail.sheetAskListResp.amount}}</view>
						<view class="btn_box flex">
							<view class="btn_item">开始问诊</view>
							<view class="btn_item">申请退款</view>
						</view>
					</view>
					<view class="btn_list flex_y_center" v-else-if="detail.sheetAskListResp.sheetStatus==2">
						<view>￥{{detail.sheetAskListResp.amount}}</view>
						<view class="pay_btn">进行中</view>
					</view>
				</view>
			</view>
			<view class="detail_item" v-show="detail.sheetPayResp">
				<view class="od_title">订单详情</view>
				<view class="di_bottom" style="padding: 10rpx 0rpx 30rpx 30rpx;">
					<view class="dib_list">
						<view class="dib_item flex_y_center">
							<view class="title">付款方式：</view>
							<view class="dib_center" v-text="detail.sheetPayResp?detail.sheetPayResp.tradePlatform:''"></view>
							<image src="../../static/images/user3.png" mode=""></image>
						</view>
						<view v-show="detail.sheetPayResp" class="dib_item flex_y_center">
							<view class="title">付款时间：</view>
							<view class="dib_center" v-text="detail.sheetPayResp?detail.sheetPayResp.timeEnd:''"></view>
						</view>
						<view class="dib_item flex_y_center">
							<view class="title">订单编号：</view>
							<view class="dib_center text_more" style="width: 380rpx;" v-text="detail.sheetPayResp?detail.sheetPayResp.transactionId:''"></view>
							<view class="dib_right" @click="copy(detail.sheetPayResp.transactionId)">复制</view>
						</view>
					</view>
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
				title: "我的问诊",
				detail : {
					sheetAskListResp:{
						docPhoto : ''
					}
				}
			}
		},
		onLoad(options) {
			this.loadData(options.id)
		},
		methods: {
			loadData(id){
				const that = this
				uni.showLoading({
					title:"正在加载..."
				})
				uni.request({
					url:that.$api.sheetAsk.getDetail,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"sheetId": id,
					},
					success:res=>{
						console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							let data = res.data.data
							data.sheetAskListResp.amount = parseFloat(data.sheetAskListResp.amount/100).toFixed(2)
							that.detail = data
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			copy(e){
				this.$copyText(e).then(
				  res => {
					uni.showToast({
						title:'复制成功！'
					})
				  },
				  err => {
					  uni.showToast({
					  	title:'复制失败！',
						icon:'none'
					  })
				  }
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/myInquiryDetail.scss"
</style>
