<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="top">
			<view class="tab flex">
				<view class="tab_item"><text class="active">待提醒</text></view>
				<view class="tab_item"><text>已失效</text></view>
			</view>
			<view class="t_picker">
				<picker>
					<view>待提醒：全部</view>
					<image src="../../static/images/index_open_icon.png" mode=""></image>
				</picker>
			</view>
		</view>
		<view class="list" v-if="remindList.length>0">
			<view class="item">
				<view class="i_top flex_y_center active">
					<image src="../../static/images/warning.png" mode=""></image>
					<view>有号提醒</view>
				</view>
				<view class="i_content">
					<view class="ic_item flex_y_center ">
						<view style="font-size: 28rpx;">王雪</view>
						<view style="color: #666;">宁夏医科大学总医院-中医骨伤科</view>
					</view>
					<!-- <view class="ic_item">截止时间：2020-04-29 08：30-09：00</view> -->
					<view class="ic_item flex_y_center">
						<view class="ici_left">就诊人</view>
						<view class="ici_right">李菲儿 28岁 女 138****5954</view>
					</view>
					<view class="ic_item flex_y_center">
						<view class="ici_left">预约详情</view>
						<view class="ici_right">2020-03-25（星期三）08：30-09：00</view>
					</view>
					<view class="ic_item flex_y_center">
						<view class="ici_left">提醒方式</view>
						<view class="ici_right">循环-语音播报</view>
					</view>
					<!-- <view class="flex_y_center btn_box">
						<view >拼命找号中</view>
						<view>等待被叫号  2天14个小时后开始</view>
						<view class="btn">取消</view>
					</view> -->
					<view class="flex_y_center btn_box2">
						<view>已提醒1次/已过期</view>
						<view class="btn">取消</view>
					</view>
				</view>
			</view>
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
				title: "我的提醒",
				remindList : []
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/myWarning.scss"
</style>
