<template>

  <v-data-table :headers="headers" :items="DeliveryInfo" sort-by="NO"  class="elevation-1">
    <template v-slot:top>
      <template>        
        <v-card class="mx-auto center" dense style="height:80px;padding-top:0px" color="indigo lighten-4">        
          <v-list-item>             
            <v-list-item-title style="max-width:80px;min-width:80px"><p class="font-weight-black">출고 관리</p></v-list-item-title>
              <v-container style="max-width:100%">
                <v-row dense> 
                  <v-card class="mx-auto align-end" style="height:60px;padding-top:0px;" color="indigo lighten-5">
                   <v-row>                    
                      <v-col md="2" style="height:30px;padding-top:0px">                 
                        <v-select v-model="delivery_gbn" :items="delivery_gbn_options"  label="구분" single ></v-select>
                      </v-col>
                      <v-col md="2" style="height:30px;padding-top:0px">
                        <v-text-field model="company_nm" label="회사명"></v-text-field>
                      </v-col>
                      <v-col md="2" style="height:30px;padding-top:0px">
                        <v-menu ref="sDateMenu" v-model="sDateMenu" :close-on-content-click="false" :return-value.sync="sDate"
                          transition="scale-transition" offset-y min-width="190px">
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              label="출고시작일"
                              v-model="sDate" 
                              prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                              readonly
                              v-on="on"
                              style="width:200px;padding-top:-10px"
                            ></v-text-field>               
                          </template>
                          <v-date-picker v-model="sDate" no-title scrollable>
                            <div class="flex-grow-2"></div>
                            <v-btn text color="primary" @click="sDateMenu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.sDateMenu.save(sDate)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>  
                      </v-col>                   
                      <v-col md="2" style="height:30px;padding-top:0px">   
                        <v-menu ref="eDateMenu" v-model="eDateMenu" :close-on-content-click="false" :return-value.sync="eDate"
                          transition="scale-transition" offset-y min-width="190px">
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              label="출고종료일"
                              v-model="eDate" 
                              prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                              readonly
                              v-on="on"
                              style="width:200px;padding-top:-10px"
                            ></v-text-field>               
                          </template>
                          <v-date-picker v-model="eDate" no-title scrollable>
                            <div class="flex-grow-2"></div>
                            <v-btn text color="primary" @click="eDateMenu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.eDateMenu.save(eDate)">OK</v-btn>
                          </v-date-picker> 
                        </v-menu> 
                      </v-col>                  
                      <v-col md="2" style="height:30px;padding-top:0px">
                        <v-btn  class="btn btn-outline-deep-blue btn-rounded waves-effect">
                            <i class="fas fa-search fa-lm pr-3" aria-hidden="true">
                              </i>조회
                        </v-btn>
                      </v-col>     

                      <v-col md="2" style="height:38px;padding-top:0px">
                        <v-btn  @click="deliveryDialog=true" class="btn btn-outline-deep-red btn-rounded waves-effect">
                            <i class="fas fa-plus fa-lm pr-3" aria-hidden="true">
                              </i>신규등록
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-col style="height:38px;padding-top:0px">
                   <!-- 매입 신규 등록 Dialog-->
  
                    <v-dialog v-model="deliveryDialog"  scrollable max-width="800px">
                      <v-container fluid white dense style="width: 100%; padding: 5px; margin-right: auto; margin-left: auto;">
                      <v-card-title>
                              출고 신규 등록             
                      </v-card-title>
                      <v-card >
                        <v-row >
                          <v-col cols="4" class="ms-0" >
                            <v-select  v-model="deliveryGbnList"  :items="purchaseGbnListItems"   item-text="purchaseGbnName"  dense label="매입 구분 선택"  multi-line ></v-select>
                            <v-select  v-model="customerNameList"  :items="customerListItems"   item-text="customerName"  dense label="구매업체 선택"  multi-line ></v-select>
                            <v-text-field v-model="customerId" :counter="20" label="사업자번호" dense ></v-text-field>
                            <v-text-field v-model="goodsName" label="물품명 입력" dense required></v-text-field>
                            <v-text-field v-model="goodsId" label="물품코드 입력" dense required></v-text-field>
                            
                          </v-col>
                          <v-col cols="4" class="ms-0" >
                            <v-text-field v-model="goodsCnt" label="출고수량" dense required></v-text-field>
                            <v-text-field v-model="unit" label="단위" dense required></v-text-field>
                            <v-col cols="12" md="20" style="height:70px;padding-top:0px">
                            <v-menu ref="paidDateMenu" v-model="paidDateMenu" :return-value.sync="paidDate" :close-on-content-click="false" 
                              transition="scale-transition" offset-y min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  label="출고일"
                                  v-model="paidDate" 
                                  prepend-icon="<i class='fa fa-calendar-alt prefix' small/>"
                                  readonly
                                  v-on="on"
                                  style="width:250px;padding-top:-10px"
                                  dense 
                                ></v-text-field>               
                              </template>
                              <v-date-picker v-model="deliveryDate" no-title dense scrollable>
                                <div class="flex-grow-1"></div>
                                <v-btn text color="primary" @click="deliveryDateMenu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.deliveryDateMenu.save(peliveryDate)">OK</v-btn>
                              </v-date-picker> 
                            </v-menu>  
                            </v-col>
                            <v-select  v-model="deliveryManagerList"  :items="deliveryManagerListItems"   item-text="deliveryManagerName"   label="출고 담당자"  multi-line dense></v-select>
                                                       
                           </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn dense color="blue darken-1" text @click="pop_projectIdRegistered = false">Close</v-btn>
                          <v-btn dense color="blue darken-1" text @click="pop_projectIdRegistered = false">Save</v-btn>
                        </v-card-actions>        
                      </v-card> 
                  </v-container>   
                  </v-dialog>
                  </v-col>
                </v-row>
            </v-container>
          </v-list-item>
        </v-card>
      </template>
    </template>
    <!-- template v-slot 에러 발생하여 임시로 막음 20200426 -->
   <!-- <template v-slot:item.action="{ item }">-->
     <template>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-auto-fix
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete-forever
      </v-icon> 
    </template>
    
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>


