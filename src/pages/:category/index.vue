<template>
	<div id="meals">
		<h1 class="title"><router-link to="/">Home</router-link> / Meals ({{meals.length}})</h1>
		<section :class="['listing',{loading:busy}]">
			<template v-for="(meal, index) in meals">
				<router-link :key="`meal-${index}`" :to="`/${categorySlug}/${meal.id}`" class="card">
					<div class="thumb">
						<img :src="meal.thumb" :alt="meal.name" loading="lazy" />
					</div>
					<section>
						<h1>{{ meal.name }}</h1>
					</section>
					<footer>
						<span class="view">View Meal</span>
					</footer>
				</router-link>
			</template>
		</section>
	</div>
</template>

<script lang="ts">
import $http from 'axios';
import { normalizeMeals } from '@/utils';
import { Vue, Component } from 'vue-property-decorator';

@Component<Meals>({})
export default class Meals extends Vue {
	private busy: boolean = true;
	private meals: Meal[] = [];

	private get categorySlug(): string {
		return this.$route.params.category;
	}

	private async created(): Promise<void> {
		const meals = this.$store.state.categoriesByMeal;
		this.busy = true;

		try {
			if (!meals.hasOwnProperty(this.categorySlug)) {
				const { data } = await $http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.categorySlug}`, {
					transformResponse: normalizeMeals
				});

				this.$store.addCategory(this.categorySlug, data);
				this.meals = data;
			} else {
				this.meals = meals[this.categorySlug];
			}

			this.busy = false;
		} catch(err) {
			console.log(err);
		}
	}
}
</script>
