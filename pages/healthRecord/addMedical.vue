<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="form_list">
			<view class="form_item flex_y_center">
				<view>就诊时间：</view>
				<picker mode="date" @change="getDate">
					<view :style="formdata.findTime==''?'color:#cecece;':''">{{formdata.findTime==''?'请选择':formdata.findTime}}</view>
					<image src="../../static/images/user3.png" mode=""></image>
				</picker>
			</view>
			<view class="form_item flex_y_center">
				<view>就诊机构：</view>
				<view class="flex_y_center fi_item" style="margin-left: auto;">
					<input @input="getOrg" type="text" value="" placeholder="请输入" placeholder-style="color:#cecece;"/>
					<image src="../../static/images/user3.png" mode=""></image>
				</view>
			</view>
			<view class="form_item flex_y_center">
				<view>就诊科室：</view>
				<view class="flex_y_center fi_item" style="margin-left: auto;">
					<input @input="getDept" type="text" value="" placeholder="请输入" placeholder-style="color:#cecece;"/>
					<image src="../../static/images/user3.png" mode=""></image>
				</view>
			</view>
			<view class="form_item flex_y_center">
				<view>医生姓名：</view>
				<view class="flex_y_center fi_item" style="margin-left: auto;">
					<input @input="getDoc" type="text" value="" placeholder="请输入" placeholder-style="color:#cecece;"/>
					<image src="../../static/images/user3.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="form_list">
			<view class="textarea">
				<view>病情描述：</view>
				<textarea @input="getDesc" value="" placeholder="请详细描述你的疾病主要症状、身体感受、持续时间等问题。" />
			</view>
			<view class="uoload_box">
				<view>上传检查报告或患病处照片（最多9张）</view>
				<view class="tips">根据互联网医院管理方法，请上传包含医生诊断及患者信息的照片或病历。请上传正确的照片或病历</view>
				<view class="img_list flex_wrap">
					<view class="img_item" v-for="(item,index) in formdata.imageDTO" :key="index" :style="index==3 || index==7?'':'margin-right: 28rpx;'">
						<image :src="item.imageUrl" mode=""></image>
					</view>
					<view class="flex_all_center unload" @click="upload">
						<image src="../../static/images/upload.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="form_list">
			<view class="form_item flex_y_center">
				<view>是否曾到实体医院就诊过</view>
				<view class="flex_y_center" style="margin-left: auto;" @click="tagClick(1)">
					<image v-show="formdata.hasTag==1" src="../../static/images/circle0.png" mode=""></image>
					<image v-show="formdata.hasTag==0 || formdata.hasTag==-1" src="../../static/images/circle.png" mode=""></image>
					<view class="">是</view>
				</view>
				<view class="flex_y_center" style="margin-left: 40rpx;" @click="tagClick(0)">
					<image v-show="formdata.hasTag==0" src="../../static/images/circle0.png" mode=""></image>
					<image v-show="formdata.hasTag==1 || formdata.hasTag==-1" src="../../static/images/circle.png" mode=""></image>
					<view class="">否</view>
				</view>
			</view>
			<view class="form_item">
				<input @input="getRemark" type="text" value="" placeholder="请输入实体医院确诊疾病名称" />
			</view>
		</view>
		<view class="btn flex_all_center">
			<view @click="confirm">保存</view>
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
				title: "新建病历",
				formdata : {
					findTime : '',
					dept:'',
					orgName :'',
					doctorName  :'',
					medicalDesc :'',
					hasTag:-1,
					remark :'',
					imageDTO :[],
					patientId:'',
					patientName:'',
					patientPhone:'',
					// medicalId :''
				},
			}
		},
		onLoad(options) {
			this.formdata.patientId = options.patientId
			this.formdata.patientName = options.patientName
			this.formdata.patientPhone = options.patientPhone
		},
		methods: {
			confirm(){
				let that = this,formdata = that.formdata
				if(formdata.findTime==''){
					uni.showToast({
						title:'请选择就诊时间！',
						icon:'none'
					})
					return false;
				}
				if(formdata.orgName==''){
					uni.showToast({
						title:'请输入就诊机构！',
						icon:'none'
					})
					return false;
				}
				if(formdata.dept==''){
					uni.showToast({
						title:'请输入就诊科室！',
						icon:'none'
					})
					return false;
				}
				if(formdata.doctorName==''){
					uni.showToast({
						title:'请输入医生姓名！',
						icon:'none'
					})
					return false;
				}
				if(formdata.medicalDesc==''){
					uni.showToast({
						title:'请输入病情描述！',
						icon:'none'
					})
					return false;
				}
				if(formdata.hasTag==-1){
					uni.showToast({
						title:'请选择是否到实体医院就诊过！',
						icon:'none'
					})
					return false;
				}
				if(formdata.hasTag==1){
					if(formdata.remark==''){
						uni.showToast({
							title:'请输入实体医院诊断疾病名称！',
							icon:'none'
						})
						return false;
					}
				}
				formdata.findTime = formdata.findTime + ' 00:00:00'
				uni.showLoading({
					title:'正在提交...'
				})
				uni.request({
					url:that.$api.healthRecord.addMedical,
					method:"post",
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:formdata,
					success:res=>{
						console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'保存成功！'
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
			
			getDate(e){
				this.formdata.findTime = e.detail.value
			},
			getOrg(e){
				this.formdata.orgName = e.detail.value
			},
			getDept(e){
				this.formdata.dept = e.detail.value
			},
			getDoc(e){
				this.formdata.doctorName = e.detail.value
			},
			getDesc(e){
				this.formdata.medicalDesc = e.detail.value
			},
			tagClick(e){
				this.formdata.hasTag = e
			},
			getRemark (e){
				this.formdata.remark = e.detail.value
			},
			upload(){
				const that = this
				let length=0,arr=that.formdata.imageDTO
				if(arr.length==9){
					wx.showToast({
						title:'您最多只能上传9张图片！',
						icon:'none'
					})
					return false;
				}
				uni.chooseImage({
					count:9,
					success(res) {
						let imgArr = res.tempFiles
						uni.showLoading({
							title:'正在上传...'
						})
						for(let i in imgArr){
							uni.uploadFile({
								url : that.$api.user.uploadFile,
								header : {
									"token": uni.getStorageSync('user_info').token
								},
								file : imgArr[i],
								success(re) {
									let data = JSON.parse(re.data)
									let obj = {}
									obj.id = ''
									obj.imageKey = data.data.key
									obj.imageUrl = data.data.url
									obj.type = 0
									length++
									if(length==imgArr.length){
										uni.hideLoading()
									}
									if(data.status==200){
										// console.log(arr.length)
										if(arr.length<9){
											arr.push(obj)
											that.formdata.imageDTO = [...arr]
											console.log(that.formdata.imageDTO)
										}
									}
								},
								fail(re){
									uni.showToast({
										title:"上传失败！",
										icon:"none"
									})
									return false;
								}
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/addMedical.scss"
</style>
