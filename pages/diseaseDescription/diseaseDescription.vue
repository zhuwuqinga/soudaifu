<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<navigator class="flex_y_center c_paient" hover-class="none" url="/pages/personList/personList">
			<view v-show="patient.patientName==''">就诊人</view>
			<view v-show="patient.patientName" v-text="patient.patientName"></view>
			<view v-show="patient.patientName" class="patient">就诊人</view>
			<image src="../../static/images/user3.png" mode=""></image>
		</navigator>
		<view class="list">
			<view class="item">
				<view class="title">病情描述：</view>
				<textarea @input="getScription" maxlength="200" auto-height="true" value="" placeholder="请输入病情描述" />
			</view>
			<view class="item">
				<view class="title">上传检查报告或患者病处照片（最多9张）</view>
				<view class="tips">请根据互联网医院管理方法，请上传包含医生诊断及患者信息的照片或病历。请上传正确的照片或病历</view>
				<view class="img_list flex_wrap">
					<view class="img_item" v-for="(item,index) in imgList" :key="index" :style="index==3 || index==7?'':'margin-right: 22rpx;'">
						<image class="up_img" :src="item.imgKey" mode=""></image>
					</view>
					<view class="flex_all_center upload" @click="upload">
						<image src="../../static/images/upload.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item flex_y_center">
				<view class="title">是否曾到实体医院就诊过</view>
				<view class="flex_y_center" style="margin-left: auto;" @click="tagClick(1)">
					<image v-show="hasTag==1" src="../../static/images/circle0.png" mode=""></image>
					<image v-show="hasTag==0 || hasTag==-1" src="../../static/images/circle.png" mode=""></image>
					<view class="">是</view>
				</view>
				<view class="flex_y_center" style="margin-left: 40rpx;" @click="tagClick(0)">
					<image v-show="hasTag==0" src="../../static/images/circle0.png" mode=""></image>
					<image v-show="hasTag==1 || hasTag==-1" src="../../static/images/circle.png" mode=""></image>
					<view class="">否</view>
				</view>
			</view>
			<view class="item">
				<input @input="getDiseaseName" type="text" value="" placeholder="请输入实体医院确诊疾病名称" />
			</view>
		</view>
		<view class="tishi">
			<view class="t_title flex_y_center">
				<image src="../../static/images/tips.png" mode=""></image>
				<view class="">温馨提示：</view>
			</view>
			<view class="t_content">
				<view class="">1.同意将本次就诊信息上传至银川佰年颐堂互联网医院（本院医师可见）。</view>
				<view class="">2.同意医生根据本次就诊信息为患者在线问诊并开具调理方案。</view>
			</view>
		</view>
		<view class="btn flex_all_center">
			<view @click="navigate">下一步</view>
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
				title: "描述病情",
				patient:{
					patientId:'',
					patientName:''
				},
				imgList:[],
				scription:"",
				hasTag:-1,
				diseaseName :'',
				sheetAskAddReq :{
					sheetAskBase : '',
					sheetAskImageList : []
				}
			}
		},
		onLoad(options) {
			this.sheetAskAddReq.sheetAskBase = JSON.parse(options.formData)
			console.log(this.sheetAskAddReq)
		},
		methods: {
			navigate(){
				let sheetAskAddReq = this.sheetAskAddReq
				if(this.patient.patientId == ''){
					uni.showToast({
						title:'请选择就诊人',
						icon:'none'
					})
					return false
				}
				if(this.scription == ''){
					uni.showToast({
						title:'请输入病情描述',
						icon:'none'
					})
					return false
				}
				if(this.imgList.length==0){
					uni.showToast({
						title:'请上传检查报告或患者病处照片',
						icon:'none'
					})
					return false
				}
				if(this.hasTag == -1){
					uni.showToast({
						title:'请选择是否到实体医院就诊过',
						icon:'none'
					})
					return false
				}
				if(this.hasTag == 1 && this.diseaseName == ''){
					uni.showToast({
						title:'请输入实体医院确诊疫病名称',
						icon:'none'
					})
					return false
				}
				sheetAskAddReq.sheetAskBase.patientId = this.patient.patientId
				sheetAskAddReq.sheetAskBase.askDetail = this.scription
				sheetAskAddReq.sheetAskImageList = this.imgList
				sheetAskAddReq.sheetAskBase.hasTag = this.hasTag
				sheetAskAddReq.sheetAskBase.diseaseName  = this.diseaseName 
				uni.navigateTo({
					url:"/pages/confirmDescription/confirmDescription?sheetAskAddReq="+JSON.stringify(sheetAskAddReq)
				})
			},
			getScription(e){
				this.scription = e.detail.value
			},
			getDiseaseName(e){
				this.diseaseName  = e.detail.value
			},
			tagClick(e){
				this.hasTag = e
			},
			upload(){
				const that = this
				let length=0,arr=that.imgList
				console.log(arr)
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
									obj.imgKey  = data.data.url
									obj.sheetId = ''
									length++
									if(length==imgArr.length){
										uni.hideLoading()
									}
									if(data.status==200){
										console.log(arr.length)
										if(arr.length<9){
											arr.push(obj)
											that.imgList = [...arr]
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
	@import "../../static/css/diseaseDescription.scss"
</style>
