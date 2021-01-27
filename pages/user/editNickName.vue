<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="save" @click="save">保存</view>
		<view class="edit_input flex_y_center">
			<input @input="getName" placeholder="请输入昵称" type="text" :value="nikeName" />
			<image @click="reset" src="../../static/images/qingkong.png" mode=""></image>
		</view>
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
				title: "修改昵称",
				nikeName : ''
			}
		},
		onLoad(options) {
			this.nikeName = options.nikeName
		},
		methods: {
			reset(){
				this.nikeName = ''
			},
			getName(e){
				this.nikeName = e.detail.value
			},
			save(){
				const that = this
				uni.showLoading({
					title:'正在提交...'
				})
				uni.request({
					url:that.$api.user.update,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					method:"post",
					data:{
						"nickName": that.nikeName,
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'修改成功！'
							})
							setTimeout(function(){
								uni.navigateBack()
							},1500)
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
	page{
		background: #fff;
	}
	.save{
		width: 96rpx;
		height: 50rpx;
		background: #00BE72;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		position: fixed;
		top: 28rpx;
		right: 20rpx;
		z-index: 999;
	}
	.edit_input{
		padding: 30rpx;
		input{
			font-size: 34rpx;
			width: 500rpx;
		}
		image{
			width: 40rpx;
			height: 40rpx;
			margin-left: 40rpx;
		}
	}
</style>