</template>


 <script>
  export default {
    data: () => ({
      deliveryDialog: false,
      delivery_gbn: '',
      sDate: '',
      eDate: '',
      sDateMenu: false,
      eDateMenu: false,
      delivery_gbn_options: [
        {value: '전체', text: '전체'},
        {value: '부품', text: '부품'},
        {value: '공구', text: '공구'},
        {value: '재료', text: '재료'},
        {value: '소재', text: '소재'}
      ],
      search: '',
      DeliveryInfo: [] , 
      headers: [
        { text: '매입번호',  align: 'left',   sortable: false, value: 'purchase_no' },
        { text: '사명', align: 'left',   sortable: false, value: 'supplier_cd' },
        { text: '사업자번호', value: 'supplier_cd' },        
        { text: '구분', value: 'purchase_gbn' },
        { text: '제품코드', value: 'goods_cd' },
        { text: '제품명', value: 'goods_nm' },
        { text: '규격', value: 'GOODS_SPEC' },
        { text: '수량', value: 'GOODS_COUNT' },
        { text: '단위', value: 'GOODS_UNIT' },
        { text: '주문일', value: 'purchaseOrder_Date' },
        { text: '매입금', value: 'total_price'},
        { text: '지불금', value: 'total_price'},
        { text: '변경/삭제', value: 'action', sortable: false }
      ] ,
      editedIndex: -1,
      editedItem: {
        delivery_no: '',
        supplier_nm: '',
        supplier_cd: '',
        purchase_gbn: '',
        goods_cd: '',
        goods_nm: '',
        GOODS_SPEC: '',
        GOODS_COUNT: '',
        GOODS_UNIT: '',
        purchaseOrder_Date: '',
        total_price: '',
        payment_price: ''
      },
      defaultItem: {
        delivery_no: '',
        supplier_nm: '',
        supplier_cd: '',
        purchase_gbn: '',
        goods_cd: '',
        goods_nm: '',
        GOODS_SPEC: '',
        GOODS_COUNT: '',
        GOODS_UNIT: '',
        purchaseOrder_Date: '',
        total_price: '',
        payment_price: ''
      },
    }),
    beforeCreate() {
        let url = this.APIURL + '/api/getPurchaseInfo';
        // eslint-disable-next-line
        console.log("3. getPurchaseInfo.vue /api/getPurchaseInfo >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.PurchaseInfo = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass getPurchaseInfo.vue !!!! : " + this.PurchaseInfo)   
          });
      },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '매입내역 추가' : '매입내역 변경'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.PurchaseInfo = []
      },

      editItem (item) {
        this.editedIndex = this.PurchaseInfo.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.PurchaseInfo.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.PurchaseInfo.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.PurchaseInfo[this.editedIndex], this.editedItem)
        } else {
          this.PurchaseInfo.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>