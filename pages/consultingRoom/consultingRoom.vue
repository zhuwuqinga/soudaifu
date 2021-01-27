<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="doc_info flex">
			<image class="left" :src="docDetail.docPhoto" mode=""></image>
			<view class="right">
				<view class="flex_y_center">
					<view class="name" v-text="docDetail.doctorName"></view>
					<view class="doc_level" v-text="docDetail.titleName">主任医生</view>
					<view class="collect" v-if="docDetail.followTag==1">已关注</view>
					<view class="collect" v-else>关注</view>
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
			<navigator hover-class="none" :url="'/pages/docDetail/docDetail?id='+docDetail.doctorId" class="doc_detail">
				<text style="font-weight: bold;color: #333;">擅长：</text>
				<text v-text="docDetail.professional"></text>
				<text style="color: #00BE72;margin-left: 10rpx;">医生信息</text>
			</navigator>
			<view class="tzq flex_y_center">
				<image src="../../static/images/tzq.png" mode=""></image>
				<view>开通家庭医生，尊享在家随时问诊</view>
			</view>
			<view class="act_list flex">
				<navigator :url="'/pages/choiseDoc/choiseDoc?id='+docDetail.organizationId" hover-class="none" class="flex_all_center2">
					<view class="al_title" style="color: #27A666;">问诊</view>
					<view class="al_tips">图文/语音/视频</view>
					<image src="../../static/images/circle1.png" mode=""></image>
				</navigator>
				<view style="margin-left: auto;" @click="gh_tips" class="flex_all_center2">
					<view class="al_title" style="color: #EE9700;">挂号</view>
					<view class="al_tips">到院就诊</view>
					<image src="../../static/images/circle2.png" mode=""></image>
				</view>
			</view>
			<view class="doc_class">
				<view class="dc_title">专家课堂</view>
				<swiper :autoplay="true" :interval="3000" :duration="1000" :circular="true">
					<swiper-item v-for="(item,index) in banner" :key="index">
						<view class="swiper-item">
							<image :src="item.picUrl" mode=""></image>
							<view class="doc_tips">直播</view>
							<view class="doc_time">时间：2020年3月26日  18：00-：20：00</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="doc_class" style="margin-top: 20rpx;" v-if="articleList.length>0">
				<view class="dc_title">专家文章</view>
				<view class="article_list">
					<navigator v-for="(item,index) in articleList" :key="index" url="" hover-class="none" class="article_item">
						<view class="text_more" v-text="item.articleTitle"></view>
						<view class="text_more2" v-text="item.articleText"></view>
						<view class="flex_y_center">
							<view class="" v-text="item.createTime"></view>
							<view class="flex_y_center">
								<image src="../../static/images/watch_num.png" mode=""></image>
								<view class="" v-text="item.readTimes"></view>
							</view>
						</view>
					</navigator>
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
				pageNo:1,
				pageSize:10,
				articleList:[],
				banner:[]
			}
		},
		onLoad(options) {
			this.loadDoc(options.id)
			this.loadArticle(options.id,this.pageNo,this.pageSize)
		},
		methods: {
			gh_tips(){
				uni.showModal({
					title:"提示",
					content:"敬请期待！",
					showCancel:false
				})
			},
			
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
							that.loadbanner(res.data.data.organizationId)
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			// 获取banner图
			loadbanner(organizationId){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.healty.listBanner,
					method:'post',
					data:{
						"bannerLocation": 2,
						"orgId": organizationId,
						"platform": 0
					},
					success:res=>{
						uni.hideLoading()
						if(res.data.status==200){
							this.banner = res.data.data
						}
					}
				})
			},
			
			loadArticle(id,pageNo,pageSize){
				const that = this
				let user_id = uni.getStorageSync('user_info').userId
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.listDoctorArticle,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"offset": 0,
						"doctorId": id,
						"pageNo": pageNo,
						"pageSize": pageSize
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							that.articleList = res.data.data
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
	@import "../../static/css/consultingRoom.scss"
</style>
