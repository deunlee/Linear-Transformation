<template>
    <q-page class="row items-center justify-evenly">
        <image-card
            v-for="(card, index) in cards"
            :key="index"
            v-bind="card"
            @click="selectCard(index)"
        ></image-card>
    </q-page>
</template>

<script lang="ts">
import ImageCard from 'components/ImageCard.vue';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'MainPage',
    components: { ImageCard },
    setup() {
        const cards = reactive([
            {
                title: 'Shearing',
                image: 'canvas.png',
                selected: false,
                matrix: [2, 1, 1, 2],
            },
            {
                title: 'Rotation',
                image: 'canvas.png',
                selected: false,
                matrix: [0, -1, 1, 0],
                // [cos(pi/2), -sin(pi/2), sin(pi/2), cos(pi/2)]
            },
            {
                title: 'Permutation',
                image: 'canvas.png',
                selected: false,
                matrix: [0, 1, 1, 0],
            },
            {
                title: 'Projection',
                image: 'canvas.png',
                selected: false,
                matrix: [1, 2, 2, 4], // projection on a vector [1, 2]
                // x-axis [1, 0, 0, 0]
            },
        ]);

        const selectCard = (index: number) => {
            cards.forEach((e) => (e.selected = false));
            cards[index].selected = true;
        };

        selectCard(0);

        return { cards, selectCard };
    },
});
</script>
