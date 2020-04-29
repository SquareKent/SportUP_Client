<template>
    <div class="container">
        <TitleBarComponent/>
        <MenuBarComponent :tab_index = 4 />

        <div class="user_content">
            Учет
        </div>


    </div>
</template>

<script>
    //import axios from 'axios'
    import TitleBarComponent from '@/components/TitleBar.vue'
    import MenuBarComponent from '@/components/MenuBar.vue'

    export default {
        components : {
            TitleBarComponent,
            MenuBarComponent
        },
        data(){
            return {

            }},
        methods : {



        },
        created() {

        }
    }
</script>
