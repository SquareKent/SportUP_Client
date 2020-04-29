<template>
    <div>
        <div class="input_img_block"
             :style="{left : x + 'px', top : y + 'px', width : w + 'px', height : h + 'px'}">
            <div class="img__container" v-if="!image_src" @click="InputFile">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 9.99994V7.49994H1.25C0.5625 7.49994 0 6.93744 0 6.24994C0 5.56244 0.5625 4.99994 1.25 4.99994H3.75V2.49994C3.75 1.81244 4.3125 1.24994 5 1.24994C5.6875 1.24994 6.25 1.81244 6.25 2.49994V4.99994H8.75C9.4375 4.99994 10 5.56244 10 6.24994C10 6.93744 9.4375 7.49994 8.75 7.49994H6.25V9.99994C6.25 10.6874 5.6875 11.2499 5 11.2499C4.3125 11.2499 3.75 10.6874 3.75 9.99994ZM16.25 21.25C14.1789 21.25 12.5 19.571 12.5 17.5C12.5 15.4289 14.1789 13.75 16.25 13.75C18.3211 13.75 20 15.4289 20 17.5C20 19.571 18.3211 21.25 16.25 21.25ZM26.25 7.49995C27.625 7.49995 28.75 8.62495 28.75 9.99995V25C28.75 26.375 27.625 27.5 26.25 27.5H6.25C4.875 27.5 3.75 26.375 3.75 25V12.15C4.125 12.3625 4.5375 12.5 5 12.5C6.375 12.5 7.5 11.375 7.5 9.99995V8.74995H8.75C10.125 8.74995 11.25 7.62495 11.25 6.24995C11.25 5.78745 11.1125 5.37495 10.9 4.99995H18.9C19.6 4.99995 20.275 5.29995 20.7375 5.81245L22.2875 7.49995H26.25ZM16.25 23.75C19.7 23.75 22.5 20.95 22.5 17.5C22.5 14.05 19.7 11.25 16.25 11.25C12.8 11.25 10 14.05 10 17.5C10 20.95 12.8 23.75 16.25 23.75Z" fill="#9AABBD"/>
                </svg>
            </div>
            <img v-else :src="image_src" alt="hall image" @click="InputFile">

            <button @click="InputFile">Загрузить</button>
        </div>
    </div>
</template>

<script>
   // import { dialog } from 'electron';


    export default {
        name: "ImageInput",
        props: {
            value : {
                required: true
            },
            x : {
                type : Number,
                default : 181,
            },
            y : {
                type : Number,
                default : 100,
            },
            w : {
                type : Number,
                default : 191,
            },
            h : {
                type : Number,
                default : 177,
            }

        },

        data() {
            return {
                image_src : '',
                image_reader : null
            }
        },
        methods : {

            OnInputFile(e) {
                e.preventDefault();
                this.image_src = '';
                this.image_reader.readAsDataURL(e.path[0].files[0]);
                this.$emit('input', e.path[0].files[0]);
            },

            OnDrop(e) {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if(file.type != 'image/png' &&
                    file.type != 'image/gif' &&
                    file.type != 'image/jpeg' &&
                    file.type != 'image/jpg') {
                    return;
                }
                this.image_src = '';
                this.image_reader.readAsDataURL(file);
                this.$emit('input', file);
            },

            InputFile(e) {
                let InputFile = document.createElement('input');
                InputFile.type = 'file';
                InputFile.accept = "image/png, image/gif, image/jpeg, image/jpg";
                InputFile.onchange = this.OnInputFile;
                InputFile.click();
            }
        },
        mounted() {
            //console.log(this.$el.getElementsByClassName('input_img_block')[0]);

            this.image_reader = new FileReader()
            this.image_reader.onloadend = (e) =>{
                this.image_src = this.image_reader.result;
            };

            const dropArea =this.$el.getElementsByClassName('input_img_block')[0];
            dropArea.addEventListener('dragenter', function(e){e.preventDefault()});
            dropArea.addEventListener('dragleave', function(e){e.preventDefault()});
            dropArea.addEventListener('dragover', function(e){e.preventDefault();});
            dropArea.addEventListener('drag', function(e){e.preventDefault()});
            dropArea.addEventListener('drop', this.OnDrop);

        },
        beforeDestroy() {
            const dropArea =this.$el.getElementsByClassName('input_img_block')[0];
            dropArea.removeEventListener('dragenter', function(e){e.preventDefault()});
            dropArea.removeEventListener('dragleave', function(e){e.preventDefault()});
            dropArea.removeEventListener('dragover', function(e){e.preventDefault()});
            dropArea.removeEventListener('drag', function(e){e.preventDefault()});
            dropArea.removeEventListener('drop', this.OnDrop);
        }
    }
</script>
