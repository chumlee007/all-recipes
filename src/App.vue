<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
	box-sizing: border-box;
	padding: 40px 10px;

	@media #{$md} {
		padding: 80px 120px;
		margin: 0 auto;
	}
}
</style>
