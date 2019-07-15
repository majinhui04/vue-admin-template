<template>
    <div class="content">
        <h1>template</h1>
        <div class="block" v-for="(item,index ) in colors" :key="index" :class="item">{{item}}</div>
    </div>
</template>

<script>
    export default {
        name: 'Color',
        props: {},
        data() {
            return {
                colors: ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan']
            };
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
    $blue: #3490dc;
    $indigo: #6574cd;
    $purple: #9561e2;
    $pink: #f66D9b;
    $red: #e3342f;
    $orange: #f6993f;
    $yellow: #ffed4a;
    $green: #38c172;
    $teal: #4dc0b5;
    $cyan: #6cb2eb;
    .block {
        width: 100px;
        height: 30px;
        margin-bottom: 10px;
        color: #FFF;
        line-height: 30px;
        text-align: center;
    }

    .blue {
        background-color: $blue;
    }

    .indigo {
        background-color: $indigo;
    }

    .purple {
        background-color: $purple;
    }

    .pink {
        background-color: $pink;
    }

    .red {
        background-color: $red;
    }

    .orange {
        background-color: $orange;
    }

    .yellow {
        background-color: $yellow;
    }

    .green {
        background-color: $green;
    }

    .teal {
        background-color: $teal;
    }

    .cyan {
        background-color: $cyan;
    }
</style>
