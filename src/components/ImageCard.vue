<template>
    <q-card
        class="img-card noselect"
        :class="{ 'glowing-item': selected }"
        v-ripple:white
    >
        <q-img :src="getImageUrl(image)">
            <div class="img-card-title absolute-bottom text-h6" v-if="title">
                {{ title }}
            </div>
        </q-img>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ImageCard',
    props: {
        title: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const getImageUrl = (image: string) => {
            return require('../assets/' + image);
        };

        return {
            getImageUrl,
        };
    },
});
</script>

<style scoped>
.img-card {
    min-width: 200px;
    cursor: pointer;
}

.img-card-title {
    background: rgba(147, 147, 147, 0.6);
}

/* https://cssbud.com/css-generator/css-glow-generator/ */
.glowing-item {
    -webkit-box-shadow: 0px 0px 11px 2px rgba(250, 117, 0, 0.9);
    -moz-box-shadow: 0px 0px 11px 2px rgba(250, 117, 0, 0.9);
    box-shadow: 0px 0px 11px 2px rgba(250, 117, 0, 0.9);
    transition: box-shadow 0.3s;
}
</style>
