<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<view class="item flex_y_center" >
				<view>新 密 码：</view>
				<input @input="getPass" type="password" value="" placeholder="请输入新密码"/>
			</view>
			<view class="item flex_y_center">
				<view>重复密码：</view>
				<input @input="getRepass" type="password" value="" placeholder="请再次输入新密码"/>
			</view>
		</view>
		<view class="next" @click="confirm">确定</view>
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
				pass : '',
				repass : '',
				tel : ''
			}
		},
		onLoad(options) {
			this.tel = options.tel
		},
		methods: {
			getPass(e){
				this.pass = e.detail.value
			},
			getRepass(e){
				this.repass = e.detail.value
			},
			confirm(){
				const that = this
				if(that.pass==''){
					wx.showToast({
						title:'请输入密码！',
						icon:"none"
					})
					return false
				}
				if(that.pass!=that.repass){
					wx.showToast({
						title:'两次密码输入不一致！',
						icon:"none"
					})
					return false
				}
				uni.showLoading({
					title:'正在提交...'
				})
				uni.request({
					url : that.$api.user.setPwd,
					method:"POST",
					data:{
						phone : that.tel,
						password : that.pass,
						userId: uni.getStorageSync('user_info').userId
					},
					success(res) {
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'设置成功！'
							})
							setTimeout(function(){
								uni.navigateBack({
									delta:2
								})
							},1500)
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
				width: 500rpx;
				margin-left: 10rpx;
			}
			view{
				width: 150rpx;
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
