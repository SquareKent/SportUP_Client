<template>
    <div style="position: fixed" :style="{ width: w + 'px', height: h + 'px', top: y + 'px', left: x + 'px', background: clr }"></div>
</template>

<script>
    export default {
        props : {
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            w: {
                type: Number,
                default: 1
            },
            h: {
                type: Number,
                default: 1
            },
            clr: {
                type: String,
                required: true
            }
        }
    }
</script>
