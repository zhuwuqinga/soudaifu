<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list" v-if="list.length>0">
			<view @click="choice(index)" class="item flex_y_center" v-for="(item,index) in list" :key="index">
				<image v-if="curId==item.patientId" class="circle" src="../../static/images/circle0.png" mode=""></image>
				<image v-else class="circle" src="../../static/images/circle.png" mode=""></image>
				<view class="center">
					<view class="flex_y_center">
						<view class="name" v-text="item.patientName"></view>
						<view v-text="item.idCardNo"></view>
					</view>
					<view class="flex_y_center center_bot">
						<view v-text="item.sexText"></view>
						<view v-text="item.age+'岁'"></view>
						<view v-text="item.patientPhone"></view>
					</view>
				</view>
				<view class="btn_list flex_y_center">
					<view @click.stop="navgate(item.patientId)"  hover-class="none">
						<image src="../../static/images/edit.png" mode=""></image>
					</view>
					<view @click.stop="del(item.patientId)" style="margin-left: 40rpx;" >
						<image src="../../static/images/del.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<NotData v-else></NotData>
		<view class="btn_box">
			<navigator url="/pages/editPerson/editPerson" hover-class="none" class="flex_all_center">
				<image src="../../static/images/add_person2.png" mode=""></image>
				<view class="">添加就诊人</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import Header from "../../components/header/Header.vue"
	import NotData from "../../components/notData/NotData.vue"
	export default {
		components: {
			Header,
			NotData
		},
		data() {
			return {
				title: "选择就诊人",
				pageNo:1,
				pageSize:10,
				list:[],
				curId : ''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.loaddata(this.pageNo,this.pageSize)
		},
		methods: {
			choice(index){
				let list = this.list
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2]
				this.curId = list[index].patientId
				prePage.$vm.patient.patientId = list[index].patientId
				prePage.$vm.patient.patientName = list[index].patientName
				uni.navigateBack()
			},
			del(id){
				const that = this
				uni.showModal({
					title:"提示",
					content:"是否删除该就诊人？",
					success(res) {
						if(res.confirm){
							uni.showLoading({
								title:'正在删除...'
							})
							uni.request({
								url:that.$api.user.patient_delete,
								header:{
									"token" : uni.getStorageSync('user_info').token
								},
								data:{
									patientId : id
								},
								success:res=>{
									uni.hideLoading()
									console.log(res)
									if(res.data.status==200){
										uni.showToast({
											title:'删除成功！'
										})
										that.loaddata(that.pageNo,that.pageSize)
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
			navgate(id){
				uni.navigateTo({
					url:"/pages/editPerson/editPerson?id="+id
				})
			},
			loaddata(pageNo,pageSize){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.patient_list,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					method:"post",
					data:{ 
						"pageNo": pageNo,
						"pageSize": pageSize,
						"userId": uni.getStorageSync('user_info').userId
					},
					success:res=>{
						uni.hideLoading()
						if(res.data.status==200){
							that.list = res.data.data
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
	@import "../../static/css/personList.scss";
</style>
