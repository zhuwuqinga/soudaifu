<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="times">坐诊时间：</view>
		<view class="list">
			<view class="item">
				<view class="first flex_y_center">
					<image src="../../static/images/circle.png" mode=""></image>
					<view class="date">星期一（5月11日）上午</view>
					<view class="num">余号：<text>10</text></view>
				</view>
				<view class="seccound">
					<view class="flex_y_center">
						<image src="../../static/images/circle0.png" mode=""></image>
						<view class="date">13：30—14：30</view>
						<view class="num">余号：<text>4</text></view>
					</view>
					<view class="flex_y_center">
						<image src="../../static/images/circle.png" mode=""></image>
						<view class="date">13：30—14：30</view>
						<view class="num">余号：<text>4</text></view>
					</view>
					<view class="flex_y_center">
						<image src="../../static/images/circle.png" mode=""></image>
						<view class="date">13：30—14：30</view>
						<view class="num">余号：<text>4</text></view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="first flex_y_center">
					<image src="../../static/images/circle.png" mode=""></image>
					<view class="date">星期一（5月11日）上午</view>
					<view class="num">余号：<text>10</text></view>
				</view>
			</view>
		</view>
		<view class="btn_box">
			<view class="flex_all_center" @click="confirm">
				<view class="">确认预约</view>
			</view>
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
				title: "选择医生",
				detail:{
					doctorId : '',
					startDate:''
				}
			}
		},
		onLoad(options) {
			this.detail = options
			this.loaddata(options.doctorId,options.startDate)
		},
		methods: {
			loaddata(doctorId,startDate){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.sheetRegister.listDocRegister,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"doctorId": doctorId,
						"startDate": startDate,
						// "userId": uni.getStorageSync('user_info').userId
					},
					success(res) {
						uni.hideLoading()
						console.log(res)
						// if(res.data.status==200){
						// 	that.docList = res.data.data
							
						// }else if(res.data.status==1001){
						// 	uni.navigateTo({
						// 		url:'/pages/login/login'
						// 	})
						// }
					}
				})
			},
			confirm(){
				uni.navigateTo({
					url:'/pages/confirmNum/confirmNum'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/choiseDoc3.scss";
</style>
