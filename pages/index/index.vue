<template>
	<view class="container">
		<view class="header flex_y_center">
			<image class="header_address" src="../../static/images/header_address.png" mode=""></image>
			<view class="header_picker">
				<view class="text_more">{{address}}</view>
				<image src="../../static/images/index_open_icon.png" mode=""></image>
			</view>
			<view class="header_search flex_y_center">
				<image src="../../static/images/index_search_icon.png" mode=""></image>
				<input type="text" value="" placeholder="请输入" placeholder-class="place_holder"/>
			</view>
			<image src="../../static/images/index_scan_icon.png" class="header_sm" mode=""></image>
			<image src="../../static/images/index_service_icon.png" class="header_contact" mode=""></image>
		</view>
		<view class="flex_y_center welcome">
			<navigator hover-class="none" class="flex_y_center" >
				<view v-text="orgDetail.organizationName"></view>
				<image v-show="orgList.length>1" src="../../static/images/list_into_icon2.png" mode=""></image>
			</navigator>
			<view class="wel_txt">欢迎您</view>
		</view>
		<view class="banner">
			<!-- <view class="tips">宁夏 银川 张*云 购买问诊</view> -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#ffffff">
				<swiper-item v-for="item in banner" :key="item.id">
					<navigator hover-class="none" :url="item.path" class="swiper-item">
						<image :src="item.picUrl" mode=""></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="flex ad_list">
			<navigator hover-class="none" :url="'/pages/choiseDoc/choiseDoc?id='+orgDetail.organizationId">
				<image src="../../static/images/ad1.jpg" mode=""></image>
			</navigator>
			<view style="margin-left: auto;" @click="gh_tips">
				<image src="../../static/images/ad2.jpg" mode=""></image>
			</view>
			<!-- <navigator style="margin-left: auto;" :url="'/pages/registration/registration?id='+orgDetail.organizationId+'&name='+orgDetail.organizationName" hover-class="none">
				<image src="../../static/images/ad2.jpg" mode=""></image>
			</navigator> -->
		</view>
		<view class="server">
			<view class="s_title flex_all_center">
				<view>特色服务</view>
				<view class="s_circle"></view>
			</view>
			<view class="server_list flex">
				<navigator url="/pages/recomDoctor/recomDoctor?id=5" hover-class="none" class="flex_all_center2">
					<image src="../../static/images/server1.jpg" mode=""></image>
					<view>推荐医生</view>
				</navigator>
				<navigator url="/pages/recomDoctor/recomDoctor?id=6" hover-class="none" class="flex_all_center2">
					<image src="../../static/images/server2.jpg" mode=""></image>
					<view>优势病种</view>
				</navigator>
				<navigator url="/pages/recomDoctor/recomDoctor?id=7" hover-class="none" class="flex_all_center2">
					<image src="../../static/images/server3.jpg" mode=""></image>
					<view>特色服务</view>
				</navigator>
				<navigator url="/pages/recomDoctor/recomDoctor?id=8" hover-class="none" class="flex_all_center2">
					<image src="../../static/images/server4.jpg" mode=""></image>
					<view>设备设施</view>
				</navigator>
			</view>
		</view>
		<view class="server">
			<navigator url="/pages/special/special?id=11" hover-class="none" class="s_title flex_all_center">
				<view>专家专刊</view>
				<view class="s_circle"></view>
			</navigator>
			<view class="news_list">
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
		<view class="server">
			<navigator url="/pages/special/special?id=13" hover-class="none" class="s_title flex_all_center">
				<view>健康课堂</view>
				<view class="s_circle"></view>
			</navigator>
			<view class="news_list">
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
		<Footer :status="1"></Footer>
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
				address:'银川市',
				banner : [],
				special : {
					infoName : ''
				},
				classroom:{
					infoName : ''
				},
				orgList:[],
				orgDetail:{
					organizationName : '',
					organizationId:''
				}
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('user_info'))
		},
		onShow() {
			this.loadExpert()
			this.loadClassRoom()
			this.loadUserOrg()
		},
		methods: {
			// 获取机构
			loadUserOrg(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.listUserOrg,
					method:'post',
					header:{
						"token" : uni.getStorageSync('user_info').token,
						'Content-Type': 'application/json',
						'Authorization': localStorage.authorization
					},
					data:{
						"area": "",
						"city": "",
						"offset": 0,
						"orgName": "",
						"pageNo": 1,
						"pageSize": 10,
						"province": "",
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						// console.log(res)
						if(res.data.status==200){
							that.orgList = res.data.data
							that.orgDetail = res.data.data[0]
							that.loadbanner(res.data.data[0].organizationId)
							uni.setStorageSync('organizationId',res.data.data[0].organizationId)
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
				uni.request({
					url:that.$api.healty.listBanner,
					method:'post',
					data:{
						"bannerLocation": 0,
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
			},
			gh_tips(){
				uni.showModal({
					title:"提示",
					content:"敬请期待！",
					showCancel:false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/index.scss"
</style>
