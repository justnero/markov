<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <v-title name="Прямая Марковская модель"
                 action-save
                 @save="mode => save(mode)"/>
        <v-actions :can-step="!isTested"
                   :can-normalize="!isTested"
                   can-test
                   can-clear
                   @test="test"
                   @step="step"
                   @normalize="normalize"
                   @clear="clear"/>
        <v-settings-row :fields="fieldsConfig"
                        v-model="settings"/>
        <div class="row">
            <div class="col col-xs-12">
                <matrix-table namespace="direct/model"
                              :size="settings.size"/>
            </div>
            <div class="col col-xs-12 text-xs-center text-right">
                <model namespace="direct/model"
                       ref="model"
                       :size="settings.size"/>
            </div>
        </div>
        <chains :transitions="transitions"/>
    </main>
</template>

<script>
    import vTitle from '@/components/ui/vTitle'
    import vActions from '@/components/ui/vActions'
    import VSettingsRow from "@/components/ui/vSettingsRow"
    import MatrixTable from '@/components/matrix/Table'
    import Model from '@/components/Model'
    import Chains from '@/components/Chains'
    import {saveAs} from 'file-saver'
    import {extractSvg, svg2image} from '@/util/svg'

    export default {
        name: 'DirectMode',
        components: {vTitle, vActions, VSettingsRow, MatrixTable, Model, Chains},
        computed: {
            settings: {
                get() {
                    return {
                        size: this.$store.state.direct.model.size,
                        steps: this.$store.state.direct.steps,
                        chains: this.$store.state.direct.chains,
                    };
                },
                set(value) {
                    const mutations = {
                        size: 'direct/model/resize',
                        steps: 'direct/setSteps',
                        chains: 'direct/setChains',
                    };
                    Object.keys(mutations)
                        .forEach(key => {
                            if (this.settings[key] !== value[key]) {
                                this.$store.commit(mutations[key], value[key]);
                            }
                        });
                },
            },
            fieldsConfig() {
                return [
                    {
                        name: 'size',
                        label: 'Размерность модели',
                        min: 2,
                    },
                    {
                        name: 'steps',
                        label: 'Максимальнное количество шагов',
                        min: 2,
                        max: null,
                    },
                    {
                        name: 'chains',
                        label: 'Количество цепочек',
                        max: null,
                    },
                ];
            },
            transitions() {
                return this.$store.state.direct.model.chains;
            },
            isTested() {
                return this.$store.state.direct.model.current === -1;
            },
        },
        methods: {
            async save(what) {
                let blob = false;
                let fileName = false;
                switch (what) {
                    case 'xlsx':
                        // noinspection JSIgnoredPromiseFromCall
                        this.$store.dispatch('direct/save');
                        break;
                    case 'svg':
                        saveAs(
                            new Blob([extractSvg(this.$refs.model.$refs.svg)], {type: "image/svg+xml;charset=utf-8"}),
                            'model.svg'
                        );
                        break;
                    case 'png':
                        svg2image(this.$refs.model.$refs.svg, blob => {
                            saveAs(blob, 'model.png');
                        });
                        break;
                }
                if (blob && fileName) {
                    saveAs(blob, fileName);
                }
            },
            async test() {
                return this.$store.dispatch('direct/test');
            },
            async step() {
                return this.$store.dispatch('direct/model/step');
            },
            async normalize() {
                return this.$store.dispatch('direct/model/normalize');
            },
            async clear() {
                return this.$store.dispatch('direct/model/clear');
            },
        },
    }
</script>
