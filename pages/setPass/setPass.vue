<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="r_title">注册</view>
		<view class="register_box">
			<input type="password" class="sp_input" value="" @input="getPass" placeholder="密码长度6-12位"/>
			<input type="password" class="sp_input" value="" @input="getRePass" placeholder="再次输入密码"/>
		</view>
		<view style="margin-top: 200rpx;" class="submit_btn" @click="submit">完成</view>
		<view class="submit_btn1" @click="prev">上一步</view>
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
				title:'',
				pass:'',
				repass:''
			}
		},
		onLoad() {
		},
		methods: {
			submit(){
				const that = this
				let pass = this.pass,repass = this.repass
				if(pass.length<6 || pass.length>12){
					uni.showToast({
						title:'请输入正确的密码！',
						icon:'none'
					})
				}else if(repass!=pass){
					uni.showToast({
						title:'两次密码输入不一致！',
						icon:'none'
					})
				}else{
					uni.showLoading({
						title:'正在加载...',
						mask:true
					})
					// uni.request({
					// 	url:this.$api.user.setPwd,
						
					// })
				}
			},
			getPass(e){
				this.pass = e.detail.value
			},
			getRePass(e){
				this.repass = e.detail.value
			},
			prev(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/register.scss"
</style>
