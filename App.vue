<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// uni.clearStorageSync()
			let user_id = uni.getStorageSync('user_info').userId
			if(user_id==''){
				uni.navigateTo({
					url:'/pages/login/login?type=1'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			
		}
	}
</script>

<style lang="scss" >
	/*每个页面公共css */
	@import './static/css/style.scss'
	
</style>
