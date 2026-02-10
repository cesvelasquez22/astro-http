<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <button v-else-if="likesCount === 0" @click="likePost">Like this post</button>
    <button v-else @click="likePost">Likes {{ likesCount }}</button>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import confetti from "canvas-confetti";
import debounce from "lodash.debounce";
import { actions } from 'astro:actions';

interface Props {
    postId: string;
}

const props = defineProps<Props>();

const likesCount = ref(0);
const clickCount = ref(0);
const isLoading = ref(true);

watch(likesCount, debounce(async () => {
    if (clickCount.value > 0) {
        await actions.updatePostLikes({ postId: props.postId, likes: clickCount.value })
    }

    clickCount.value = 0;
}, 500));

const likePost = async () => {
    likesCount.value++;
    clickCount.value++;

    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: Math.random(),
            y: Math.random() - 0.2
        }
    })
}

const getCurrentLikes = async () => {
    const { data, error } = await actions.getPostLikes(props.postId);

    if (error) {
        return alert(error);
    }
    console.log("getCurrentLikes", data);
    likesCount.value = data.likes;
    isLoading.value = false;
}

getCurrentLikes();

</script>

<style scoped>
button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background-color: #4a3f9a;
}
</style>