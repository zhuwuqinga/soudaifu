var rootPath = ''
if(process.env.NODE_ENV === 'development'){
	rootPath = "/api/"
}else{
	rootPath = "https://api.ycbnyt.com/"
}
e = rootPath, r = {
	healty: {
		cancelLike: e + "healthy/healty/cancelLike",
		doFollow: e + "healthy/healty/doFollow",
		doLike: e + "healthy/healty/doLike",
		getAgreement: e + "healthy/healty/getAgreement",
		getAuscultation: e + "healthy/healty/getAuscultation",
		getExpertInfo: e + "healthy/healty/getExpertInfo",
		getPeriodical: e + "healthy/healty/getPeriodical",
		listAuscultation: e + "healthy/healty/listAuscultation",
		listByInfosName: e + "healthy/healty/listByInfosName",
		listHot: e + "healthy/healty/listHot",
		listHotSubject: e + "healthy/healty/listHotSubject",
		listPeriodical: e + "healthy/healty/listPeriodical",
		listSpecialService: e + "healthy/healty/listSpecialService",
		listExpertInfo: e + "healthy/healty/listExpertInfo",
		listBanner: e + "healthy/banner/listBanner",
	},
	user:{
		getVerifyCode :  e + "user/verifyCode/getVerifyCode",
		sendSms :  e + "user/sms/sendSms",
		validateSms :  e + "user/sms/validateSms",
		register :  e + "user/login/register",
		setPwd :  e + "user/base/setPwd",
		doLogin :  e + "user/login/doLogin",
		listUserOrg :  e + "user/org/listUserOrg",
		listDept :  e + "user/dept/listDept",
		listDoc :  e + "user/doctor/listDoc",
		getDoc :  e + "user/doctor/getDoc",
		getProfile :  e + "user/doctor/getProfile",
		listAskConfig :  e + "user/doctor/listAskConfig",
		listDoctorArticle :  e + "user/doctor/listDoctorArticle",
		getUser :  e + "user/base/get",
		patient_list :  e + "user/patient/list",
		patient_get :  e + "user/patient/get",
		patient_add :  e + "user/patient/add",
		patient_update :  e + "user/patient/update",
		patient_delete :  e + "user/patient/delete",
		uploadFile :  e + "user/upload/uploadFile",
		jsapiPay: e + "user/h5Pres/pres/jsapiPay",
		update: e + "user/base/update",
		logout: e + "user/login/logout",
		listMedicalRecord: e + "user/archives/listMedicalRecord",
		followList: e + "user/follow/listDoc",
		addFollow: e + "user/follow/addFollow",
		cancelFollow: e + "user/follow/cancelFollow",
		cancelFollowByType: e + "user/follow/cancelFollowByType",
		getLogistics: e + "user/logistics/getLogistics",
		getLogisticsBySheetNo: e + "user/logistics/getLogisticsBySheetNo",
		listRefundDesc :  e + "user/pay/listRefundDesc",
	},
	sheetRegister : {
		listDoc :  e + "user/sheetRegister/listDoc",
		listDocRegister :  e + "user/sheetRegister/listDocRegister",
	},
	sheetAsk : {
		create :  e + "user/sheetAsk/create",
		listAsk :  e + "user/sheetAsk/listAsk",
		getDetail :  e + "user/sheetAsk/getDetail",
		
	},
	message : {
		queryJpushMessageHistory : e + "user/jpushmessage/queryJpushMessageHistory",
		queryJpushMessageHistoryInfo : e + "user/jpushmessage/queryJpushMessageHistoryInfo",
	},
	healthRecord : {
		listAll : e + "user/archives/listAll",
		listMedical : e + "user/archives/listMedical",
		addMedical : e + "user/archives/addMedical",
		updateMedical : e + "user/archives/updateMedical",
		getInfos : e + "user/archives/getInfos",
		listDoctor : e + "user/archives/listDoctor",
		updateArchives : e + "user/archives/updateArchives"
	}
}
module.exports = r;