<template>
	<view class="container">
		<view class="header flex_y_center">
			<navigator style="margin-left: auto;" url="setUser">
				<image class="set" src="../../static/images/user1.png" mode=""></image>
			</navigator>
		</view>
		<view class="user_top">
			<view class="user_info flex_y_center" v-if="user_info.nickName==null">
				<image class="header_img" src="../../static/images/header.png" mode=""></image>
				<navigator url="/pages/login/login" hover-class="none" class="login_nav flex_y_center">
					<view>登录/注册</view>
					<image src="../../static/images/user2.png" mode=""></image>
				</navigator>
			</view>
			<view class="user_info flex_y_center" v-else>
				<image class="header_img" :src="user_info.headImg?user_info.headImg:'../../static/images/header.png'" mode=""></image>
				<view class="nickName" v-text="user_info.nickName"></view>
				<view class="sex" v-if="user_info.sex==1">男</view>
				<view class="sex" v-else-if="user_info.sex==2">女</view>
				<view class="sex" v-else="user_info.sex==3">保密</view>
				<view class="age" v-text="user_info.age+'岁'"></view>
				<navigator hover-class="none" url="" class="flex_y_center">
					<image class="qrcode_icon" src="../../static/images/sz_ewm_icon.png"></image>
					<image class="icon_right" src="../../static/images/user2.png" mode=""></image>
				</navigator>
			</view>
			<view class="num_list flex">
				<view class="num_item flex_all_center2">
					<view>--</view>
					<view>钱包</view>
				</view>
				<view class="num_item flex_all_center2">
					<view>--</view>
					<view>优惠券</view>
				</view>
				<view class="num_item flex_all_center2">
					<view>--</view>
					<view>关注医生</view>
				</view>
			</view>
		</view>
		<view class="quanyi">
			<view>家庭医生权益</view>
			<view class="qy_tips">24小时随时问诊，挂号优先，专家优先问诊</view>
		</view>
		<view class="order_list">
			<navigator hover-class="none" class="flex_y_bottom">
				<view>订单列表</view>
				<view class="flex_y_center">
					<view>查看全部订单</view>
					<image src="../../static/images/user3.png" mode=""></image>
				</view>
			</navigator>
			<view class="icon_list flex">
				<navigator url="/pages/myInquiry/myInquiry" hover-class="none" class="icon_item flex_all_center2">
					<view class="flex_all_center">
						<image style="width: 44rpx;height: 44rpx;" src="../../static/images/user4.png" mode=""></image>
					</view>
					<view>问诊</view>
				</navigator>
				<navigator url="/pages/myMember/myMember" hover-class="none" class="icon_item flex_all_center2">
					<view class="flex_all_center">
						<image style="width: 40rpx;height: 44rpx;" src="../../static/images/user5.png" mode=""></image>
					</view>
					<view>挂号</view>
				</navigator>
				<navigator hover-class="none" class="icon_item flex_all_center2">
					<view class="flex_all_center">
						<image style="width: 48rpx;height: 48rpx;" src="../../static/images/user6.png" mode=""></image>
					</view>
					<view>提问</view>
				</navigator>
				<navigator hover-class="none" class="icon_item flex_all_center2">
					<view class="flex_all_center">
						<image style="width: 40rpx;height: 40rpx;" src="../../static/images/user7.png" mode=""></image>
					</view>
					<view>商品</view>
				</navigator>
				<navigator hover-class="none" class="icon_item flex_all_center2">
					<view class="flex_all_center">
						<image style="width: 44rpx;height: 44rpx;" src="../../static/images/user8.png" mode=""></image>
					</view>
					<view>服务</view>
				</navigator>
			</view>
		</view>
		<view class="logistics">
			<view>最新物流</view>
			<view class="logistics_box">
				<view class="not_logistics" v-if="logistics==null">暂无最新物流</view>
				<view v-else>
					<view class="flex_y_center">
					</view>
				</view>
			</view>
		</view>
		<view class="nav_list">
			<navigator url="/pages/patient/patient" hover-class="none" class="nav_item flex_y_center">
				<view class="flex_all_center">
					<image style="width: 38rpx;height: 42rpx;" src="../../static/images/user9.png" mode=""></image>
				</view>
				<view>就诊人管理</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</navigator>
			<navigator url="/pages/healthRecord/healthRecord" hover-class="none" class="nav_item flex_y_center">
				<view class="flex_all_center">
					<image style="width: 38rpx;height: 42rpx;" src="../../static/images/user10.png" mode=""></image>
				</view>
				<view>健康档案</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</navigator>
			<navigator url="/pages/myWarning/myWarning" hover-class="none" class="nav_item flex_y_center">
				<view class="flex_all_center">
					<image style="width: 38rpx;height: 42rpx;" src="../../static/images/user11.png" mode=""></image>
				</view>
				<view>我的提醒</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</navigator>
			<navigator url="/pages/myFollow/myFollow" hover-class="none" class="nav_item flex_y_center">
				<view class="flex_all_center">
					<image style="width: 38rpx;height: 42rpx;" src="../../static/images/user12.png" mode=""></image>
				</view>
				<view>我的随访</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</navigator>
			<!-- <navigator hover-class="none" class="nav_item flex_y_center">
				<view class="flex_all_center">
					<image style="width: 38rpx;height: 42rpx;" src="../../static/images/user13.png" mode=""></image>
				</view>
				<view>我的收货地址</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</navigator> -->
			<navigator url="/pages/myCollect/myCollect" hover-class="none" class="nav_item flex_y_center">
				<view class="flex_all_center">
					<image style="width: 38rpx;height: 42rpx;" src="../../static/images/user14.png" mode=""></image>
				</view>
				<view>关注收藏</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</navigator>
		</view>
		<view class="contact">全国客服电话：400-691-7771</view>
		<Footer :status="4"></Footer>
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
				title: "",
				user_info : {
					age : ''
				},
				logistics:null
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.loaduser()
			this.loadLogistics()
		},
		methods: {
			loadLogistics(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.getLogistics,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							if(res.data.data){
								that.logistics = res.data.data
							}
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			loaduser(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.getUser,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							that.user_info = res.data.data
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
	@import "../../static/css/user.scss"
</style>
