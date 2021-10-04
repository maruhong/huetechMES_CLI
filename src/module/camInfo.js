export default {
  namespaced : true,
  state : {
    camMgrNm:'',
    camMgrCd:'',
    toggleCamInfoSearch : false,
  },
  getters : {

  },
  //mutations
  mutations : {
    SETITEMS(state,payload) {
      state.camMgrNm = payload[0].CAM_MGR_NM,
      state.camMgrCd = payload[0].CAM_MGR_CD
    },
    SETCAMMGRCD(state,payload) {
      state.camMgrCd = payload
    },
    SETCAMMGRNM(state,payload) {
      state.camMgrNm = payload
    },
    TOGGLECAMINFOSEARCH(state,payload) {
      state.toggleCamInfoSearch = payload
    },
  },
  actions : {
  }  
}