<script setup lang="ts">
import { computed } from 'vue';
import IconClose from '@carbon/icons-vue/es/close/16';

const props = defineProps({
	name: {
		type: String,
		required: true
	},
	index: {
		type: Number,
		required: true
	},
	isActive: {
		type: Boolean,
		default: false
	},
	numTabs: {
		type: Number,
		required: true
	}
});

defineEmits(['clickTabHeader', 'clickTabClose']);

function calcTabWidthPercentage() {
	if (props.numTabs <= 5) {
		return 20;
	}
	return 100 / props.numTabs;
}

const headerStyle = computed(
	() => `left: ${calcTabWidthPercentage() * props.index}%; width: ${calcTabWidthPercentage()}%`
);
const outerContainerStyle = computed(() => `top: ${-100 * props.index}%;`);
</script>

<template>
	<section class="outer-container" :style="outerContainerStyle">
		<header :style="headerStyle">
			<div @click="$emit('clickTabHeader', index)" :class="{ active: isActive }">
				<span class="icon">
					<slot name="tabIcon"></slot>
				</span>
				<span class="name">{{ name }}</span>

				<span>
					<IconClose class="close" @click.stop="$emit('clickTabClose', index)" />
				</span>
			</div>
		</header>
		<section class="content" :class="{ active: isActive }">
			<slot></slot>
		</section>
	</section>
</template>

<style scoped>
@keyframes show-tab {
	0% {
		width: 0%;
	}

	100% {
		width: 100%;
	}
}

header {
	position: relative;
	z-index: 1;
}

div {
	display: inline-flex;
	padding: 0.5rem;
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
	background-color: transparent;
	width: 100%;
	position: relative;
	justify-content: space-between;
	animation: show-tab 0.15s ease forwards;
}

div.active {
	background-color: white;
}

div:hover:not(.active) {
	background-color: var(--un-color-body-surface-secondary);
}

section {
	display: flex;
	flex-direction: column;
}

.outer-container {
	padding: 0.5rem;
	position: relative;
	width: 100%;
	height: 100%;
}

.content {
	background-color: white;
	visibility: hidden;
	z-index: 0;
	flex: 1;
	min-height: 0;
	isolation: isolate;
}

.content.active {
	visibility: visible;
	z-index: 1;
}

span {
	display: inline-flex;
	align-items: center;
}

.name {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: inline;
}

.icon {
	margin-right: 0.5rem;
}

.close {
	border-radius: 8px;
}

.close:hover {
	background-color: var(--un-color-black-20);
}
</style>
