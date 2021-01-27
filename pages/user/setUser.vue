<template>
	<view class="container setUser">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<view class="item flex_y_center" @click="showCups">
				<view>头像</view>
				<image v-if="user_info.headImg" class="avt" :src="user_info.headImg" mode=""></image>
				<image v-else class="avt" src="../../static/images/header.png" mode=""></image>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</view>
			<view class="item flex_y_center">
				<view>用户名</view>
				<view class="center" v-text="user_info.userName"></view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</view>
			<navigator hover-class="none" :url="'editNickName?nikeName='+user_info.nickName" class="item flex_y_center">
				<view>昵称</view>
				<view class="center" v-text="user_info.nickName"></view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</navigator>
			<view class="item flex_y_center">
				<view>性别</view>
				<picker class="center" :range="sexList" range-key="label" @change="saveSex">
					<view v-if="user_info.sex==1">男</view>
					<view v-else-if="user_info.sex==2">女</view>
					<view v-else>保密</view>
					<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
				</picker>
			</view>
			<view class="item flex_y_center">
				<view>出生日期</view>
				<picker class="center" mode="date" @change="saveBirth">
					<view v-if="user_info.birthday">{{user_info.birthday}}</view>
					<view v-else>暂未设置</view>
					<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
				</picker>
				
			</view>
		</view>
		<!-- <view class="list">
			<view class="item flex_y_center">
				<view>微信</view>
				<view class="center">{{user_info.wxBindTag==0?'未绑定':'已绑定'}}</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</view>
			<view class="item flex_y_center">
				<view>QQ</view>
				<view class="center">{{user_info.qqBindTag==0?'未绑定':'已绑定'}}</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</view>
			<view class="item flex_y_center">
				<view>支付宝</view>
				<view class="center">{{user_info.zfbBindTag==0?'未绑定':'已绑定'}}</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</view>
		</view> -->
		<view class="list">
			<view class="item flex_y_center">
				<view>二维码名片</view>
				<image class="ewm" src="../../static/images/sz_ewm_icon.png" mode=""></image>
			</view>
		</view>
		<view class="list">
			<view class="item flex_y_center">
				<view>当前版本</view>
				<view class="center">v1.0.0</view>
			</view>
			<navigator :url="'setPwd?tel='+user_info.phone" hover-class="none" class="item flex_y_center">
				<view>设置登录密码</view>
				<image class="icon_right" style="margin-left: auto;" src="../../static/images/user3.png" mode=""></image>
			</navigator>
			<view class="item flex_y_center">
				<view>清除缓存</view>
				<view class="center">3.0M</view>
				<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
			</view>
		</view>
		<view class="cups" v-show="pay_cups">
			<view class="cup_box">
				<view class="pay_box">
					<!-- <view class="pay_item" style="text-align: center;color: #00BE72;" @click="">拍照</view> -->
					<view @click="upload" class="pay_item" style="text-align: center;color: #00BE72;">上传照片</view>
				</view>
				<view class="cancel" @click="cancle">取消</view>
			</view>
		</view>
		<view class="logOut" @click="logOut">退出账户</view>
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
				title: "",
				user_info : {
					age : ''
				},
				sexList:[
					{label:'保密',value:3},
					{label:'男',value:1},
					{label:'女',value:2}
				],
				pay_cups:false
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.loaduser()
		},
		methods: {
			logOut(){
				const that = this
				uni.showModal({
					title:'提示',
					content:'确认退出账号？',
					cancelText:'取消',
					success(r) {
						if(r.confirm){
							uni.request({
								url:that.$api.user.logout,
								header:{
									"token" : uni.getStorageSync('user_info').token
								},
								method:"get",
								success:res=>{
									console.log(res)
									if(res.data.status==200){
										uni.navigateTo({
											url:'/pages/login/login'
										})
									}else if(res.data.status==1001){
										uni.navigateTo({
											url:'/pages/login/login'
										})
									}
								}
							})
						}
					}
				})
				
			},
			upload(){
				const that = this	
				uni.chooseImage({
					count:1,
					success(re) {
						let img = re.tempFiles[0]
						that.pay_cups = false
						uni.showLoading({
							title:'正在提交...',
							mask:true
						})
						uni.uploadFile({
							url : that.$api.user.uploadFile,
							header : {
								"token": uni.getStorageSync('user_info').token
							},
							file : img,
							success(res) {
								uni.hideLoading()
								let data = JSON.parse(res.data)
								console.log(data)
								if(data.status==200){
									let url = data.data.url
									that.saveHeader(url)
								}
							},
							fail(re){
								uni.showToast({
									title:"上传失败！",
									icon:"none"
								})
								return false;
							}
						})
					}
				})
			},
			showCups(){
				this.pay_cups = true
			},
			cancle(){
				this.pay_cups = false
			},
			saveHeader(url){
				const that = this
				uni.request({
					url:that.$api.user.update,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					method:"post",
					data:{
						"userId": uni.getStorageSync('user_info').userId,
						"headImg" : url
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'提交成功！'
							})
							setTimeout(function(){
								that.loaduser()
							},1000)
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			saveBirth(e){
				const that = this
				let date = e.detail.value
				uni.showToast({
					title:'正在提交...',
					icon:'none'
				})
				uni.request({
					url:that.$api.user.update,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					method:"post",
					data:{
						"userId": uni.getStorageSync('user_info').userId,
						"birthday" : date
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'提交成功！'
							})
							setTimeout(function(){
								that.loaduser()
							},1000)
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			saveSex(e){
				const that = this
				let list = that.sexList,index = e.detail.value
				uni.showToast({
					title:'正在提交...',
					icon:'none'
				})
				uni.request({
					url:that.$api.user.update,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					method:"post",
					data:{
						"userId": uni.getStorageSync('user_info').userId,
						"sex" : list[index].value
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'提交成功！'
							})
							setTimeout(function(){
								that.loaduser()
							},1000)
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
							let data = res.data.data
							data.birthday = data.birthday.split(' ')[0]
							that.user_info = data
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
	@import "../../static/css/setUser.scss"
</style>
