export default {
  namespaced : true,
  state : {
    cadMgrNm:'',
    cadMgrCd:'',
    toggleCadInfoSearch : false,
  },
  getters : {

  },
  //mutations
  mutations : {
    SETITEMS(state,payload) {
      state.cadMgrNm = payload[0].CAD_MGR_NM,
      state.cadMgrCd = payload[0].CAD_MGR_CD
    },
    SETCADMGRCD(state,payload) {
      state.cadMgrCd = payload
    },
    SETCADMGRNM(state,payload) {
      state.cadMgrNm = payload
    },
    TOGGLECADINFOSEARCH(state,payload) {
      state.toggleCadInfoSearch = payload
    },
  },
  actions : {
  }  
}