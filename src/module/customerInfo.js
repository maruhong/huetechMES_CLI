export default {
  namespaced : true,

  state : {
    popItems : [],
    toggleCustomerInfoSearch : false,
  },
  getters : {

  },
  //mutations
  mutations : {
    SETITEMS(state,payload) {
      state.popItems = payload
    },
    TOGGLECUSTOMERINFOSEARCH(state,payload) {
      state.toggleCustomerInfoSearch = payload
    }
    
  },
  actions : {
  }  
}