<template>
    <q-btn-dropdown stretch flat label="About">
        <q-list>
            <q-item clickable v-close-popup class="q-mt-sm" href="https://github.com/deunlee" target="_blank">
                <q-item-section avatar>
                    <q-avatar icon="fa-solid fa-user" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Made by Deun Lee</q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable v-close-popup href="https://github.com/deunlee/Linear-Transformation" target="_blank">
                <q-item-section avatar>
                    <q-avatar icon="fa-brands fa-github" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>View on GitHub</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Version: {{ version }}</q-item-label>
        </q-list>
    </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import packageInfo from '../../package.json';

export default defineComponent({
    setup() {
        return {
            version: computed(() => `${packageInfo.version} (${packageInfo.versionDate})`),
        };
    },
});
</script>

