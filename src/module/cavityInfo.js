export default {
  namespaced : true,
  state : {
    cavity:'',
    cavityNm:'',
    toggleCavityInfoSearch : false,
  },
  getters : {

  },
  //mutations
  mutations : {
    SETITEMS(state,payload) {
      state.cavity = payload
    },
    SETCAVITYCD(state,payload) {
      state.cavity = payload
    },
    SETCAVITYNM(state,payload) {
      state.cavityNm = payload
    },
    TOGGLECAVITYINFOSEARCH(state,payload) {
      state.toggleCavityInfoSearch = payload
    },
  },
  actions : {
  }  
}