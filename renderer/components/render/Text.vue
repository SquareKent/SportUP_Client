<template>
    <div style="position: fixed;"
         :style="{
        top: y + 'px',
        left: x + 'px',
        'font-size': font_size + 'px',
        color: clr
    }">{{str}}</div>
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
            str : {
                type: String,
                required: true
            },
            font_size : {
                type: Number,
                default: 13
            },
            clr: {
                type: String,
                default: '#ffffff'
            }
        }
    }
</script>
