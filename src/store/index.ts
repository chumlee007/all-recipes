import Vue from 'vue';

const Store: Store = {
	state: {
		categories: [] as Category[],
		categoriesByMeal: {} as any,
		recipes: {} as any,
	},
	setCategories(categories: Category[]): void {
		this.state.categories = categories;
	},
	addCategory(slug: string, meals: Meal[]): void {
		this.state.categoriesByMeal[slug] = meals;
	},
	addRecipe(id: string|number, recipe: Recipe): void {
		this.state.recipes[id] = recipe;
	}
}

Object.defineProperties(Vue.prototype, {
	$store: { get() { return Store; }}
})

export default Store;
