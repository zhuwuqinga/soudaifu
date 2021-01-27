<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<view class="item flex_y_center">
				<view>机构</view>
				<view style="margin-left: auto;">宁夏医科大学总医院</view>
			</view>
			<view class="item flex_y_center">
				<view>科室</view>
				<view style="margin-left: auto;">中医科-中医骨伤科</view>
			</view>
			<view class="item flex_y_center">
				<view>医生</view>
				<view style="margin-left: auto;">王雪</view>
			</view>
			<view class="item flex_y_center">
				<view>日期</view>
				<view style="margin-left: auto;">2020-03-18（星期三）08：30-09：00</view>
			</view>
			<view class="item flex_y_center">
				<view>就诊方式</view>
				<view style="margin-left: auto;">到实体医院就诊</view>
			</view>
		</view>
		<view class="info_box flex_all_center">
			<view class="line_box">
				<view></view>
				<view style="margin-top: 10rpx;"></view>
			</view>
			<view class="info_title">就诊人信息</view>
			<view class="line_box">
				<view></view>
				<view style="margin-top: 10rpx;"></view>
			</view>
		</view>
		<view class="list2">
			<view class="flex_y_center">
				<view>姓名</view>
				<view style="margin-left: auto;">李颖</view>
			</view>
			<view class="flex_y_center">
				<view>身份证号</view>
				<view style="margin-left: auto;">650***********5454</view>
			</view>
			<view class="flex_y_center">
				<view>手机号</view>
				<view style="margin-left: auto;">185****6626</view>
			</view>
		</view>
		<view class="tips">
			<view>温馨提示：</view>
			<view>1.请尽快支付，保证抢到预约号源。</view>
			<view>2.挂号失败，可选择重新抢号。</view>
			<view>3.挂号失败但已付款的，请在“我的订单“中长看看退费情况。</view>
		</view>
		<view class="btn_box">
			<view class="flex_all_center" @click="confirm">
				<view class="">确认</view>
			</view>
		</view>
		<view class="cups" style="display: none;">
			<view class="cup_box">
				<view class="pay_box">
					<view class="pay_item flex_y_center">
						<view class="flex_all_center">
							<image style="width: 48rpx;height: 38rpx;" src="../../static/images/wx_pay.png" mode=""></image>
						</view>
						<view>微信支付</view>
						<view class="pay_price">￥19.00</view>
					</view>
					<view class="pay_item flex_y_center">
						<view class="flex_all_center">
							<image style="width: 46rpx;height: 46rpx;" src="../../static/images/zfb_icon.png" mode=""></image>
						</view>
						<view>支付宝支付</view>
						<view class="pay_price">￥19.00</view>
					</view>
				</view>
				<view class="cancel">取消</view>
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
				title: "确认挂号"
			}
		},
		onLoad() {

		},
		methods: {
			confirm(){
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/confirmNum.scss";
</style>
