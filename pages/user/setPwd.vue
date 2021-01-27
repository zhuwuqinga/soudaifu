<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<view class="item" >
				<text>发送验证码至</text>
				<text style="margin-left: 30rpx;" v-text="tel"></text>
			</view>
			<view class="item flex_y_center">
				<input @input="getCodeValue" type="number" value="" placeholder="输入验证码"/>
				<view v-show="sendcode==0" @click="getCode">获取验证码</view>
				<view v-show="sendcode==1">{{second}}秒后重试</view>
			</view>
		</view>
		<view class="next" @click="next">下一步</view>
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
				title: "设置密码",
				tel : '',
				second:59,
				sendcode : 0,
				interval:'',
				smsCode:''
			}
		},
		onLoad(options) {
			this.tel = options.tel
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
			getCodeValue(e){
				this.smsCode = e.detail.value
			},
			next(){
				const that = this
				if(that.smsCode==''){
					wx.showToast({
						title:'请输入验证码！',
						icon:"none"
					})
					return false
				}
				uni.showLoading({
					title:'校验验证码...'
				})
				uni.request({
					url : that.$api.user.validateSms,
					data:{
						phone : that.tel,
						smsCode:that.smsCode,
						smsType:2
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						if(res.data.status==200){
							wx.navigateTo({
								url:"setPwd2?tel="+that.tel
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
			getCode(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url : that.$api.user.sendSms,
					data:{
						phone : that.tel,
						// verifyCode:'',
						smsType:2
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		padding: 0 30rpx;
		background: #fff;
		.item:last-child{
			border-top: 1rpx solid #dedede;
		}
		.item{
			padding: 40rpx 0;
			font-size: 28rpx;
			input{
				font-size: 28rpx;
				width: 300rpx;
			}
			view{
				margin-left: auto;
				color: #00BE72;
			}
		}
	}
	.next{
		width: 600rpx;
		height: 78rpx;
		background: linear-gradient(135deg, #2ECFAF, #29BDCB);
		box-shadow: 0px 0px 30rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 39rpx;
		text-align: center;
		line-height: 78rpx;
		color: #fff;
		margin: 140rpx auto 0 auto;
	}
	
</style>
