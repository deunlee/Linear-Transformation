<template>
    <q-page class="row items-center justify-evenly">
        <div class="full-width row justify-center q-px-lg">
            <ImageCard
                v-for="(card, index) in cards"
                :key="index"
                v-bind="card"
                @click="selectCard(index)"
                class="q-ma-md col-sm-4 col-md-3"
            ></ImageCard>
        </div>

        <P5Graph ref="graph"></P5Graph>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, nextTick } from 'vue';
import ImageCard from 'components/ImageCard.vue';
import P5Graph from 'components/P5Graph.vue';

interface State {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p5: any;
}

export default defineComponent({
    name: 'MainPage',
    components: { ImageCard, P5Graph },
    setup() {
        const state = reactive<State>({
            p5: {},
        });

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
                matrix: [0, -1, 1, 0], // [cos(pi/2), -sin(pi/2), sin(pi/2), cos(pi/2)]
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
            state.p5.setMatrix(cards[index].matrix);
            state.p5.start();
        };

        const graph = ref(null);
        onMounted(() => {
            nextTick(function () {
                // 전체 화면이 렌더링된 이후에 실행된다.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                state.p5 = (graph as any).value.state.p5;
                selectCard(0);
            });
        });
        return { cards, selectCard, graph, ...toRefs(state) };
    },
});
</script>
