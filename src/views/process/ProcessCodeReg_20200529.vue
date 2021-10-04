<template>
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-start justify-left>
          <v-flex xs2 class="elevation-1 pa-1 ma-1"> 

            <v-btn  color="success"  @click="processRealSave({empNo, password})">새로고침</v-btn>
            <v-card class="mx-auto" max-width="600" max-height="800">
                <v-list two-line>
                <v-subheader>
                  공정 전체 목록
                </v-subheader>
                <draggable v-model="processCodeAll" :options="{group:'processCode.ID'}" style="min-height:800px">
                  <template v-for="processCode in processCodeAll">
                    <v-list-item :key="processCode.ID" >                    
                      <v-list-item-content>
                      <v-list-item-title >{{processCode.ID}} . {{processCode.CODENAME}}</v-list-item-title>
                      </v-list-item-content>                      
                    </v-list-item>
                  </template>
                </draggable>
                 <v-btn  color="success"  @click="processRealSave({empNo, password})">새로고침</v-btn>
              </v-list>
              </v-card>
            </v-flex>
            <v-btn  color="primary"  @click="processAdding({empNo, password})">추가</v-btn>
            <v-flex xs3 class="elevation-1 pa-1 ma-1">
              <v-list two-line>
                  <v-subheader>
                      사용 공정 목록
                  </v-subheader>
                  <draggable v-model="processCodeReal" :options="{group:'processCode.ID'}" style="min-height: 200px">
                      <template v-for="processCode in processCodeReal">
                  <v-list-item :key="processCode.ID" >                    
                      <v-list-item-content>
                      <v-list-item-title >{{processCode.ID}} . {{processCode.CODENAME}}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                            <v-checkbox :input-value="active" :true-value="processCode.CODENAME" color="deep-purple accent-4" @click="toggle"></v-checkbox>
                          </v-list-item-action>
                  </v-list-item>
              </template>
                </draggable>
                 <v-btn  color="success"  @click="processRealSave({empNo, password})">저장</v-btn>
                 <v-btn  color="primary"  @click="processRealDelete({empNo, password})">삭제</v-btn>
              </v-list>
            </v-flex>
       </v-layout>
      </v-container>
    </v-content> 
  </v-app>
</div>
</template>

<script>
import draggable from "vuedraggable";
// import ProcessCode from "../components/ProcessCode";

export default {
    name: "processCodeReg",
    components: {
        draggable
    },
    computed : function () {

    },
    beforeCreate() {
        let url = this.APIURL + '/api/getProcessCodeAll';
        let url1 = this.APIURL + '/api/getProcessCodeByProject';
        // eslint-disable-next-line
        console.log("3. getProcessCodeReg.vue /api/getProcessCodeReg >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.processCodeAll = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass getProcessCodeReg.vue !!!! : " + this.processCodeAll)   
          })
          .then (            
            this.$http.get(url1 , null, /*, config */)
            .then ( ret1 => {
              this.processCodeReal = ret1.data; 
                // eslint-disable-next-line
              console.log("5. pass getProcessCodeReg.vue !!!! : " + this.processCodeReal)   
            })
          );
      },
    data() {
        return {
        rowCount : 2,
        even : 2,
        odd : 1,
        model : ['processCode'],
        processCodeAll: [ 
          
        ],
        processCodeReal: [
          
        ]
        };
    },
    methods :  {

    }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app .logo {
  text-align: center;
}
</style>