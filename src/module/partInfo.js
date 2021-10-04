export default {
    namespaced : true,
    state : {
      partNm:'',
      partCd:'',
      togglePartInfoSearch : false
    },
    getters : {

    },
    //mutations
    mutations : {
      SETITEMS(state,payload) {
        state.partNm = payload[0].PART_NM,
        state.partCd = payload[0].PART_CD
      },
      SETPARTNM(state,payload) {
        state.partNm = payload
      },
      SETPARTCD(state,payload) {
        state.partCd = payload
      },
      TOGGLEPARTINFOSEARCH(state,payload) {
        state.togglePartInfoSearch = payload
      },
    },
    actions : {
    }  
}