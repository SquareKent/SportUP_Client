<template>
    <div class="container">
        <TitleBarComponent/>
        <MenuBarComponent :tab_index = 0 />

        <div class="user_content">
            <SearchContentComponent :is_search="m_iAction == 0" :message="m_iAction == 0 ? 'Поиск' : 'Добавить Абонемент'" v-model="search" />
            <button v-if="m_iAction != 1" class="btn__add_element" @click="m_iAction = 1">Добавить</button>
            <button v-else class="btn__return" @click="m_iAction = 0">Вернуться назад</button>

            <div class="table__container" v-bind:class="{'short' : m_iAction == 1}">
                <table v-if="m_iAction == 0" class="table__container__abonement">
                    <tr>
                        <td>Имя Фамилия</td>
                        <td>Посещение</td>
                        <td>Цена</td>
                        <td>Зал</td>
                    </tr>
                    <tr v-if="AbonementsData != null && AbonementsData.length > 0"
                        v-for = "Object in filtered_abonements">
                        <td>{{Object['name']}}</td>
                        <td>{{Object['description']}}</td>
                        <td class="money">{{getMoneyString(Object['price'])}}р.</td>
                        <td>{{Object['hall']}}</td>
                    </tr>

                    <AddText v-if="!filtered_abonements || !filtered_abonements.length" :x="438" :y="285" :font_size="16" :clr="'#8895A3'" :str="'Не найдено'"></AddText>

                </table>
                <div v-else>


                    <ComboBox v-if="Combo.client_names && Combo.client_codes && Combo.client_names.length" :x="196" :y="175" :w="300" :size="5" v-model="AddAbonement.ClientID" :objects="Combo.client_names" :search_string="true"/>
                    <ComboBox :x="388" :y="312" v-model="AddAbonement.Poseshenie" :objects="Combo.poseshenie"/>
                    <ComboBox v-if="Combo.halls && Combo.codes && Combo.halls.length" :x="580" :y="312" v-model="AddAbonement.Hall" :objects="Combo.halls"/>
                    <input type="number" class="abonement__money_input" placeholder="Сумма" v-model="AddAbonement.Sum" @input="validateSum">
                    <AddLine :x="196" :y="236" :w="574" :clr="'#F0F0F0'" />
                    <AddLine :x="196" :y="372" :w="574" :clr="'#F0F0F0'" />
                    <AddLine :x="278" :y="322" :h="20" :clr="'#E5E5E5'" />
                    <AddText :x="196" :y="121" :font_size="15" :clr="'#586370'" :str="'Персональные данные'"/>
                    <AddText :x="196" :y="155" :font_size="14" :clr="'#7A899B'" :str="'Имя Фамилия Клиента'"/>
                    <AddText :x="196" :y="292" :font_size="14" :clr="'#7A899B'" :str="'Стоимость'"/>
                    <AddText :x="388" :y="292" :font_size="14" :clr="'#7A899B'" :str="'Посещение'"/>
                    <AddText :x="580" :y="292" :font_size="14" :clr="'#7A899B'" :str="'Код зала'"/>
                    <AddText :x="289" :y="326" :font_size="13" :clr="'#B6B6C5'" :str="'Руб/Мес'"/>


                    <button @click="AddAbonementThenBack" class="btn__add_element abonement1">Добавить</button>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import TitleBarComponent from '@/components/TitleBar.vue'
    import MenuBarComponent from '@/components/MenuBar.vue'
    import SearchContentComponent from "@/components/SearchContent.vue";
    import ComboBox from "@/components/ComboBox.vue";
    import AddLine from "@/components/render/Line.vue";
    import AddText from "@/components/render/Text.vue";

    export default {
        components : {
            TitleBarComponent,
            MenuBarComponent,
            SearchContentComponent,
            AddLine,
            AddText,
            ComboBox
        },
        data(){return {
            AbonementsData : null,
            search : '',
            m_iAction : 0,

            Combo : {
                poseshenie : ['1 раз в неделю', '2 раза в неделю', '3 раза в неделю'],
                halls : null,
                codes : null,

                client_names : null,
                client_codes : null
                //testArray2 : ['Павел Дуров #1337', 'Владимир Путин #1111', 'Иван Павлов #2222', 'Владимир Елагин #1488', 'Безымяный Безымяный #2228', 'Алексей Навальный #3333'],
            },

            AddAbonement : {
                Sum : '350.00',
                Poseshenie : 0,
                Hall : 0,
                ClientID : -1
            },


        }},
        methods : {
            getMoneyString : function (amount) {
                const negativeSign = amount < 0 ? "-" : "";
                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(2)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;
                return negativeSign + (j ? i.substr(0, j) + " " : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ',')
                    +  ',' + Math.abs(amount - i).toFixed(2).slice(2);
            },

            validateSum : function () {
                var idx = this.AddAbonement.Sum.indexOf(".");
                if(idx > -1 && this.AddAbonement.Sum.length - idx > 2) {
                    this.AddAbonement.Sum = parseFloat(this.AddAbonement.Sum).toFixed(2);
                }

                if(parseInt(this.AddAbonement.Sum) > 9999999)
                    this.AddAbonement.Sum = 9999999;
            },

            AddAbonementThenBack() {
                if(this.AddAbonement.ClientID == -1)
                    return;


                axios.get('http://176.119.157.108/api/subs/create/', {
                    params : {
                        'client_code' : this.Combo.client_codes[this.AddAbonement.ClientID],
                        'code_hall' : this.Combo.codes[this.AddAbonement.Hall],
                        'price' : this.AddAbonement.Sum,
                        'description' : this.Combo.poseshenie[this.AddAbonement.Poseshenie]
                    }
                }).then(responce => {
                    this.AbonementsData.unshift(responce.data);
                    this.m_iAction = 0;
                })

                this.AddAbonement.ClientID = -1;
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
        },
        computed :
        {
            filtered_abonements()
            {
                if(!this.AbonementsData)
                    return null;

                const search_string = this.search.toLowerCase();
                return this.AbonementsData.filter(function (obj) {
                    return (obj['name'].toLowerCase().indexOf(search_string) > -1 ||
                        obj['description'].toLowerCase().indexOf(search_string) > -1 ||
                        obj['hall'].toLowerCase().indexOf(search_string) > -1)
                })
            }
        },
        created()
        {
            axios.get('http://176.119.157.108/api/subscriptions/all/').then(responce => {
                this.AbonementsData = responce.data
            })

            axios.get('http://176.119.157.108/api/halls/all_names/').then(responce => {
                this.Combo.halls = responce.data['names'];
                this.Combo.codes = responce.data['codes'];
            })

            axios.get('http://176.119.157.108/api/clients/all_names/').then(responce => {
                this.Combo.client_names = responce.data['names'];
                this.Combo.client_codes = responce.data['codes'];
            })


        }
    }
</script>
