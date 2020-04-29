<template>
    <div class="container">
        <TitleBarComponent/>
        <MenuBarComponent :tab_index = 2 />

        <div class="user_content">
            <SearchContentComponent
                    :is_search="!m_iAction"
                    :message="!m_iAction ? 'Поиск клиента' : m_iAction == 1 ? 'Добавить клиента' : 'Информация о клиенте'"
                    v-model="searchClientStr" />
            <button v-if="!m_iAction" class="btn__add_element" @click="m_iAction = 1">Добавить</button>
            <button v-else class="btn__return" @click="m_iAction = 0">Вернуться назад</button>

            <div v-if="!m_iAction" class="table__container bg-none">
                <div class="clientblock_info"
                     v-if="clients && clients.length"
                     v-for="client in filtered_clients"
                        @click="openClientInfo(client)"
                >
                    <div :style="{  'background-image': client['photo'] ? 'url(' + client['photo'] + ')' : 'none', opacity: client['photo'] ? 1 : 0 }"></div>
                    <div>
                        <p>Имя Фамилия</p>
                        <p>{{client['first_name']}} {{client['second_name']}}</p>
                    </div>

                    <div></div>
                    <div>
                        <p>Код</p>
                        <p>{{client['client_code']}}</p>
                    </div>
                    <div></div>
                    <div>
                        <p>Номер</p>
                        <p>{{client['phone_number']}}</p>
                    </div>
                </div>
            </div>
            <div v-else-if="m_iAction == 1">
                <div class="client__add__block_info">
                    <AddText :x="406" :y="120" :font_size="15" :clr="'#586370'" :str="'Персональные данные'"/>
                    <AddText :x="406" :y="156" :font_size="14" :clr="'#7A899B'" :str="'Имя'"/>
                    <AddText :x="593" :y="156" :font_size="14" :clr="'#7A899B'" :str="'Фамилия'"/>
                    <AddText :x="406" :y="257" :font_size="15" :clr="'#586370'" :str="'Данные'"/>
                    <AddText :x="406" :y="292" :font_size="14" :clr="'#7A899B'" :str="'Почта'"/>
                    <AddText :x="593" :y="292" :font_size="14" :clr="'#7A899B'" :str="'Телефон'"/>
                    <ImageInput v-model="AddNewClient.avatar" :w="195" :h="272"/>
                    <input type="text" class="input__client_name" placeholder="Введите имя" v-model="AddNewClient.name">
                    <input type="text" class="input__client_second_name" placeholder="Введите фамилию" v-model="AddNewClient.second">
                    <input type="email" class="input__client_mail" placeholder="Введите почту" v-model="AddNewClient.mail">
                    <input type="number" class="input__client_phone" placeholder="Введите телефон" v-model="AddNewClient.phone">
                </div>
                <button class="btn__add_element abonement1" @click="AddNewClientFn">Добавить</button>
            </div>
            <div v-else>
                <div class="client__info__main">
                    <img v-if="selectedClient['photo']" :src="selectedClient['photo']">
                    <p>{{selectedClient['first_name']}} {{selectedClient['second_name']}}</p>
                    <div>
                        <AddLine :x="228" :y="386" :w="1" :h="22" :clr="'#E2E2E2'" />
                        <AddLine :x="228" :y="439" :w="1" :h="22" :clr="'#E2E2E2'" />
                        <AddLine :x="196" :y="423" :w="200" :clr="'#E2E2E2'" />
                        <svg style="position:fixed; left: 196px; top: 386px" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6275 13.9883L15.2992 13.7225C14.74 13.6583 14.19 13.8508 13.7958 14.245L12.1092 15.9317C9.51501 14.6117 7.38834 12.4942 6.06834 9.89082L7.76417 8.19499C8.15834 7.80082 8.35084 7.25082 8.28667 6.69166L8.02084 4.38166C7.91084 3.45582 7.13167 2.75916 6.19667 2.75916H4.61084C3.57501 2.75916 2.71334 3.62082 2.77751 4.65666C3.26334 12.485 9.52417 18.7367 17.3433 19.2225C18.3792 19.2867 19.2408 18.425 19.2408 17.3892V15.8033C19.25 14.8775 18.5533 14.0983 17.6275 13.9883Z" fill="#4E4E60"/>
                        </svg>
                        <svg style="position:fixed; left: 196px; top: 439px" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.66 1.86094C6.07751 1.46677 1.46668 6.0776 1.86084 11.6601C2.19084 16.5093 6.42584 20.1668 11.2842 20.1668H14.6667C15.1708 20.1668 15.5833 19.7543 15.5833 19.2501C15.5833 18.7459 15.1708 18.3334 14.6667 18.3334H11.3025C7.88335 18.3334 4.74835 16.1151 3.89584 12.8059C2.53001 7.48927 7.48001 2.5301 12.7967 3.9051C16.115 4.74844 18.3333 7.88344 18.3333 11.3026V12.3109C18.3333 13.0351 17.6825 13.7501 16.9583 13.7501C16.2342 13.7501 15.5833 13.0351 15.5833 12.3109V11.1651C15.5833 8.86427 13.9517 6.7926 11.6783 6.47177C8.56168 6.0226 5.93084 8.7176 6.49001 11.8526C6.80168 13.6034 8.16751 15.0518 9.90001 15.4643C11.5867 15.8584 13.1908 15.3176 14.245 14.2451C15.0608 15.3634 16.6925 15.9501 18.1867 15.3543C19.415 14.8684 20.1667 13.6126 20.1667 12.2926V11.2934C20.1667 6.42594 16.5092 2.19094 11.66 1.86094ZM11 13.75C9.47833 13.75 8.25 12.5217 8.25 11C8.25 9.47833 9.47833 8.25 11 8.25C12.5217 8.25 13.75 9.47833 13.75 11C13.75 12.5217 12.5217 13.75 11 13.75Z" fill="#4E4E60"/>
                        </svg>

                        <p class="phone">{{selectedClient['phone_number']}}</p>
                        <p class="mail">{{selectedClient['email']}}</p>
                    </div>
                </div>

                <div class="table__container small-info clients">
                    <table class="table__container__abonement">
                        <tr>
                            <td>Тренер</td>
                            <td>Зал</td>
                            <td>Посещение</td>
                        </tr>

                        <tr v-if="selectedClient['more_info']" style="font-size: 11px">
                            <td>{{selectedClient['trainer_info']['full_name']}}</td>
                            <td>{{selectedClient['hall']['name']}}</td>
                            <td>{{selectedClient['abonement']['description']}}</td>
                        </tr>
                    </table>
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
    import ImageInput from "@/components/ImageInput";
    import AddLine from "@/components/render/Line.vue";
    import AddText from "@/components/render/Text.vue";

    export default {
        components : {
            TitleBarComponent,
            MenuBarComponent,
            SearchContentComponent,
            ImageInput,
            AddLine,
            AddText
        },
        data(){
            return {
                m_iAction : 0,
                searchClientStr : '',

                clients : null,
                selectedClient : null,
                AddNewClient : {
                    name : '',
                    second : '',
                    mail : '',
                    phone : '',
                    avatar : null
                }
            }},
        methods : {
            openClientInfo : function (object) {
                this.selectedClient = object;
                this.m_iAction = 2;
            },
            AddNewClientFn() {
                const formData = new FormData()
                formData.append('first_name', this.AddNewClient.name)
                formData.append('second_name', this.AddNewClient.second)
                formData.append('email', this.AddNewClient.mail);
                formData.append('phone_number', this.AddNewClient.phone);
                formData.append('avatar', this.AddNewClient.avatar);

                this.AddNewClient = { name : '', second : '', mail : '', phone : '', avatar : null }

                axios.post('http://176.119.157.108/api/client/create/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(responce => {
                    if(responce.data['status'] == 'success')
                    {
                        this.clients.unshift(responce.data['object'])
                        this.m_iAction = 0
                    }
                })

            }
        },
        computed : {
            filtered_clients()
            {
                if(!this.clients)
                    return null;

                const search_string = this.searchClientStr.toLowerCase();
                return this.clients.filter(function (obj) {
                    return (obj['first_name'].toLowerCase().indexOf(search_string) > -1 ||
                        obj['second_name'].toLowerCase().indexOf(search_string) > -1 ||
                        obj['client_code'].toString().indexOf(search_string) > -1 ||
                        obj['phone_number'].toLowerCase().indexOf(search_string) > -1)
                })
            }
        },
        created() {
            axios.get('http://176.119.157.108/api/clients/list/').then(responce => {
                this.clients = responce.data
            })
        },
        mounted() {
            Array.from(this.$el.getElementsByClassName('table__container')).forEach(element => {
                if(element.scrollHeight > element.clientHeight)
                    element.classList.add('scroll')
                else
                    element.classList.remove('scroll')
            })
        },
        updated() {
            Array.from(this.$el.getElementsByClassName('table__container')).forEach(element => {
                if(element.scrollHeight > element.clientHeight)
                    element.classList.add('scroll')
                else
                    element.classList.remove('scroll')
            })
        }
    }
</script>
