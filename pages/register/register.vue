<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="r_title">注册</view>
		<view class="register_box">
			<view class="flex_y_center">
				<view class="dis_code">+86</view>
				<input class="phone" type="number" value="" placeholder="请输入手机号" @blur="getPhone"/>
			</view>
			<view class="flex_y_center">
				<input class="left_inp" type="text" value="" @input="getImgCode" placeholder="请输入右侧图形验证码"/>
				<image :src="codeImg" class="codeImg" mode="" @click="imgCodeClick()"></image>
			</view>
			<view class="flex_y_center">
				<input class="left_inp" type="number" value="" @input="getTelCode" placeholder="短信验证码" />
				<view v-if="senType==0" class="getCode" @click="getCode">获取验证码</view>
			</view>
			<view class="flex_y_center">
				<image v-show="readType==0" @click="read(1)" class="circle" src="../../static/images/circle.png" mode=""></image>
				<image v-show="readType==1" @click="read(0)" class="circle" src="../../static/images/circle0.png" mode=""></image>
				<view class="tips">
					本人已阅读 <navigator url="" hover-class="none">《注册协议》</navigator> 和 <navigator url="" hover-class="none">《银川百年颐堂隐私协议》</navigator>
				</view>
			</view>
			
		</view>
		<view class="submit_btn" @click="submit">下一步</view>
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
				type : 0,
				title:'',
				phone:'',
				codeImg:'',
				imgCode:'',
				senType:0,
				code:'',
				readType:0
			}
		},
		onLoad(options) {
			options.type ? this.type=1 : this.type=0
			this.getVerifyCode()
		},
		methods: {
			submit(){
				const that = this
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phone))){
					uni.showToast({
						title:"手机号码有误，请重填",
						icon:'none'
					})
					return false; 
				}
				
				if(that.imgCode==''){
					uni.showToast({
						title:'请输入图形验证码！',
						icon:'none'
					})
					return false; 
				}
				if(that.code==''){
					uni.showToast({
						title:'请输入手机验证码！',
						icon:'none'
					})
					return false; 
				}
				if(that.readType==0){
					uni.showToast({
						title:'请阅读《注册协议》和《银川百年颐堂隐私协议》！',
						icon:'none'
					})
					return false; 
				}
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url : that.$api.user.register,
					method:"post",
					data:{
						phone : that.phone,
						verifyCode:that.imgCode,
						smsCode:that.code
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'您已成功注册为搜大夫会员！'
							})
							
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				})
			},
			
			read(e){
				console.log(e)
				this.readType = e
			},
			
			// 点击图形验证码
			imgCodeClick(){
				uni.showLoading({
					title:"正在加载..."
				})
				this.getVerifyCode()
			},
			
			// 获取手机验证码
			getCode(){
				const that = this
				let imgCode = that.imgCode
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phone))){ 
					uni.showToast({
						title:"手机号码有误，请重填",
						icon:'none'
					})
					return false; 
				}
				that.getPhoneCode(imgCode)
			},
			
			// 获取手机验证码
			getPhoneCode(imgCode){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url : that.$api.user.sendSms,
					data:{
						phone : that.phone,
						verifyCode:that.imgCode,
						smsType:0
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'发送成功'
							})
							that.senType = 1
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				})
			},
			
			// 获取手机号码
			getPhone(e){
				console.log(e)
				this.phone = e.detail.value
				uni.showLoading({
					title:'正在加载...'
				})
				this.getVerifyCode()
			},
			
			// 获取填写的图片验证码
			getImgCode(e){
				this.imgCode = e.detail.value
			},
			
			// 获取手机验证码
			getTelCode(e){
				this.code = e.detail.value
			},
			
			// 获取图片验证码
			getVerifyCode(){
				const that = this
				uni.request({
					url : this.$api.user.getVerifyCode,
					data:{
						phone : that.phone
					},
					success(res) {
						uni.hideLoading()
						that.codeImg = res.data.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/register.scss"
</style>
