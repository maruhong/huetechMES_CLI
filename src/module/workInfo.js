export default {
  namespaced : true,
  state : {
    workNm:'',
    workCd:'',
    toggleWorkInfoSearch : false,
  },
  getters : {

  },
  //mutations
  mutations : {
    SETITEMS(state,payload) {
      state.workNm = payload[0].WORK_NM,
      state.workCd = payload[0].WORK_CD
    },
    SETWORKNM(state,payload) {
      state.workNm = payload
    },
    SETWORKCD(state,payload) {
      state.workCd = payload
    },
    TOGGLEWORKINFOSEARCH(state,payload) {
      state.toggleWorkInfoSearch = payload
    },
  },
  actions : {
  }  
}