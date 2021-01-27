<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="case_top">
			<swiper @change="swiperChange" class="banner" :indicator-dots="true" indicator-active-color="#00BE72" indicator-color="#ffffff">
				<swiper-item v-for="(item,index) in paientList" :key="index">
					<view class="swiper_item">
						<view class="flex_y_center">
							<view v-text="item.patientName"></view>
							<navigator class="flex_all_center" hover-class="none" url="/pages/patient/patient">
								<image src="../../static/images/edit1.png" mode=""></image>
							</navigator>
						</view>
						<view class="sexText">
							<text v-text="item.sexText"></text>
							<text style="margin-left: 20rpx;" v-text="item.age+'岁'"></text>
							<text style="margin-left: 20rpx;" v-text="item.patientPhone"></text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="top">
				<view class="tab flex">
					<view class="tab_item" @click="tabClick(1)">
						<view :style="tabIndex==1?'color: #00BE72;':''">就诊记录</view>
						<text v-if="tabIndex==1"></text>
					</view>
					<view class="tab_item" @click="tabClick(2)">
						<view :style="tabIndex==2?'color: #00BE72;':''">自建病历</view>
						<text v-if="tabIndex==2"></text>
					</view>
				</view>
				<view class="search_box flex_y_center">
					<view class="search flex_y_center">
						<image src="../../static/images/index_search_icon.png" mode=""></image>
						<input :style="tabIndex==1?'width: 586rpx;':'width: 276rpx;'" type="text" value="" placeholder="请输入就诊科室、医生" />
					</view>
					<navigator :url="'addMedical?patientId='+patient.patientId+'&patientName='+patient.patientName+'&patientPhone='+patient.patientPhone" v-show="tabIndex==2" hover-class="none" class="">新建病历</navigator>
				</view>
				<!-- <view class="types">
					<view class="t_title flex_y_center">
						<view>类型：医生问诊</view>
						<image src="../../static/images/pb_sq_icon.png" mode=""></image>
					</view>
				</view> -->
			</view>
		</view>
		<view class="list">
			<view v-if="tabIndex==1">
				<view class="item" v-for="(item,index) in recordList" :key="index">
					<view class="i_top flex_y_center">
						<view class="dept_name" v-text="item.deptName"></view>
						<text v-text="item.doctorName"></text>
						<text v-text="item.doctorLevel"></text>
						<image src="../../static/images/user3.png" mode=""></image>
						<view v-show="item.buyTag==0" class="it_status">待购药</view>
						<view v-show="item.buyTag==1" class="it_status">已购药</view>
						<view v-show="item.buyTag==2" class="it_status">已过期</view>
						<view v-show="item.buyTag==3" class="it_status">未开方</view>
					</view>
					<view class="i_bot">
						<view class="flex_y_center">
							<view class="ib_title">就 诊 人：</view>
							<view class="text_more">{{item.patientName}} {{item.patientSex}} {{item.patientPhone}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">就诊机构：</view>
							<view class="text_more">{{item.orgName}}-{{item.deptName}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">问诊详情：</view>
							<view class="text_more" v-text="item.askDetail"></view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">是否开方：</view>
							<view class="text_more" v-text="item.prescribeTag==1?'是':'否'"></view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">就诊日期：</view>
							<view class="text_more" v-text="item.createTime"></view>
						</view>
						<navigator hover-class="none" class="i_btn">问诊记录</navigator>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="item2">
					<view class="i_top2 flex_y_center">
						<view>基本健康信息</view>
						<navigator :url="'editHealth?patientId='+patient.patientId" hover-class="none" class="flex_all_center">
							<image src="../../static/images/edit2.png" mode=""></image>
							<view>编辑</view>
						</navigator>
					</view>
					<view class="i_bot">
						<view class="flex_y_center">
							<view class="ib_title">个人信息：</view>
							<view class="text_more">{{patientInfo.userPatientBaseResp.patientName}} {{patientInfo.userPatientBaseResp.sexText}} {{patientInfo.userPatientBaseResp.patientPhone}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">现居住地：</view>
							<view class="text_more">{{patientInfo.personalInfosDTO.province}}{{patientInfo.personalInfosDTO.city}}{{patientInfo.personalInfosDTO.address}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">婚姻状态：</view>
							<view class="text_more">{{patientInfo.personalInfosDTO.marital}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">生育状态：</view>
							<view class="text_more">{{patientInfo.personalInfosDTO.fertile}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">疾 病 史：</view>
							<view class="text_more"></view>
						</view>
					</view>
				</view>
				<view class="item" v-for="(item,index) in medicalList" :key="index">
					<view class="i_top flex_y_center">
						<view class="dept_name" v-text="item.dept"></view>
						<text v-text="item.doctorName"></text>
						<image src="../../static/images/user3.png" mode=""></image>
						<view @click="editClick(item)" class="item_edit flex_all_center">
							<image src="../../static/images/edit2.png" mode=""></image>
							<view>编辑</view>
						</view>
					</view>
					<view class="i_bot">
						<view class="flex_y_center">
							<view class="ib_title">就 诊 人：</view>
							<view class="text_more">{{item.patientName}} {{item.patientPhone}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">就诊机构：</view>
							<view class="text_more">{{item.orgName}}-{{item.dept}}</view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">问诊详情：</view>
							<view class="text_more" v-text="item.medicalDesc"></view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">是否到院就诊：</view>
							<view class="text_more" v-text="item.hasTag==1?'是':'否'"></view>
						</view>
						<view class="flex_y_center">
							<view class="ib_title">就诊日期：</view>
							<view class="text_more" v-text="item.findTime"></view>
						</view>
					</view>
				</view>
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
				title: "我的病历",
				recordList : [],
				paientList : [],
				patientId:'',
				medicalList:[],
				tabIndex:1,
				patient:{
					patientId:'',
					patientName:'',
					patientPhone:'',
					sexText:'',
					idCardNo:'',
					age:''
				},
				patientInfo:{
					userPatientBaseResp : {
						patientName : null
					},
					personalInfosDTO : {
						marital : null,
						fertile : null
					}
				}
			}
		},
		onLoad(options) {
			this.loadPaient()
		},
		onShow() {
			if(this.tabIndex==2){
				this.loadInfo(this.patientId)
			}
		},
		methods: {
			editClick(e){
				uni.setStorageSync('medical_item',JSON.stringify(e))
				uni.navigateTo({
					url:'editMedical'
				})
			},
			swiperChange(e){
				this.patientId = this.paientList[e.detail.current].patientId
				this.patient.patientId = this.paientList[e.detail.current].patientId
				this.patient.patientName = this.paientList[e.detail.current].patientName
				this.patient.patientPhone = this.paientList[e.detail.current].patientPhone
				this.patient.sexText = this.paientList[e.detail.current].sexText
				this.patient.idCardNo = this.paientList[e.detail.current].idCardNo
				this.patient.age = this.paientList[e.detail.current].age
				if(this.tabIndex==1){
					this.loadRecord(this.patientId,'')
				}else{
					this.loadMedical(this.patientId,'')
					this.loadInfo(this.patientId)
				}
			},
			tabClick(e){
				this.tabIndex = e
				if(e==1){
					this.loadRecord(this.patientId,'')
				}else{
					this.loadMedical(this.patientId,'')
					this.loadInfo(this.patientId)
				}
			},
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
							that.patient.patientId = res.data.data[0].patientId
							that.patient.patientName = res.data.data[0].patientName
							that.patient.patientPhone = res.data.data[0].patientPhone
							that.patient.sexText = res.data.data[0].sexText
							that.patient.idCardNo = res.data.data[0].idCardNo
							that.patient.age = res.data.data[0].age
							if(that.tabIndex==1){								that.loadRecord(res.data.data[0].patientId,'')							}else{								that.loadMedical(res.data.data[0].patientId,'')							}
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			// 问诊记录
			loadRecord(patientId,docName){
				const that = this
				uni.request({
					url:that.$api.user.listMedicalRecord,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					method:"post",
					data:{
						"patientId": patientId,
						"docName":docName,
						"type":1
					},
					success:res=>{
						// console.log(res)
						if(res.data.status==200){
							that.recordList = res.data.data
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			// 病历列表
			loadMedical(patientId,docName){
				const that = this
				uni.request({
					url:that.$api.healthRecord.listMedical,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"patientId": patientId,
						"docName":docName
					},
					success:res=>{
						// console.log(res)
						if(res.data.status==200){
							that.medicalList = res.data.data
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			loadInfo(id){
				const that = this
				uni.showLoading({
					title:'正在加载...'
				})
				uni.request({
					url:that.$api.healthRecord.getInfos,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					data:{
						"id": id,
					},
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							let detail = {...res.data.data}
							that.patientInfo = detail
							// console.log(that.patientInfo)
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
	@import "../../static/css/caseHistory.scss"
</style>
