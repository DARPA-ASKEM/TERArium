<script setup lang="ts">
import { XDDArticle, XDDArtifact, XDDExtractionType } from '@/types/XDD';
import IconNoImage32 from '@carbon/icons-vue/es/no-image/32';
import { onMounted, ref, computed } from 'vue';
import { getXDDArtifacts } from '@/services/data';
import { getDocumentDoi } from '@/utils/data-util';

export interface Props {
	article: XDDArticle;
}
const props = defineProps<Props>();
const articleName = computed(() => props.article.title);
const extractionType = ref('');
const artifacts = ref<XDDArtifact[]>([]);
const images = computed(() => artifacts.value.map((a) => a.properties.image));
const shownImage = computed(() => images.value.find((element) => element !== undefined));

const fetchArtifacts = async (doi) => {
	if (doi !== '') {
		const allArtifacts = await getXDDArtifacts(doi);
		// filter out Document extraction type
		artifacts.value = allArtifacts.filter((art) => art.askemClass !== XDDExtractionType.Document);
	} else {
		// note that some XDD documents do not have a valid doi
		artifacts.value = [];
	}
};

onMounted(async () => {
	const doi = await getDocumentDoi(props.article);
	await fetchArtifacts(doi);
	if (artifacts.value.length > 0) {
		extractionType.value = artifacts.value[0].askemClass;
	}
});
</script>
<template>
	<div class="article-card">
		<div class="card-image" v-if="images.length > 0">
			<img id="img" :src="'data:image/jpeg;base64,' + shownImage" :alt="''" />
		</div>
		<div class="card-image" v-else>
			<IconNoImage32 />
		</div>
		<footer>{{ articleName }}</footer>
	</div>
</template>

<style scoped>
.article-card {
	border: 1px solid var(--un-color-body-stroke);
	background-color: var(--un-color-body-surface-primary);
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 15rem;
	min-width: 20rem;
	border-radius: 0.5rem;
	margin: 0.5rem;
	transition: 0.2s;
	text-align: left;
	cursor: pointer;
}

footer {
	border-top: 1px solid var(--un-color-body-stroke);
	padding: 0.5rem 1rem;
}

svg {
	color: var(--un-color-body-text-disabled);
	cursor: pointer;
	margin: auto;
}
.card-image {
	height: inherit;
	min-width: inherit;
	display: inherit;
}
</style>