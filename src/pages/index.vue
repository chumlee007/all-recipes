<template>
	<div id="index">
		<h1 class="title">Categories ({{ categories.length }})</h1>
		<section :class="['listing',{loading:busy}]">
			<template v-for="(cat, index) in categories">
				<router-link :key="`cat-${index}`" :to="`/${cat.slug}`" class="card">
					<div class="thumb">
						<img :src="cat.thumb" :alt="cat.name" loading="lazy" />
					</div>
					<section>
						<h1>{{ cat.name }}</h1>
					</section>
					<footer>
						<span class="view">View Category</span>
					</footer>
				</router-link>
			</template>
		</section>
	</div>
</template>

<script lang="ts">
import $http from 'axios';
import { normalizeCategories } from '@/utils';
import { Vue, Component } from 'vue-property-decorator';

@Component<Index>({})
export default class Index extends Vue {
	private busy: boolean = true;
	private categories: Category[] = [];

	private async created(): Promise<void> {
		const categories = this.$store.state.categories;
		this.busy = true;

		try {
			if (!categories.length) {
				const { data } = await $http.get('https://www.themealdb.com/api/json/v1/1/categories.php', {
					transformResponse: normalizeCategories
				});

				this.$store.setCategories(data);
				this.categories = data;
			} else {
				this.categories = categories;
			}

			this.busy = false;
		} catch(err) {
			console.log(err);
		}
	}
}
</script>
