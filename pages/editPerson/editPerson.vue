<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<form @submit="submit" @reset="">
			<view class="list">
				<view class="item flex_y_center">
					<view class="">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
					<input name="patientName" type="text" :value="detail.patientName" placeholder="请输入就诊人姓名"/>
				</view>
				<view class="item flex_y_center">
					<view class="">身份证号：</view>
					<input name="idCardNo" type="text" :value="detail.idCardNo" placeholder="请输入真实证件号"/>
				</view>
				<view class="item flex_y_center">
					<view class="">手&nbsp;机&nbsp;号：</view>
					<input name="patientPhone" type="number" :value="detail.patientPhone" placeholder="请输入真实手机号"/>
				</view>
			</view>
			<view class="tips">温馨提示：就诊人姓名、证件信息用于平台审核，不会外传。请输入正确的就诊人姓名和证件号。</view>
			<view class="btn_box" >
				<button hover-class="none" form-type="submit">{{save_txt}}</button>
			</view>
		</form>
		
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
				title: "",
				id : "",
				detail:{
					patientName : '',
					idCardNo : '',
					patientPhone : '',
					save_txt : ''
				}
			}
		},
		onLoad(options) {
			if(options.id){
				this.title = "编辑就诊人"
				this.save_txt = "修改"
				this.id = options.id
				this.loaddata(options.id)
			}else{
				this.title = "新增就诊人"
				this.save_txt = "保存"
			}
		},
		methods: {
			submit(e){
				let that = this,formdata = e.detail.value
				const cardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
				const telReg = /^1[3456789]\d{9}$/
				let url = that.$api.user.patient_add
				let content = "是否保存就诊人信息？"
				formdata.userId=uni.getStorageSync('user_info').userId	
				if(that.id){
					formdata.patientId = that.id
					url = that.$api.user.patient_update
					content = "是否修改就诊人信息？"
				}
				console.log(formdata)
				if(formdata.patientName==''){
					uni.showToast({
						title:"请输入就诊人姓名！",
						icon: 'none'
					})
				}else if(!cardReg.test(formdata.idCardNo)){
					uni.showToast({
						title:"请输入正确的身份证号码！",
						icon: 'none'
					})
				}else if(!telReg.test(formdata.patientPhone)){
					uni.showToast({
						title:"请输入正确的身份证号码！",
						icon: 'none'
					})
				}else{
					uni.showModal({
						title:"提示",
						content:content,
						success(res) {
							if(res.confirm){
								uni.showLoading({
									title:'正在提交...'
								})
								uni.request({
									url:url,
									header:{
										"token" : uni.getStorageSync('user_info').token
									},
									method:"post",
									data:formdata,
									success:res=>{
										uni.hideLoading()
										console.log(res)
										if(res.data.status==200){
											uni.showToast({
												title:'提交成功！'
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
							}
						}
					})
					
				}
			},
			
			
			loaddata(id){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.user.patient_get,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{ 
						patientId : id
					},
					success:res=>{
						uni.hideLoading()
						if(res.data.status==200){
							that.detail = res.data.data
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
	@import "../../static/css/editPerson.scss";
</style>
