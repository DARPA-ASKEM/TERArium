<template>
	<ArtifactList
		:artifacts="datasets"
		:selected-artifact-ids="[datasetId.toString()]"
		@artifact-clicked="openDatasetPage"
		@remove-artifact="removeDataset"
	/>
</template>

<script setup lang="ts">
/**
 * Dataset Sidebar Panel
 * Display a file tree like structure of datasets available in the current Project.
 */

import { useRouter } from 'vue-router';
import useResourcesStore from '@/stores/resources';
import { onMounted, ref } from 'vue';
import { deleteAsset } from '@/services/project';
import { ProjectAssetTypes } from '@/types/Project';
import { RouteName } from '@/router/routes';
import { Dataset } from '@/types/Dataset';
import ArtifactList from './artifact-list.vue';

const router = useRouter();
const resourcesStore = useResourcesStore();

const datasetId = ref<string | number>('');
const datasets = ref<Dataset[]>([]);

const openDatasetPage = async (id: string | number) => {
	// pass this dataset id as param
	datasetId.value = id; // track selection
	router.push({
		name: RouteName.DatasetRoute,
		params: { projectId: resourcesStore.activeProject?.id, assetId: id }
	});
};

const removeDataset = async (id: string | number) => {
	// remove the dataset from the project assets
	if (resourcesStore.activeProject && resourcesStore.activeProjectAssets) {
		const assetsType = ProjectAssetTypes.DATASETS;
		deleteAsset(resourcesStore.activeProject.id, assetsType, id);
		// remove also from the local cache
		resourcesStore.activeProject.assets[ProjectAssetTypes.DATASETS] =
			resourcesStore.activeProject.assets[ProjectAssetTypes.DATASETS].filter(
				(modId) => modId !== id
			);
		resourcesStore.activeProjectAssets[ProjectAssetTypes.DATASETS] =
			resourcesStore.activeProjectAssets[ProjectAssetTypes.DATASETS].filter((a) => a.id !== id);
		datasets.value = resourcesStore.activeProjectAssets[ProjectAssetTypes.DATASETS];
	}

	// if the user deleted the currently selected dataset, then clear its content from the view
	if (id === datasetId.value) {
		// clear the dataset ID as a URL param
		router.push({
			name: RouteName.DatasetRoute,
			params: { projectId: resourcesStore.activeProject?.id, assetId: '' }
		});
	}
};

onMounted(() => {
	// get the list of datasets associated with this project and display them
	const datasetsInCurrentProject = resourcesStore.activeProjectAssets?.datasets;
	if (datasetsInCurrentProject) {
		datasets.value = datasetsInCurrentProject;
	}
});
</script>
