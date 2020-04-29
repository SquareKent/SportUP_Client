<template>
    <div class="search_component__container">


        <input v-if="is_search" class="search_input" type="text" :placeholder="message" @input="updateValue">
        <div v-else class="search_display_text">{{message}}</div>


        <svg v-if="is_search" class="search_logo" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7827 11.2841C12.6017 11.1022 12.3558 11 12.0992 11H11.8266C11.7518 11 11.6799 10.971 11.6261 10.9191C11.516 10.8129 11.5083 10.6397 11.603 10.5196C12.6887 9.14166 13.2333 7.32007 12.91 5.39C12.44 2.61 10.12 0.39 7.32 0.05C3.09 -0.47 -0.47 3.09 0.05 7.32C0.39 10.12 2.61 12.44 5.39 12.91C7.32007 13.2333 9.14166 12.6887 10.5196 11.603C10.6397 11.5083 10.8129 11.516 10.9191 11.6261C10.971 11.6799 11 11.7518 11 11.8266V12.0999C11 12.3561 11.1018 12.6018 11.2829 12.7829L15.25 16.75C15.66 17.16 16.33 17.16 16.74 16.75C17.15 16.34 17.15 15.67 16.74 15.26L12.7827 11.2841ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#8895A3"/>
        </svg>

    </div>
</template>

<script>
    export default {
        props : ['is_search', 'message'],
        methods : {
            updateValue(e) {
                this.$emit('input', e.target.value);
            }
        },
        updated() {
            if(!this.is_search)
                this.$emit('input', '');
        }
    }
</script>
