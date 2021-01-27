<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<!-- <view class="tab_list flex">
			<view class="tab_item">
				<view class="tab_title active">全部</view>
				<view class="tab_num">1</view>
			</view>
			<view class="tab_item">
				<view class="tab_title">待支付</view>
				<view class="tab_num">1</view>
			</view>
			<view class="tab_item">
				<view class="tab_title">待就诊</view>
				<view class="tab_num">1</view>
			</view>
			<view class="tab_item">
				<view class="tab_title">进行中</view>
				<view class="tab_num">1</view>
			</view>
			<view class="tab_item">
				<view class="tab_title">待评价</view>
				<view class="tab_num">1</view>
			</view>
		</view>
		<view class="inquiry_list">
			<view class="inquiry_item">
				<view class="flex_y_center item_top">
					<image class="inquiry_avt" src="../../static/images/man.png" mode=""></image>
					<view class="inquiry_name">王兵主任医生</view>
					<view class="inquiry_hospital">宁夏医...院-中医骨伤</view>
					<image class="inquiry_right" src="../../static/images/user3.png" mode=""></image>
					<view class="member_status">未开始</view>
				</view>
				<view class="item_bottom">
					<view class="ib_title flex_y_center">
						<view>挂号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊人：</view>
						<view class="text_more">李菲儿 女 28岁</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊号：</view>
						<view class="text_more">17号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊时间：</view>
						<view class="text_more">2020-04-29 08:20:30</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊地址：</view>
						<view class="text_more">岐黄岛王雪主任医生诊室</view>
					</view>
				</view>
				<view class="btn_list flex_y_center">
					<view class="">￥29.00</view>
					<view class="btns">
						<view class="inquiry_btn active">支付</view>
					</view>
				</view>
			</view>
			<view class="inquiry_item">
				<view class="flex_y_center item_top">
					<image class="inquiry_avt" src="../../static/images/man.png" mode=""></image>
					<view class="inquiry_name">王兵主任医生</view>
					<view class="inquiry_hospital">宁夏医...院-中医骨伤</view>
					<image class="inquiry_right" src="../../static/images/user3.png" mode=""></image>
					<view class="member_status">未开始</view>
				</view>
				<view class="item_bottom">
					<view class="ib_title flex_y_center">
						<view>挂号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊人：</view>
						<view class="text_more">李菲儿 女 28岁</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊号：</view>
						<view class="text_more">17号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊时间：</view>
						<view class="text_more">2020-04-29 08:20:30</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊地址：</view>
						<view class="text_more">岐黄岛王雪主任医生诊室</view>
					</view>
				</view>
				<view class="btn_list flex_y_center">
					<view class="">￥29.00</view>
					<view class="btns">
						<view class="inquiry_btn">设置提醒</view>
					</view>
				</view>
			</view>
			<view class="inquiry_item">
				<view class="flex_y_center item_top">
					<image class="inquiry_avt" src="../../static/images/man.png" mode=""></image>
					<view class="inquiry_name">王兵主任医生</view>
					<view class="inquiry_hospital">宁夏医...院-中医骨伤</view>
					<image class="inquiry_right" src="../../static/images/user3.png" mode=""></image>
					<view class="inquiry_yao">药</view>
				</view>
				<view class="item_bottom">
					<view class="ib_title flex_y_center">
						<view>挂号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊人：</view>
						<view class="text_more">李菲儿 女 28岁</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊号：</view>
						<view class="text_more">17号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊时间：</view>
						<view class="text_more">2020-04-29 08:20:30</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊地址：</view>
						<view class="text_more">岐黄岛王雪主任医生诊室</view>
					</view>
				</view>
				<view class="btn_list flex_y_center">
					<view class="">￥29.00</view>
					<view class="btns">
						<view class="inquiry_btn">查看物流</view>
					</view>
				</view>
			</view>
			<view class="inquiry_item">
				<view class="flex_y_center item_top">
					<image class="inquiry_avt" src="../../static/images/man.png" mode=""></image>
					<view class="inquiry_name">王兵主任医生</view>
					<view class="inquiry_hospital">宁夏医...院-中医骨伤</view>
					<image class="inquiry_right" src="../../static/images/user3.png" mode=""></image>
					<view class="member_status">已追问</view>
				</view>
				<view class="item_bottom">
					<view class="ib_title flex_y_center">
						<view>挂号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊人：</view>
						<view class="text_more">李菲儿 女 28岁</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊号：</view>
						<view class="text_more">17号</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊时间：</view>
						<view class="text_more">2020-04-29 08:20:30</view>
					</view>
					<view class="flex_y_center">
						<view class="i_title">就诊地址：</view>
						<view class="text_more">岐黄岛王雪主任医生诊室</view>
					</view>
				</view>
				<view class="btn_list flex_y_center">
					<view class="">￥29.00</view>
					<view class="btns flex_y_center">
						<view class="inquiry_btn">追问医生</view>
						<view class="inquiry_btn active mrl20">待评价</view>
					</view>
				</view>
			</view>
		</view> -->
		<NotData></NotData>
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
				title: "我的挂号"
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/myInquiry.scss"
</style>
