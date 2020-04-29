<template>
    <div class="title_bar__container">
        <div class="title_bar__block">
            <div class="title_bar__block__text">SportUp</div>

            <svg @click="minimize"
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                 style="position: fixed; top: 5px; left: 734px; cursor: pointer">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 15H16.6667C17.125 15 17.5 14.625 17.5 14.1667C17.5 13.7083 17.125 13.3333 16.6667 13.3333H3.33333C2.875 13.3333 2.5 13.7083 2.5 14.1667C2.5 14.625 2.875 15 3.33333 15Z" fill="#A2A2AD"/>
            </svg>


            <svg @click="close"
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                style="position: fixed; top: 5px; left: 765px; cursor: pointer">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2604 4.75833C14.9361 4.43333 14.4122 4.43333 14.0879 4.75833L10.0218 8.825L5.95564 4.75C5.63135 4.425 5.10749 4.425 4.7832 4.75C4.4589 5.075 4.4589 5.6 4.7832 5.925L8.84934 10L4.7832 14.075C4.4589 14.4 4.4589 14.925 4.7832 15.25C5.10749 15.575 5.63135 15.575 5.95564 15.25L10.0218 11.175L14.0879 15.25C14.4122 15.575 14.9361 15.575 15.2604 15.25C15.5847 14.925 15.5847 14.4 15.2604 14.075L11.1942 10L15.2604 5.925C15.5764 5.60833 15.5764 5.075 15.2604 4.75833Z" fill="#F55C66"/>
            </svg>
        </div>
        <div class="title_bardragble" style="-webkit-app-region: drag;"></div>
    </div>

</template>

<script>
    //style="-webkit-app-region: drag;"

    export default {
        methods : {
            minimize() {
                require('electron').remote.getCurrentWindow().minimize()
            },
            close() {
                require('electron').remote.getCurrentWindow().close()
            }
        }
    }
</script>

<style scoped>

</style>
