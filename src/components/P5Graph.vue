<template>
    <div id="p5-container" class="rounded-borders shadow-3"></div>
</template>

<script>
import createP5 from '../scripts/sketch.js';
import { defineComponent, reactive, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
    setup() {
        const state = reactive({
            p5: {},
        });

        onMounted(() => {
            state.p5 = createP5('#p5-container', 600, 480);
            console.log(state.p5);
            state.p5.start();
        });
        onBeforeUnmount(() => {
            console.log('P5Graph: onBeforeUnmount()');
            state.p5.remove();
        });

        return { state };
    },
});
</script>

<style>
#p5-container {
    width: 600px;
    height: 480px;
    background-color: black;
}
#p5-container > canvas { /* scoped 사용하지 말 것 */
    border-radius: inherit;
}
</style>
