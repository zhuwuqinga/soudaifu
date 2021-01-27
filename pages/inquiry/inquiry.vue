<template>
	<view class="container">
		<Header :title="title"></Header>
	</view>
</template>

<script>
	import Header from '../../components/header/Header.vue'
	export default {
		components: {
		    Header
		},
		data() {
			return {
				title: '何玲医生'
			}
		},
		onLoad() {
		
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
