<template>
    <div>
        <div @click="toggleCombo" class="combobox__component" :class="{'shadow' : display_variant}"
             :style="{ width: w + 'px', height: h + 'px', top: y + 'px', left: x + 'px'}">
            <div v-if="!search_string" class="text">{{objects[value]}}</div>
            <input v-else type="text" class="search" @input="display_variant = true" v-model="search.str">

            <svg v-if="search_string" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9166 11.6667H12.2582L12.0249 11.4417C13.0249 10.275 13.5416 8.68335 13.2582 6.99168C12.8666 4.67501 10.9332 2.82501 8.59991 2.54168C5.07491 2.10835 2.10824 5.07501 2.54158 8.60001C2.82491 10.9333 4.67491 12.8667 6.99158 13.2583C8.68324 13.5417 10.2749 13.025 11.4416 12.025L11.6666 12.2583V12.9167L15.2082 16.4583C15.5499 16.8 16.1082 16.8 16.4499 16.4583C16.7916 16.1167 16.7916 15.5583 16.4499 15.2167L12.9166 11.6667ZM7.91654 11.6666C5.84154 11.6666 4.16654 9.99165 4.16654 7.91665C4.16654 5.84165 5.84154 4.16665 7.91654 4.16665C9.99154 4.16665 11.6665 5.84165 11.6665 7.91665C11.6665 9.99165 9.99154 11.6666 7.91654 11.6666Z" fill="#79899B"/>
            </svg>

            <div v-if="search_string" class="divide"></div>

            <svg class="arrow"  :class="{'up' : display_variant}"
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.71 11.71L11.3 14.3C11.69 14.69 12.32 14.69 12.71 14.3L15.3 11.71C15.93 11.08 15.48 10 14.59 10H9.41C8.52 10 8.08 11.08 8.71 11.71Z" fill="#79899B"/>
            </svg>
        </div>


        <div v-if="display_variant" class="combobox__selector small-scroll"
             :style="{ width: w + 'px', 'max-height': maximum_size * h + 2 + 'px', top: y + h + 6 + 'px', left: x + 'px'}">
            <div class="btn" :style="{'height': h + 'px'}" v-for="object in filter_search"
                 @click="selectObject(object)" >
                <div class="text">{{object}}</div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        props: {
            value : {
                type: Number,
                required: true
            },
            objects : {
                type: Array,
                required: true
            },
            search_string : {
                type: Boolean,
                default: false
            },
            size : {
                type: Number,
                default: 3
            },
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
                default: 162
            },
            h: {
                type: Number,
                default: 40
            },
        },
        data() {
            return {
                display_variant : false,
                timeStampClick : 0,
                search : {
                    str : ''
                }
            }
        },
        methods : {
            toggleCombo(e) {
                if(this.search_string && this.display_variant)
                    if(e.target.className == "search")
                        return;

                this.timeStampClick = e.timeStamp;
                this.display_variant = !this.display_variant;
            },
            selectObject(object) {
                if(!this.objects)
                    return;

                const idx = this.objects.indexOf(object);
                if(idx > -1) {
                    this.$emit('input', idx);
                    this.search.str = object;
                }
            },
            mouseEvent(e) {
                if(this.search_string && this.display_variant)
                    if(e.target.className == "search")
                        return;

                if(this.display_variant && this.timeStampClick != e.timeStamp)
                    this.display_variant = false;
            }
        },
        mounted() {
            document.body.addEventListener('click', this.mouseEvent)
        },
        computed : {
            filter_search () {
                if(!this.objects)
                    return null;

                if(!this.search_string)
                    return this.objects;

                const string_to_search = this.search.str.toLowerCase();
                return this.objects.filter(function (obj) {
                    return obj.toLowerCase().indexOf(string_to_search) > -1
                })
            },
            maximum_size() {
                return (this.filter_search && this.filter_search.length > 0) ? (this.filter_search.length > this.size ? this.size : this.filter_search.length) : 0;
            }
        },
        beforeDestroy() {
            document.body.removeEventListener('click', this.mouseEvent)
        }
    }
</script>
