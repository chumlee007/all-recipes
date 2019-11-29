<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
	box-sizing: border-box;
	padding: 80px;

	@media #{$md} {
		padding-left: 120px;
		padding-right: 120px;
		margin: 0 auto;
	}
}
</style>
