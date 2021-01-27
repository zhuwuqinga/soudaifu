<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<navigator hover-class="none" url="/pages/personList/personList" class="item flex_y_center">
				<view class="title">添加就诊人</view>
				<view v-show="patient.patientName" class="patient_name" v-text="patient.patientName"></view>
				<image class="add_person" style="width: 50rpx;height: 50rpx;" src="../../static/images/add_person.png" mode=""></image>
			</navigator>
			<view @click="navigate" class="item flex_y_center">
				<view class="title">选择科室</view>
				<image class="add_person" style="width: 11rpx;height: 20rpx;" src="../../static/images/user3.png" mode=""></image>
			</view>
		</view>
		<!-- view class="btn_box">
			<view class="flex_all_center" style="opacity: 0.3;">
				<view class="">确认挂号</view>
			</view>
		</view> -->
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
				title: "添加信息",
				patient : {
					patientId : '',
					patientName : ''
				},
				orgDetail :{
					id : "",
					name : ""
				}
			}
		},
		onLoad(options) {
			this.orgDetail = options
		},
		methods: {
			navigate(){
				if(this.patient.patientId==''){
					uni.showToast({
						title:'请选择就诊人',
						icon: 'none'
					})
					return false;
				}
				uni.navigateTo({
					url: '/pages/choiceRoom/choiceRoom?id='+this.orgDetail.id+'&name='+this.orgDetail.name+'&patientId='+this.patient.patientId+'&patientName='+this.patient.patientName
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/registration.scss";
</style>
