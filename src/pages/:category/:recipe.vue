<template>
	<div id="recipe">
		<h1 class="title"><router-link to="/">Home</router-link> / <router-link :to="`/${categorySlug}`">Meals</router-link> / {{ name }}</h1>
		<div class="recipe">
			<div v-if="image" class="image">
				<img :src="image" :alt="name" loading="lazy" />
			</div>
			<h2>Instructions</h2>
			<p>{{ instructions }}</p>
			<h2>Ingredients</h2>
			<table>
				<thead>
					<tr>
						<th>Ingredient</th>
						<th>Measure</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(ingredient, index) in ingredients">
						<tr :key="`ingredient-${index}`">
							<td>{{ ingredient.ingredient }}</td>
							<td>{{ ingredient.measure }}</td>
						</tr>
					</template>
				</tbody>
			</table>
			<h2>Source</h2>
			<a :href="source" target="_black" rel="noopener">{{ source }}</a>
		</div>
	</div>
</template>

<script lang="ts">
import $http from 'axios';
import { normalizeRecipe } from '@/utils';
import { Vue, Component } from 'vue-property-decorator';

@Component<Recipe>({})
export default class Recipe extends Vue {
	private image: string|null = null;
	private name: string = '';
	private instructions: string = '';
	private source: string = '';
	private busy: boolean = true;
	private ingredients: any[] = [];

	private get categorySlug(): string {
		return this.$route.params.category;
	}

	private get recipeId(): string {
		return this.$route.params.recipe;
	}

	private async created(): Promise<void> {
		const recipes = this.$store.state.recipes;
		let recipe = null;
		this.busy = true;

		try {
			if (!recipes.hasOwnProperty(this.recipeId)) {
				const { data } = await $http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.recipeId}`, {
					transformResponse: normalizeRecipe
				});

				recipe = data[0];
				this.$store.addRecipe(recipe.id, recipe);
			} else {
				recipe = recipes[this.recipeId];
			}

			this.image = recipe.thumb;
			this.name = recipe.name;
			this.instructions = recipe.instructions;
			this.source = recipe.source;
			this.ingredients = recipe.ingredients;

			this.busy = false;
		} catch(err) {
			console.log(err);
		}
	}
}
</script>

<style lang="scss">
#recipe {
	.image {
		border: 1px solid black;
		width: 320px;
		height: 320px;
		overflow: hidden;
		margin-bottom: 2em;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			object-position: left center;
		}
	}
}
</style>
