<template>
    <div class="container">
        <TitleBarComponent/>
        <MenuBarComponent :tab_index = 1 />

        <div class="user_content">

            <SearchContentComponent :is_search="!m_iAction" :message="!m_iAction ? 'Поиск зала' : 'Добавить зал'" v-model="searchHallStr" />
            <button v-if="!m_iAction" class="btn__add_element" @click="m_iAction = 1">Добавить зал</button>
            <button v-else class="btn__return" @click="m_iAction = 0">Вернуться назад</button>


            <div class="table__container bg-none" :class="{'short' : m_iAction}">
                <div class="halls_grid" v-if="!m_iAction">
                    <div class="hall_object" v-for="(hall, index) in filteredHalls" @click="SetupInfoAboutPage(hall)">
                        <img :src="hall.preview" width="191" height="125">
                        <p>{{hall.name}}</p>
                    </div>
                </div>
                <div v-else-if="m_iAction == 1">
                    <InputImage v-model="newHall.file"/>
                    <div class="hall__add_block_info">
                        <AddText :x="406" :y="115" :font_size="15" :clr="'#586370'" :str="'Название и и описание'"/>
                        <AddText :x="406" :y="150" :font_size="14" :clr="'#7A899B'" :str="'Название'"/>
                        <AddText :x="406" :y="230" :font_size="14" :clr="'#7A899B'" :str="'Описание'"/>
                        <input type="text" class="input__halls__create__name" v-model="newHall.name">
                        <textarea type="text" class="input__halls__create__name description small-scroll" v-model="newHall.description"/>
                    </div>
                    <button class="btn__add_element abonement1" @click="sendNewHall">Добавить</button>
                </div>
                <div v-else>
                    <div class="hall__info__avatar_block">
                        <img :src="selectedObject['preview']">
                        <p>{{selectedObject['name']}}</p>
                    </div>


                    <div class="hall__info__description small-scroll">
                        {{selectedObject['description']}}
                    </div>


                    <div class="table__container small-info">
                        <table class="table__container__abonement">
                            <tr>
                                <td>Имя Фамилия</td>
                                <td>Посещение</td>
                            </tr>

                            <tr v-if="selectedObjectClientsInfo != null && selectedObjectClientsInfo.length > 0"
                                    v-for="client in selectedObjectClientsInfo">
                                <td>{{client['first_name']}} {{client['second_name']}}</td>
                                <td>{{client['posesheniye']}}</td>
                            </tr>
                        </table>
                    </div>

                </div>

            </div>



        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import TitleBarComponent from '@/components/TitleBar.vue'
    import MenuBarComponent from '@/components/MenuBar.vue'
    import SearchContentComponent from "@/components/SearchContent";
    import InputFileComponent from "@/components/InputFile.vue";
    import InputImage from "@/components/ImageInput.vue";
    import AddLine from "@/components/render/Line.vue";
    import AddText from "@/components/render/Text.vue";

    export default {
        components : {
            TitleBarComponent,
            MenuBarComponent,
            SearchContentComponent,
            InputFileComponent,
            InputImage,
            AddLine,
            AddText
        },
        data(){
            return {
                m_iAction : 0,
                m_vecHalls : null,
                searchHallStr : '',

                newHall : {
                    name : '',
                    description : '',
                    file : null
                },

                selectedObject : null,
                selectedObjectClientsInfo : null
            }},
        methods : {

            SetupInfoAboutPage : function(Object) {
                this.selectedObject = Object;
                this.selectedObjectClientsInfo = null;
                this.m_iAction = 2;

                axios.get('http://176.119.157.108/api/halls/get/paid_clients/', {
                    params : {
                        code : Object['hall_code']
                    }
                }).then(responce => {
                    this.selectedObjectClientsInfo = responce.data;
                    console.log(this.selectedObjectClientsInfo);
                })
            },
            sendNewHall() {
                if(this.newHall.name == '')
                    return;

                const formData = new FormData()
                formData.append('name', this.newHall.name)
                formData.append('description', this.newHall.description)
                formData.append('image', this.newHall.file);

                this.newHall.name = '';
                this.newHall.description = '';
                this.newHall.file = null;


                axios.post('http://176.119.157.108/api/halls/create/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(responce => {
                    if(responce.data['status'] == 'success')
                    {
                        this.m_vecHalls.unshift(responce.data['object'])
                        this.m_iAction = 0
                    }
                })
            }
        },
        computed : {
            filteredHalls() {
                if(!this.m_vecHalls)
                    return null;

                const search_string = this.searchHallStr.toLowerCase();
                return this.m_vecHalls.filter(function (obj) {
                    return obj['name'].toLowerCase().indexOf(search_string) > -1
                })
            }
        },
        mounted()
        {
            Array.from(this.$el.getElementsByClassName('table__container')).forEach(element => {
                if(element.scrollHeight > element.clientHeight)
                    element.classList.add('scroll')
                else
                    element.classList.remove('scroll')
            })
        },
        updated()
        {
            Array.from(this.$el.getElementsByClassName('table__container')).forEach(element => {
                if(element.scrollHeight > element.clientHeight)
                    element.classList.add('scroll')
                else
                    element.classList.remove('scroll')
            })

            Array.from(this.$el.getElementsByClassName('table__container')).forEach(element => {
                if(element.scrollHeight > element.clientHeight)
                    element.classList.add('scroll')
                else
                    element.classList.remove('scroll')
            })
        },
        created() {
            axios.get('http://176.119.157.108/api/halls/all/').then(responce => {
                this.m_vecHalls = responce.data
            })
        }
    }
</script>
