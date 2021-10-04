<template>
    <section>
        <div id='app' class="container">
            <v-card class="mx-auto" color="#F0FEFF"   >
                <v-form v-model="valid" class="ma-3" >
                    <v-row dense>
                        <v-col cols="3" md="20">
                            <v-select  v-model="gubunName"  :items="gubunNameItems"   item-text="gubunName"  label="업체 구분"  multi-line ></v-select>
                            <v-text-field v-model="companyName" label="회사명" required></v-text-field>
                            <v-text-field v-model="companyNo" label="사업자번호" required></v-text-field>
                            <v-text-field v-model="bossName" label="대표자명" required></v-text-field>
                        </v-col>
                         <v-col cols="3" md="20">
                            <v-text-field v-model="articleName" label="품목명" required></v-text-field>
                            <v-text-field v-model="telNo" label="회사전화번호" required></v-text-field>
                            <v-text-field v-model="hpNo" label="휴대전화번호" required></v-text-field>
                            <v-text-field v-model="emailAddr" label="이메일주소" :rules="emailRules" required></v-text-field>
                        </v-col>
                         <v-col cols="3" md="20">
                            <v-text-field v-model="homePage" label="홈페이지" required></v-text-field>
                            <v-text-field v-model="faxNo" label="팩스번호" required></v-text-field>
                            <v-text-field v-model="address" label="주소" required></v-text-field>
                            <v-text-field v-model="managerName" label="관리자명" required></v-text-field> 
                        </v-col>
                         <v-col cols="3" md="20">   
                            <v-text-field v-model="managerTelNo" label="관리자 전화번호" required></v-text-field>
                            <v-text-field v-model="managerHpNo" label="관리자 휴대번호" required></v-text-field>
                            <v-text-field v-model="managerEmail" label="관리자 이메일주소" :rules="emailRules" required></v-text-field>
                            
                            <v-row justify="right">      
                                <div class="btn-group" role="group" aria-label="Basic example" >                            
                                    <v-btn  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-search fa-lm pr-3"
                                        aria-hidden="true" v-on:click="getVendorInfo()"></i>조회</v-btn>                            
                                    <v-btn type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-plus-square fa-lm pr-3"
                                        aria-hidden="true" v-on:click="putVendorInfo()"></i>저장</v-btn>
                                    <v-btn type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-window-close fa-lm pr-3"
                                        aria-hidden="true" v-on:click="cancelVendorInfo()"></i>취소</v-btn>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <br/>
            <v-card id='listArea'>
                <v-data-table
                    :headers="headers"
                    :items="vendorList"
                ></v-data-table>
            </v-card>
        </div>
    </section>
    
</template>

<script>
    export default {
        name: 'DatatablePage',
        vendorCode: null,
        components: {},
        data() {
            return {
                headers:[
                    {text: 'Name',align: 'center',sortable: false,value: 'Name'},
                    {text: 'Boss',align: 'center',sortable: false,value: 'Boss'},
                    {text: 'Addr',align: 'center',sortable: false,value: 'Addr'},
                    {text: 'Tel',align: 'center',sortable: false,value: 'Tel'},
                    {text: 'Manager',align: 'center',sortable: false,value: 'Mgr'}
                ],
                valid : false,
                vendorUrl : '/api/vendor',
                vendorList:[],
                gubunNameItems:["고객사","협력사"],
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 25) || 'Name must be less than 25 characters',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        created() {
            this.getVendorInfo();
        },
        mounted() {
            this.EventBus.$on('getVendorList', vendorName => {
                this.getVendorInfo(vendorName);
            });
        },
        methods : {
            checkAdminKey : function() {
                let url = this.APIURL + this.vendorUrl;
                this.$http.post(url, {key:this.adminKey} /*, config */).then ( ret => {
                    if(ret.status == 200){
                        this.EventBus.isAdmin = true;
                        let url = this.APIURL + '/api/getEmpInfo';
                        this.$http.get(url , null /*, config */).then ( ret=> {
                        this.empInfos = ret.data;
                        });      
                    }
                });
            },

            // 거래처 정보 조회
            getVendorInfo : function(vendorName){
                var url = this.APIURL + this.vendorUrl + "/getVendorList";
                alert(url);
                // 거래처 이름 조건이 입력이 된경우에는 이름을 파라미터로 넘기도록.
                if(vendorName){
                    url += "/getVendorInfo/vendorName="+vendorName
                }else{
                   // eslint-disable-next-line
                }

                this.$http.get(url, null).then(resultData => {
                    this.vendorList = resultData.data;
                })
            },

            // 거래처 정보 등록
            putVendorInfo: function(){
                var url = this.APIURL + this.vendorUrl + "/insertVendor";
                this.$http.post(url, null); 
            }
        } 
    }
</script>