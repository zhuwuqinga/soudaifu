<template>
	<view class="footer flex">
		<navigator hover-class="none" open-type="reLaunch" url="/pages/index/index" class="footer_item flex_all_center2">
			<view class="flex_all_center">
				<image v-if="status==1" style="width: 38rpx;height: 40rpx;" src="../../static/images/footer/index_act.png" mode=""></image>
				<image v-else style="width: 38rpx;height: 40rpx;" src="../../static/images/footer/index.png" mode=""></image>
			</view>
			<view :class="status==1?'f_txt active':'f_txt'">首页</view>
		</navigator>
		<navigator hover-class="none" open-type="redirect" url="/pages/health/health" class="footer_item flex_all_center2">
			<view class="flex_all_center">
				<image v-if="status==2" style="width: 36rpx;height: 38rpx;" src="../../static/images/footer/health_act.png" mode=""></image>
				<image v-else style="width: 36rpx;height: 38rpx;" src="../../static/images/footer/health.png" mode=""></image>
			</view>
			<view :class="status==2?'f_txt active':'f_txt'">健康</view>
		</navigator>
		<navigator hover-class="none" open-type="redirect" url="/pages/news/news" class="footer_item flex_all_center2">
			<view class="flex_all_center">
				<image v-if="status==3" style="width: 36rpx;height: 36rpx;" src="../../static/images/footer/news_act.png" mode=""></image>
				<image v-else style="width: 36rpx;height: 36rpx;" src="../../static/images/footer/news.png" mode=""></image>
			</view>
			<view :class="status==3?'f_txt active':'f_txt'">消息</view>
		</navigator>
		<navigator hover-class="none" open-type="redirect" url="/pages/user/user" class="footer_item flex_all_center2">
			<view class="flex_all_center">
				<image v-if="status==4" style="width: 34rpx;height: 38rpx;" src="../../static/images/footer/my_act.png" mode=""></image>
				<image v-else style="width: 34rpx;height: 38rpx;" src="../../static/images/footer/my.png" mode=""></image>
			</view>
			<view :class="status==4?'f_txt active':'f_txt'">我的</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			status : Number
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
</style>
