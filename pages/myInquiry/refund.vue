<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
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
					
				</view>
			</view>
			<view class="detail_item" v-show="detail.sheetPayResp">
				<view class="od_title flex_y_center">
					<view>订单详情</view>
					<picker :range="refundDescList" @change="getRefundDesc">
						<view>{{refundDesc}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="di_bottom" style="padding: 40rpx 0rpx 30rpx 40rpx;">
					<view class="flex">
						<view>退款金额：</view>
						<view class="dib_right">
							<view style="color: #F7610B;">￥29.00</view>
							<view class="dibr_tips">不可修改，最多￥29.00，含发货邮费￥0.00</view>
						</view>
					</view>
					<view class="flex" style="margin-top: 20rpx;">
						<view>退款金额：</view>
						<input type="text" value="" placeholder="选填" />
					</view>
				</view>
			</view>
			<view class="detail_item" v-show="detail.sheetPayResp">
				<view class="od_title flex_y_center">
					<view>上传凭证</view>
				</view>
				<view class="di_bottom flex_wrap" style="padding: 20rpx 40rpx 40rpx 40rpx">
					<view class="img_item">
						<image src="../../static/images/ad1.jpg" mode=""></image>
					</view>
					<view class="img_item">
						<image src="../../static/images/ad1.jpg" mode=""></image>
					</view>
					<view class="img_item">
						<image src="../../static/images/ad1.jpg" mode=""></image>
					</view>
					<view class="flex_all_center2">
						<image src="../../static/images/upload2.png" mode=""></image>
						<view>上传凭证（最多6张）</view>
					</view> 
				</view>
			</view>
		</view>
		<view class="btn flex_all_center">
			<view @click="confirm">确认</view>
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
				},
				refundDescList:[],
				refundDesc : '请选择退款原因'
			}
		},
		onLoad(options) {
			this.loadData(options.id)
			this.loadListRefundDesc()
		},
		methods: {
			getRefundDesc(e){
				console.log(e)
				this.refundDesc = this.refundDescList[e.detail.value]
			},
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
						// console.log(res)
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
			loadListRefundDesc(){
				const that = this
				uni.showLoading({
					title:"正在加载..."
				})
				uni.request({
					url:that.$api.user.listRefundDesc,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					success:res=>{
						console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							that.refundDescList = res.data.data
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
	@import "../../static/css/refund.scss"
</style>
