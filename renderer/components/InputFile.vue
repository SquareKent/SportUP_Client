<template>
    <div class="input_file__container" :style="{ top : y + 'px', left : x + 'px' }">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.575 11.7133C21.7817 7.68829 18.2467 4.66663 14 4.66663C10.6283 4.66663 7.7 6.57996 6.24167 9.37996C2.73 9.75329 0 12.7283 0 16.3333C0 20.195 3.13833 23.3333 7 23.3333H22.1667C25.3867 23.3333 28 20.72 28 17.5C28 14.42 25.6083 11.9233 22.575 11.7133ZM16.3333 15.1666V19.8333H11.6667V15.1666H8.16667L13.5917 9.74162C13.825 9.50829 14.1867 9.50829 14.42 9.74162L19.8333 15.1666H16.3333Z" fill="#7A899B"/>
        </svg>

        <p>JPG, GIF or PNG.</p>

    </div>
</template>

<script>
    export default {
        props : {
            x : {
                type : Number,
                required : true,
            },
            y : {
                type : Number,
                required : true,
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
    }
</script>
