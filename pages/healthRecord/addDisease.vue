<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<view class="item flex_y_center">
				<view class="">疾病名称：</view>
				<input type="text" value="" placeholder="请选择疾病名称"/>
				<image src="../../static/images/user3.png" mode=""></image>
			</view>
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
				title: "",
			}
		},
		onLoad(options) {
			
		},
		onShow() {

		},
		methods: {
			loadPaient(){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.patient_list,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"userId": uni.getStorageSync('user_info').userId,
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							that.paientList = res.data.data
							that.patientId = res.data.data[0].patientId
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
