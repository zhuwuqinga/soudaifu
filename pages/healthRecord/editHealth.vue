<template>
	<view class="container">
		<Header :title="title" :status="1"></Header>
		<view class="list">
			<view class="item flex">
				<view class="title">患者信息：</view>
				<view class="right_text">{{detail.userPatientBaseResp.patientName}} {{detail.userPatientBaseResp.sexText}}  {{detail.userPatientBaseResp.age}}岁</view>
			</view>
			<view class="item flex">
				<view class="title">身份证号：</view>
				<view class="right_text" v-text="detail.userPatientBaseResp.idCardNo"></view>
			</view>
			<view class="item flex">
				<view class="title">手 机 号：</view>
				<view class="right_text" v-text="detail.userPatientBaseResp.patientPhone"></view>
			</view>
		</view>
		<!-- 个人信息 -->
		<view class="list" style="margin-top: 10rpx;">
			<view class="first flex_y_center" @click="firstClick('first_child')">
				<view>个人信息</view>
				<image v-if="!first_child" src="../../static/images/index_open_icon.png" mode=""></image>
				<image v-else src="../../static/images/index_collect_icon.png" mode=""></image>
			</view>
			<view class="seccound" v-show="first_child">
				<view class="sd_item flex_y_center">
					<view class="title">婚姻状态：</view>
					<picker :range="maritalList" @change="getMarital">
						<view :style="detail.personalInfosDTO.marital?'color:#333;':'color:#CECECE;'">{{detail.personalInfosDTO.marital?detail.personalInfosDTO.marital:'请选择'}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">生育状态：</view>
					<picker :range="fertileList" @change="getFertile">
						<view :style="detail.personalInfosDTO.fertile?'color:#333;':'color:#CECECE;'">{{detail.personalInfosDTO.fertile?detail.personalInfosDTO.fertile:'请选择'}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">国&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;籍：</view>
					<picker :range="countryList" @change="getCountry">
						<view :style="detail.personalInfosDTO.country?'color:#333;':'color:#CECECE;'">{{detail.personalInfosDTO.country?detail.personalInfosDTO.country:'请选择'}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</view>
					<input class="unit_input" @input="getNation" type="text" :value="detail.personalInfosDTO.nation?detail.personalInfosDTO.nation:''" placeholder="请输入民族" placeholder-style="color:#CECECE;"/>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">我的地址：</view>
					<view style="color:#CECECE;margin-left: auto;font-size: 24rpx;">请选择</view>
					<image class="icon_right" src="../../static/images/user3.png" mode=""></image>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">详细地址：</view>
					<input class="txt_input" type="text" @input="getAddress" :value="detail.personalInfosDTO.address?detail.personalInfosDTO.address:''" placeholder="请输入街道、小区、门牌号" placeholder-style="color:#CECECE;"/>
				</view>
			</view>
		</view>
		<!-- 基本数据 -->
		<view class="list" style="margin-top: 10rpx;">
			<view class="first flex_y_center" @click="firstClick('seccound_child')">
				<view>基本数据</view>
				<image v-if="!seccound_child" src="../../static/images/index_open_icon.png" mode=""></image>
				<image v-else src="../../static/images/index_collect_icon.png" mode=""></image>
			</view>
			<view class="seccound" v-show="seccound_child">
				<view class="sd_item flex_y_center">
					<view class="title">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：</view>
					<input style="margin-right: 0;" class="unit_input" type="digit" @input="getHeight" :value="detail.patientBaseDateDTO.height?detail.patientBaseDateDTO.height:''" placeholder="请输入" placeholder-style="color:#CECECE;"/>
					<view class="unit">cm</view>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</view>
					<input style="margin-right: 0;" class="unit_input" type="digit" @input="getWeight" :value="detail.patientBaseDateDTO.weight?detail.patientBaseDateDTO.weight:''" placeholder="请输入" placeholder-style="color:#CECECE;"/>
					<view class="unit">kg</view>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</view>
					<picker :range="bloodList" range-key="name" @change="getblood">
						<view :style="detail.patientBaseDateDTO.blood?'color:#333;':'color:#CECECE;'">{{detail.patientBaseDateDTO.blood?bloodList[detail.patientBaseDateDTO.blood-1].name:'请选择'}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;压：</view>
					<input class="txt_input" type="text" @input="getWaist" :value="detail.patientBaseDateDTO.waist?detail.patientBaseDateDTO.waist:''" placeholder="高压/低压" placeholder-style="color:#CECECE;"/>
				</view>
			</view>
		</view>
		<!-- 健康状况 -->
		<view class="list" style="margin-top: 10rpx;">
			<view class="first flex_y_center" @click="firstClick('third_child')">
				<view>健康状况</view>
				<image v-if="!third_child" src="../../static/images/index_open_icon.png" mode=""></image>
				<image v-else src="../../static/images/index_collect_icon.png" mode=""></image>
			</view>
			<view class="seccound" v-show="third_child">
				<view class="sd_item flex_y_center" style="padding-top: 20rpx;"> 
					<view class="title">疾&nbsp;&nbsp;病&nbsp;&nbsp;史：</view>
					<scroll-view scroll-x="true" class="medical_list">
						<!-- <view class="medical_item">
							<view>高血压</view>
							<image src="../../static/images/evaluate_close_icon.png" mode=""></image>
						</view> -->
					</scroll-view>
					<navigator hover-class="none" url="addDisease" class="add_img flex_y_center">
						<view class="">新增</view>
						<image src="../../static/images/add_person.png" mode=""></image>
					</navigator>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">过&nbsp;&nbsp;敏&nbsp;&nbsp;史：</view>
					<view class="medical_list flex_wrap">
						
					</view>
					<view class="add_img flex_y_center">
						<view class="">新增</view>
						<image src="../../static/images/add_person.png" mode=""></image>
					</view>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">家&nbsp;&nbsp;族&nbsp;&nbsp;史：</view>
					<view class="medical_list flex_wrap">
						
					</view>
					<view class="add_img flex_y_center">
						<view class="">新增</view>
						<image src="../../static/images/add_person.png" mode=""></image>
					</view>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">手术外伤史：</view>
					<view class="medical_list flex_wrap">
						
					</view>
					<view class="add_img flex_y_center">
						<view class="">新增</view>
						<image src="../../static/images/add_person.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 个人习惯和身体状况 -->
		<view class="list" style="margin-top: 10rpx;">
			<view class="first flex_y_center" @click="firstClick('forth_child')">
				<view>个人习惯和身体状态</view>
				<image v-if="!forth_child" src="../../static/images/index_open_icon.png" mode=""></image>
				<image v-else src="../../static/images/index_collect_icon.png" mode=""></image>
			</view>
			<view class="seccound" v-show="forth_child">
				<view class="sd_item flex_y_center">
					<view class="title">吸&nbsp;&nbsp;烟&nbsp;&nbsp;史：</view>
					<picker :range="smokeList" range-key="name" @change="getSmoke">
						<view :style="detail.habitsDTO.smoke===''?'color:#CECECE;':'color:#333;'">{{detail.habitsDTO.smoke===''?'请选择':smokeList[detail.habitsDTO.smoke].name}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">饮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;酒：</view>
					<input style="margin-right: 0;" @input="getDrink" class="unit_input" type="digit" :value="detail.habitsDTO.drink===''?'':detail.habitsDTO.drink" placeholder="请输入" placeholder-style="color:#CECECE;"/>
					<view class="unit">年</view>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">饮酒频率：</view>
					<picker :range="drinkTypeList" range-key="name" @change="getDrinkType">
						<view :style="detail.habitsDTO.drinkType===''?'color:#CECECE;':'color:#333;'">{{detail.habitsDTO.drinkType===''?'请选择':drinkTypeList[detail.habitsDTO.drinkType].name}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">睡眠质量：</view>
					<picker :range="sleepList" range-key="name" @change="getSleep">
						<view :style="detail.habitsDTO.sleep===''?'color:#CECECE;':'color:#333;'">{{detail.habitsDTO.sleep===''?'请选择':sleepList[detail.habitsDTO.sleep].name}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">运动频率：</view>
					<picker :range="sportList" range-key="name" @change="getSport">
						<view :style="detail.habitsDTO.sport===''?'color:#CECECE;':'color:#333;'">{{detail.habitsDTO.sport===''?'请选择':sportList[detail.habitsDTO.sport].name}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item">
					<view class="">运动方式（多选）：</view>
					<!-- <view class="choice_list flex_wrap">
						<view class="choice_item flex_y_center">
							<image src="../../static/images/circle.png" mode=""></image>
							<view>散步</view>
						</view>
					</view> -->
					<view class="other flex_y_center">
						<image v-if="detail.habitsDTO.sportType===''" src="../../static/images/circle.png" mode=""></image>
						<image v-else src="../../static/images/circle0.png"></image>
						<input type="text" @input="getSportType" :value="detail.habitsDTO.sportType===''?'':detail.habitsDTO.sportType" placeholder="其他请输入" placeholder-style="color:#cecece;"/>
					</view>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">运动时长：</view>
					<picker :range="sportTimeList" @change="getSportTime">
						<view :style="detail.habitsDTO.sportTime===''?'color:#CECECE;':'color:#333;'">{{detail.habitsDTO.sportTime===''?'请选择':detail.habitsDTO.sportTime}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item flex_y_center">
					<view class="title">饮食结构：</view>
					<picker :range="dietList" @change="getDiet">
						<view :style="detail.habitsDTO.diet===''?'color:#CECECE;':'color:#333;'">{{detail.habitsDTO.diet===''?'请选择':detail.habitsDTO.diet}}</view>
						<image src="../../static/images/user3.png" mode=""></image>
					</picker>
				</view>
				<view class="sd_item">
					<view class="">饮食口味（多选）：</view>
					<!-- <view class="choice_list flex_wrap">
						<view class="choice_item flex_y_center">
							<image src="../../static/images/circle.png" mode=""></image>
							<view>散步</view>
						</view>
					</view> -->
					<view class="other flex_y_center">
						<image v-if="detail.habitsDTO.dietType===''" src="../../static/images/circle.png" mode=""></image>
						<image v-else src="../../static/images/circle0.png"></image>
						<input type="text" @input="getDietType" :value="detail.habitsDTO.dietType===''?'':detail.habitsDTO.dietType" placeholder="其他请输入" placeholder-style="color:#cecece;"/>
					</view>
				</view>
			</view>
		</view>
		<view class="btn flex_all_center">
			<view @click="save">保存</view>
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
				patientId:'',
				title: "",
				paientList : [],
				detail:{
					userPatientBaseResp: {
						patientName : ''
					},
					personalInfosDTO : {
						marital : '',
						fertile : ''
					},
					patientBaseDateDTO : {
						height : '',
						weight : '',
						waist : '',
						blood : ''
					},
					habitsDTO : {
						smoke : '',
						dietType : '',
						drinkType :'',
						sleep : '',
						sport : '',
						sportTime : '',
						diet : '',
						sportType : ''
					}
				},
				first_child:false,
				seccound_child:false,
				third_child:false,
				forth_child:false,
				maritalList:['未婚','已婚','丧偶'],
				fertileList:['未育','已育'],
				countryList : ['中国','外国'],
				bloodList : [{'id':1,'name':'O型'},{'id':2,'name':'A型'},{'id':3,'name':'B型'},{'id':4,'name':'AB型'},{'id':5,'name':'其他'}],
				smokeList : [{'id':0,'name':'从未吸烟'},{'id':1,'name':'当前吸烟'},{'id':2,'name':'戒烟'},{'id':3,'name':'不详'}],
				drinkTypeList : [{'id':0,'name':'从不'},{'id':1,'name':'经常'},{'id':2,'name':'偶尔'}],
				sleepList : [{'id':0,'name':'良好'},{'id':1,'name':'经常失眠'},{'id':2,'name':'偶尔失眠'}],
				sportList : [{'id':0,'name':'从不'},{'id':1,'name':'经常'},{'id':2,'name':'偶尔'}],
				sportTimeList : ['30分钟','60分钟','120分钟'],
				dietList : ['一菜一汤','一荤一素','两荤一素','三菜一汤','满汉全席']
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'正在加载...'
			})
			this.patientId = options.patientId
			this.loadData(options.patientId)
		},
		onShow() {

		},
		methods: {
			save(){
				const that = this
				let detail = {...this.detail}
				detail.patientId  = this.patientId
				detail.habitsDTO.patientId  = this.patientId
				detail.patientBaseDateDTO.patientId  = this.patientId
				detail.personalInfosDTO.patientId  = this.patientId
				delete detail.diseaseDTO
				delete detail.userPatientBaseResp
				// console.log(detail)
				uni.showLoading({
					title:'正在提交...'
				})
				uni.request({
					url:that.$api.healthRecord.updateArchives,
					header:{
						"token" : uni.getStorageSync('user_info').token
					},
					method:'post',
					data:detail,
					success:res=>{
						// console.log(res)
						uni.hideLoading()
						if(res.data.status==200){
							uni.showToast({
								title:'保存成功！'
							})
							that.loadData(that.patientId)
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			firstClick(e){
				if(e=='first_child'){
					this.first_child = !this.first_child
				}else if(e=='seccound_child'){
					this.seccound_child = !this.seccound_child
				}else if(e=='third_child'){
					this.third_child = !this.third_child
				}else if(e=='forth_child'){
					this.forth_child = !this.forth_child
				}
			},
			
			loadData(id){
				const that = this
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
							for(let key in detail.habitsDTO){
								if(detail.habitsDTO[key]==null){
									detail.habitsDTO[key] = ''
								}
							}
							for(let key in detail.patientBaseDateDTO){
								if(detail.patientBaseDateDTO[key]==null){
									detail.patientBaseDateDTO[key] = ''
								}
							}
							for(let key in detail.personalInfosDTO){
								if(detail.personalInfosDTO[key]==null){
									detail.personalInfosDTO[key] = ''
								}
							}
							that.detail = detail
							console.log(that.detail)
						}else if(res.data.status==1001){
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			
			getMarital(e){
				this.detail.personalInfosDTO.marital = this.maritalList[e.detail.value]
			},
			getFertile(e){
				this.detail.personalInfosDTO.fertile = this.fertileList[e.detail.value]
			},
			getCountry(e){
				this.detail.personalInfosDTO.country = this.countryList[e.detail.value]
			},
			getNation(e){
				this.detail.personalInfosDTO.nation = e.detail.value
			},
			getAddress(e){
				this.detail.personalInfosDTO.address = e.detail.value
			},
			getHeight(e){
				this.detail.patientBaseDateDTO.height = e.detail.value
			},
			getWeight(e){
				this.detail.patientBaseDateDTO.weight = e.detail.value
			},
			getWaist(e){
				this.detail.patientBaseDateDTO.waist = e.detail.value
			},
			getblood(e){
				this.detail.patientBaseDateDTO.blood = this.bloodList[e.detail.value].id
			},
			
			getSmoke(e){
				this.detail.habitsDTO.smoke = this.smokeList[e.detail.value].id
			},
			getDrink(e){
				this.detail.habitsDTO.drink = e.detail.value
			},
			getDrinkType(e){
				this.detail.habitsDTO.drinkType = this.drinkTypeList[e.detail.value].id
			},
			getSleep(e){
				this.detail.habitsDTO.sleep = this.sleepList[e.detail.value].id
			},
			getSport(e){
				this.detail.habitsDTO.sport = this.sportList[e.detail.value].id
			},
			getSportType(e){
				this.detail.habitsDTO.sportType = e.detail.value
			},
			getSportTime(e){
				this.detail.habitsDTO.sportTime = this.sportTimeList[e.detail.value]
			},
			getDiet(e){
				this.detail.habitsDTO.diet = this.dietList[e.detail.value]
			},
			getDietType(e){
				this.detail.habitsDTO.dietType = e.detail.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/editMedical.scss"
</style>
