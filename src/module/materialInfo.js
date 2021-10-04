export default {
    namespaced : true,
    state : {
      materialNm:'',
      materialCd:'',
      toggleMaterialInfoSearch : false,
    },
    getters : {

    },
    //mutations
    mutations : {
      SETITEMS(state,payload) {
       state.materialNm = payload[0].MATERIAL_NM,
       state.materialCd = payload[0].MATERIAL_CD
      },
      TOGGLEMATERIALINFOSEARCH(state,payload) {
        state.toggleMaterialInfoSearch = payload
      },
    },
    actions : {
    }  
}