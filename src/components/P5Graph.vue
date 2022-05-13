<template>
    <div id="p5-container"></div>
</template>

<script>
import createP5 from '../scripts/sketch.js';
import { defineComponent, reactive, onMounted } from 'vue';

export default defineComponent({
    setup() {
        // function mouseDown() {
        //     state.p5.background('red');
        //     state.p5.ellipse(0, 0, 100, 100);
        // }
        const state = reactive({
            p5: {},
        });

        onMounted(() => {
            state.p5 = createP5('#p5-container', 600, 480);
        });
    },
});
</script>

<style scoped>
#p5-container {
    width: 600px;
    height: 480px;
    background-color: black;
}
</style>
