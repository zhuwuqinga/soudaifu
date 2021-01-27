<template>
	<view class="container">
		<view class="header flex_y_center">
			<view class="flex_y_center">
				<image src="../../static/images/index_search_icon.png" mode=""></image>
				<input type="text" value="" placeholder="请输入..." placeholder-class="place_holder"/>
			</view>
			<image class="header_news" src="../../static/images/header_news.png" mode=""></image>
		</view>
		<scroll-view scroll-x="true" class="tab">
			<view class="tab_item active">推荐</view>
			<!-- <view class="tab_item ">最新</view>
			<view class="tab_item ">话题</view>
			<view class="tab_item ">圈子</view> -->
		</scroll-view>
		<swiper class="banner" indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#ffffff" :autoplay="true" :interval="5000" :duration="1000" :circular="true">
			<swiper-item v-for="item in banner" :key="item.id">
				<navigator hover-class="none" :url="item.path" class="swiper-item">
					<image :src="item.picUrl" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="health_list">
			<view class="title flex_y_center">
				<view>权威期刊</view>
				<navigator hover-class="none" url="/pages/quanwei/quanwei" class="more">更多</navigator>
			</view>
			<navigator hover-class="none" class="detail article" :url="'/pages/articleDetail/articleDetail?url='+periodical.h5Url+'&name='+periodical.infoName">
				<view class="flex_y_center">
					<view class="text_more" v-text="periodical.infoName"></view>
					<view class="watch_num" v-text="periodical.readTime+'浏览'"></view>
				</view>
				<view class="d_content" v-text="periodical.shortContent"></view>
			</navigator>
		</view>
		<view class="health_list">
			<view class="title flex_y_center">
				<view>热门话题</view>
				<navigator hover-class="none" url="/pages/hotList/hotList" class="more">更多</navigator>
			</view>
			<view class="hot">
				<scroll-view scroll-x="true" class="hot_list flex_y_center">
					<navigator :url="'/pages/hotDetail/hotDetail?id='+item.id" hover-class="none" class="hot_item" v-for="item in hotList" :key="item.id">
						<image :src="item.picUrl" mode=""></image>
						<view class="hot_detail">
							<view class="text_more" v-text="item.hotName">本草纲目辩证</view>
							<view class="watch_num" v-text="item.readTime+'浏览'"></view>
						</view>
					</navigator>
				</scroll-view>
			</view>
		</view>
		<view class="health_list">
			<view class="title flex_y_center">
				<view>专家专刊</view>
				<navigator hover-class="none" url="/pages/special/special?id=11" class="more">更多</navigator>
			</view>
			<view class="detail news_list">
				<navigator :url="'/pages/articleDetail/articleDetail?url='+special.h5Url+'&name='+special.infoName" hover-class="none" class="news_item flex_y_center">
					<view class="ni_left">
						<view class="text_more2" v-text="special.infoName"></view>
						<view class="flex_y_center">
							<view class="docter_name">
								<text v-text="special.authorLevel?special.authorLevel:''"></text>
								<text style="margin-left: 20rpx;" v-text="special.authorName?special.authorName:''"></text>
							</view>
							<view class="flex_y_center">
								<image src="../../static/images/watch_num.png" mode=""></image>
								<view class="" v-text="special.readTime"></view>
							</view>
						</view>
					</view>
					<image class="ni_right" :src="special.coverPicUrl" mode=""></image>
				</navigator>
			</view>
		</view>
		<view class="health_list">
			<view class="title flex_y_center">
				<view>健康课堂</view>
				<navigator hover-class="none" url="/pages/special/special?id=13" class="more">更多</navigator>
			</view>
			<view class="detail news_list">
				<navigator :url="'/pages/articleDetail/articleDetail?url='+classroom.h5Url+'&name='+classroom.infoName" hover-class="none" class="news_item flex_y_center">
					<view class="ni_left">
						<view class="text_more2" v-text="classroom.infoName"></view>
						<view class="flex_y_center">
							<view class="docter_name">
								<text v-text="classroom.authorLevel?classroom.authorLevel:''"></text>
								<text style="margin-left: 20rpx;" v-text="classroom.authorName?classroom.authorName:''"></text>
							</view>
							<view class="flex_y_center">
								<image src="../../static/images/watch_num.png" mode=""></image>
								<view class="" v-text="classroom.readTime"></view>
							</view>
						</view>
					</view>
					<image class="ni_right" :src="classroom.coverPicUrl" mode=""></image>
				</navigator>
			</view>
		</view>
		<Footer :status="2"></Footer>
	</view>
</template>

<script>
	import Footer from "../../components/footer/Footer.vue"
	export default {
		components  : {
			Footer
		},
		data() {
			return {
				banner : [],
				special : {
					infoName : ''
				},
				classroom:{
					infoName : ''
				},
				periodical:{
					infoName : ''
				},
				hotList : [],
				pageNo:1,
				pageSize:10,
			}
		},
		onLoad() {
			this.loadbanner()
		},
		onShow() {
			this.loaddata(this.pageNo,this.pageSize)
			this.loadExpert()
			this.loadClassRoom()
			this.loadPeriodical()
		},
		onPullDownRefresh() {

		},
		methods: {
			// 获取热门话题
			loaddata(pageNo,pageSize) {
				uni.showLoading({
					title: '正在加载中...'
				})
				uni.request({
					url: this.$api.healty.listHot,
					method: 'post',
					data: {
						"hotName": '',
						"offset": 0,
						"pageNo": pageNo,
						"pageSize": pageSize
					},
					success: res => {
						uni.hideLoading()
						if(res.data.status==200){
							this.hotList = res.data.data
						}else{
							uni.showToast({
								title:res.data.msg,
								icon: 'none'
							})
						}
					}
				})
			},
			// 获取banner图
			loadbanner(){
				uni.request({
					url:this.$api.healty.listBanner,
					method:'post',
					data:{
						"bannerLocation": 1,
						"orgId": uni.getStorageSync('organizationId'),
						"platform": 0
					},
					success:res=>{
						if(res.data.status==200){
							this.banner = res.data.data
						}
					}
				})
			},
			// 获取权威期刊
			loadPeriodical(){
				uni.request({
					url:this.$api.healty.getPeriodical,
					method:'get',
					success:res=>{
						if(res.data.status==200){
							this.periodical = res.data.data
							this.periodical.infoName = res.data.data.infoName
						}
					}
				})
			},
			// 获取专家专刊
			loadExpert(){
				uni.request({
					url:this.$api.healty.getExpertInfo,
					method:'post',
					data:{
						"infoType": 11
					},
					success:res=>{
						if(res.data.status==200){
							this.special = res.data.data
							this.special.infoName = res.data.data.infoName
						}
					}
				})
			},
			// 获取专家课堂
			loadClassRoom(){
				uni.request({
					url:this.$api.healty.getAuscultation,
					method:'post',
					data:{
						"infoType": 13
					},
					success:res=>{
						if(res.data.status==200){
							this.classroom = res.data.data
							this.classroom.infoName = res.data.data.infoName
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/health.scss"
</style>
