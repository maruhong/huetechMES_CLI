<template>   
 <v-layout>
  <v-col cols="12">
    <v-container style="max-width:98%"> 
      <v-list-item>        
      <v-row>
        <v-card cols="5" style="height:60px;padding-top:0px" color="primary lighten-3">
        <v-row>
          <v-col md="2" style="height:38px;padding-top:0px">                 
            <v-select  v-model="editedItem.supplier_cd" :items="purchase_gbn_options"   item-text="purchase_gbn"  label="구분" multi-line  ></v-select>
          </v-col>
          <v-col md="2" style="height:38px;padding-top:0px">
            <v-text-field model="purchase_nm" label="회사명"></v-text-field>
          </v-col>
          <v-col md="2" style="height:38px;padding-top:0px">
            <v-menu ref="sDateMenu" v-model="sDateMenu" :close-on-content-click="false" :return-value.sync="sDate"
              transition="scale-transition" offset-y min-width="190px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="주문시작일"
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
          <v-col md="2" style="height:38px;padding-top:0px">   
            <v-menu ref="eDateMenu" v-model="eDateMenu" :close-on-content-click="false" :return-value.sync="eDate"
              transition="scale-transition" offset-y min-width="190px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="주문종료일"
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
          <v-col md="1" style="height:38px;padding-top:0px">
            <v-btn  class="btn btn-outline-deep-blue btn-rounded waves-effect">
                <i class="fas fa-search fa-lm pr-3" aria-hidden="true">
                  </i>조회
            </v-btn>
          </v-col>
          <v-col md="1" style="height:38px;padding-top:0px">
            <v-btn  class="btn btn-outline-deep-red btn-rounded waves-effect">
                <i class="fas fa-search fa-lm pr-3" aria-hidden="true">
                  </i>취소
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
          
      <v-card cols="2" >
        <v-col md="4" style="height:38px;padding-top:0px">
          <v-btn  class="btn btn-outline-deep-blue btn-rounded waves-effect">
                <i class="fas fa-plus-square fa-lm pr-3" aria-hidden="true">
                  </i>신규 추가
          </v-btn>
        </v-col>
      </v-card>
      </v-row>            
      <v-row>
        <v-col style="height:38px;padding-top:0px">
          <v-dialog v-model="dialog" max-width="1200px">                    
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.purchase_no" label="매입번호"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.supplier_cd" label="사명"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.supplier_cd" label="사업자번호"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.purchase_gbn" label="구분"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.goods_cd" label="제품코드"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.goods_nm" label="제품명"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.GOODS_SPEC" label="규격"></v-text-field>
                    </v-col>                  
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.GOODS_COUNT" label="수량"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.GOODS_SPEC" label="단가"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.GOODS_UNIT" label="단위"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.purchaseOrder_Date" label="주문일"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.total_price" label="매입금"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.total_price" label="지불금"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.total_price" label="잔액"></v-text-field>
                    </v-col>
                    <v-col cols="8" sm="3" md="2">
                      <v-text-field v-model="editedItem.total_price" label="완납여부"></v-text-field>
                    </v-col>
                  </v-row>                          
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      </v-list-item>
    </v-container>
  </v-col>
  <v-col cols="12">  
  <v-data-table :headers="headers" :items="PurchaseInfo" sort-by="NO" class="elevation-1">
    <template v-slot:item.action="{ item }">
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
  </v-col>
  </v-layout>
</template>


 <script>
  export default {
    data: () => ({
      dialog: false,
      purchase_gbn: '전체',
      sDate: '',
      eDate: '',
      sDateMenu : false,
      eDateMenu : false,
      purchase_gbn_options: [
        {value: '전체', text: '전체'},
        {value: '부품', text: '부품'},
        {value: '공구', text: '공구'},
        {value: '재료', text: '재료'},
        {value: '소재', text: '소재'}
      ],
      search: '',
      PurchaseInfo: [] , 
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
        purchase_no: '',
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
        purchase_no: '',
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