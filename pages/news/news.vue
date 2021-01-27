<template>
	<view class="container">
		<Header :title="title" :status="0"></Header>
		<view class="tab flex">
			<view class="tab_item flex_all_center2" @click="tabClick(1)">
				<image src="../../static/images/news1.png" mode=""></image>
				<view class="tab_txt">提醒</view>
				<!-- <view class="news_num">1</view> -->
			</view>
			<view class="tab_item flex_all_center2" @click="tabClick(2)">
				<image src="../../static/images/news2.png" mode=""></image>
				<view class="tab_txt">挂号消息</view>
				<!-- <view class="news_num">1</view> -->
			</view>
			<view class="tab_item flex_all_center2" >
				<image src="../../static/images/news3.png" mode=""></image>
				<view class="tab_txt">服务</view>
				<!-- <view class="news_num">1</view> -->
			</view>
			<view class="tab_item flex_all_center2" @click="tabClick(4)">
				<image src="../../static/images/news4.png" mode=""></image>
				<view class="tab_txt">药品配送</view>
				<!-- <view class="news_num">1</view> -->
			</view>
		</view>
		<view class="list" v-if="newsList.length>0">
			<view v-for="(item,index) in newsList" :key="index1">
				<navigator v-if="item.businessType==1" hover-class="none" class="item flex_y_center" >
					<image class="news_icon" src="../../static/images/news5.png" mode=""></image>
					<view class="right">
						<view class="flex_y_center">
							<view class="news_name text_more">系统消息</view>
							<view class="news_time" v-text="item.createTime"></view>
						</view>
						<view class="flex_y_center" style="margin-top: 12rpx;">
							<view class="news_tips text_more" >欢迎使用搜大夫诊疗平台，祝您就诊愉快。</view>
							<image src="../../static/images/news8.png" mode=""></image>
						</view>
					</view>
				</navigator>
				<navigator v-else-if="item.businessType==2" hover-class="none" class="item flex_y_center">
					<image class="news_icon" src="../../static/images/news5.png" mode=""></image>
					<view class="right">
						<view class="flex_y_center">
							<view class="news_name text_more">推送消息</view>
							<view class="news_time">19：20</view>
						</view>
						<view class="flex_y_center" style="margin-top: 12rpx;">
							<view class="news_tips text_more">欢迎使用搜大夫诊疗平台，祝您就诊愉快。</view>
							<!-- <image src="../../static/images/news8.png" mode=""></image> -->
						</view>
					</view>
				</navigator>
				<navigator v-else-if="item.businessType==3" hover-class="none" class="item flex_y_center">
					<image class="news_icon" src="../../static/images/news5.png" mode=""></image>
					<view class="right">
						<view class="flex_y_center">
							<view class="news_name text_more">王雪主任医生<text>-宁夏医科大学总医院（中医骨伤科）</text></view>
							<view class="news_time">19：20</view>
						</view>
						<view class="flex_y_center" style="margin-top: 12rpx;">
							<view class="news_tips text_more">欢迎使用搜大夫诊疗平台，祝您就诊愉快。</view>
							<view class="news_status active">进行中</view>
						</view>
					</view>
				</navigator>
				<navigator v-else-if="item.businessType==4" hover-class="none" class="item flex_y_center">
					<image class="news_icon" src="../../static/images/news5.png" mode=""></image>
					<view class="right">
						<view class="flex_y_center">
							<view class="news_name text_more">王雪主任医生<text>-宁夏医科大学总医院（中医骨伤科）</text></view>
							<view class="news_time">19：20</view>
						</view>
						<view class="flex_y_center" style="margin-top: 12rpx;">
							<view class="news_tips text_more">欢迎使用搜大夫诊疗平台，祝您就诊愉快。</view>
							<view class="news_status">已结束</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<NotData v-else></NotData>
		<Footer :status="3"></Footer>
	</view>
</template>

<script>
	import Footer from "../../components/footer/Footer.vue"
	import Header from "../../components/header/Header.vue"
	import NotData from "../../components/notData/NotData.vue"
	export default {
		components  : {
			Header,
			Footer,
			NotData
		},
		data() {
			return {
				title: "消息",
				type : 1,
				pageNo : 1,
				pageSize : 10,
				newsList:[]
			}
		},
		onLoad() {
			this.loadNews(this.type,this.pageNo,this.pageSize)
		},
		methods: {
			tabClick(e){
				this.type = e
				uni.navigateTo({
					url:"newsList?type=" + e
				})
			},
			loadNews(type,pageNo,pageSize){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.message.queryJpushMessageHistory,
					method:'post',
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"businessType": type,
						"pageNo": pageNo,
						"pageSize": pageSize,
						"type": 0
					},
					success:res=>{
						console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							that.newsList = res.data.data
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
	@import "../../static/css/news.scss"
</style>
