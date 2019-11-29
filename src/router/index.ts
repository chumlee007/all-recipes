import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/pages/index.vue';
import Meals from '@/pages/:category/index.vue';
import Recipe from '@/pages/:category/:recipe.vue';
import _404 from '@/pages/_404.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index,
	},
	{
		path: '/:category/:recipe',
		name: 'recipe',
		component: Recipe,
	},
	{
		path: '/:category',
		name: 'meals',
		component: Meals,
	},
	{
		path: '',
		name: '_404',
		component: _404,
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
