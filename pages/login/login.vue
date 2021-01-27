<template>
	<view class="container">
		<block v-if="type==0">
			<Header :title="title" :status="1"></Header>
		</block>
		<image class="logo" src="../../static/images/login_sdf_logo.png" mode=""></image>
		<view class="login_tab flex">
			<view @click="loginChange(0)" :class="login_type==0?'lt_item active':'lt_item'" :style="login_type==0?'':'border-right:0rpx;'">账号密码登录</view>
			<view @click="loginChange(1)" :class="login_type==1?'lt_item active':'lt_item'" :style="login_type==1?'':'border-left:0rpx;'" class="lt_item">验证码登录</view>
		</view>
		<view class="login_box">
			<block v-if="login_type==0">
				<view class="flex_y_center">
					<input @input="getTelByPass" style="width: 100%;" type="number" value="" placeholder="请输入手机号或用户名" placeholder-class="palce_holder"/>
				</view>
				<view class="flex_y_center">
					<input @input="getPass" style="width: 350rpx" :type="pass_type" value="" placeholder="请输入密码" placeholder-class="palce_holder"/>
					<image v-if="pass_type=='password'" @click="showPass" src="../../static/images/yincang.png" mode=""></image>
					<image v-else style="width: 30rpx;height: 17rpx;"  @click="hiddenPass" src="../../static/images/login_display_icon.png" mode=""></image>
					<view>忘记密码</view>
				</view>
			</block>
			<block v-else>
				<view class="flex_y_center">
					<input style="width: 100%;" type="number" value="" @input="getTelBycode" placeholder="请输入手机号" placeholder-class="palce_holder"/>
				</view>
				<view class="flex_y_center">
					<input style="width: 350rpx" type="number" value="" @input="getCode" placeholder="短信验证码" placeholder-class="palce_holder"/>
					<view v-show="sendcode==0" class="getcode" @click="getTelCode">获取验证码</view>
					<view v-show="sendcode==1" class="getcode" >{{second}}秒后重试</view>
				</view>
			</block>
			<view class="login_btn" @click="login">登 录</view>
			<navigator hover-class="none" url="/pages/register/register" class="to_register">新用户注册</navigator>
		</view>
		<view class="login_bottom">
			<view class="flex_all_center lb_top">
				<view class="lb_line"></view>
				<view class="lb_txt">其他登录方式</view>
				<view class="lb_line"></view>
			</view>
			<view class="other_list flex">
				<navigator hover-class="none" class="flex_all_center2">
					<image src="../../static/images/login_qq_icon.png" mode=""></image>
					<view>QQ登录</view>
				</navigator>
				<navigator hover-class="none" class="flex_all_center2">
					<image src="../../static/images/login_wechat_icon.png" mode=""></image>
					<view>微信登录</view>
				</navigator>
				<navigator hover-class="none" class="flex_all_center2">
					<image src="../../static/images/zfb_icon.png" mode=""></image>
					<view>支付宝登录</view>
				</navigator>
			</view>
			<view class="login_xieyi flex_all_center">登录即代表您已同意<navigator hover-class="none">《银川佰年颐堂隐私政策》</navigator></view>
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
				type : 0,
				title:'',
				login_type:0,
				code_phone:'',
				pass_phone:'',
				code:'',
				password:'',
				second:59,
				sendcode : 0,
				interval:'',
				pass_type:'password'
			}
		},
		onLoad(options) {
			options.type ? this.type=1 : this.type=0
			// this.secondMinu()
		},
		onHide() {
			clearInterval(this.interval)
			this.second = 59
			this.sendcode = 0
		},
		onShow() {
			clearInterval(this.interval)
			this.second = 59
			this.sendcode = 0
		},
		methods: {
			login(){
				if(this.login_type==0){
					this.loginByPass()
				}else{
					this.loginByCode()
				}
			},
			// 密码登录
			loginByPass(){
				const that = this
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.pass_phone))){
					uni.showToast({
						title:"手机号码有误，请重填",
						icon:'none'
					})
					return false; 
				}
				if(that.password==''){
					uni.showToast({
						title:"请输入密码",
						icon:'none'
					})
					return false; 
				}
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url : that.$api.user.doLogin,
					method:"post",
					data:{
						loginType : 3,
						userName : that.pass_phone,
						password : that.password,
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						if(res.data.status==200){
							uni.showToast({
								title:'登录成功！'
							})
							uni.setStorageSync('user_info',res.data.data)
							
							setTimeout(function(){
								// if(that.type==1){
									uni.reLaunch({
										url:"/pages/index/index"
									})
								// }else{
								// 	uni.navigateBack()
								// }
							},1000)
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				})
			},
			
			// 验证码登录
			loginByCode(){
				const that = this
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.code_phone))){
					uni.showToast({
						title:"手机号码有误，请重填",
						icon:'none'
					})
					return false; 
				}
				if(that.code==''){
					uni.showToast({
						title:"请输入短信验证码",
						icon:'none'
					})
					return false; 
				}
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url : that.$api.user.doLogin,
					method:"post",
					data:{
						loginType : 2,
						userName : that.code_phone,
						password : that.code,
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						if(res.data.status==200){
							uni.showToast({
								title:'登录成功！'
							})
							uni.setStorageSync('user_info',res.data.data)
							
							setTimeout(function(){
								// if(that.type==1){
									uni.reLaunch({
										url:"/pages/index/index"
									})
								// }else{
								// 	uni.navigateBack()
								// }
							},1000)
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				})
			},
			// 获取验证码登录手机号
			getTelBycode(e){
				this.code_phone = e.detail.value
			},
			// 获取密码登录手机号
			getTelByPass(e){
				this.pass_phone = e.detail.value
			},
			// 获取密码
			getPass(e){
				this.password = e.detail.value
			},
			showPass(){
				this.pass_type = 'text'
			},
			hiddenPass(){
				this.pass_type = 'password'
			},
			// 获取填写的验证码
			getCode(e){
				this.code = e.detail.value
			},
			// 获取验证码接口数据
			getTelCode(){
				const that = this
				let code_phone = that.code_phone,code=that.code
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(code_phone))){
					uni.showToast({
						title:"手机号码有误，请重填",
						icon:'none'
					})
					return false; 
				}
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url : that.$api.user.sendSms,
					data:{
						phone : code_phone,
						// verifyCode:'',
						smsType:1
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'发送成功'
							})
							that.sendcode = 1
							that.secondMinu()
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				})
			},
			// 登录方式切换
			loginChange(e){
				this.login_type = e
			},
			// 倒计时
			secondMinu(){
				const that = this
				that.interval = setInterval(function(){
					that.second = that.second-1
					if(that.second==0){
						clearInterval(that.interval)
						that.sendcode = 0
						that.second = 59
					}
				},1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/login.scss"
</style>
