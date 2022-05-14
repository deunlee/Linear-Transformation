<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="./icons/favicon-128x128.png" />
                    </q-avatar>
                    Linear-Transformation Visualization
                </q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainLayout',

    setup() {
        return {};
    },
});
</script>

<style scoped>
.q-layout {
    background: rgb(240, 240, 240);
}
</style>
