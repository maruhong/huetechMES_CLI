export default {
  namespaced : true,
  state : {
    equipmentNm:'',
    equipmentCd:'',
    toggleEquipmentInfoSearch : false,
  },
  getters : {

  },
  //mutations
  mutations : {
    SETITEMS(state,payload) {
      state.equipmentNm = payload[0].EQUIPMENT_NM,
      state.equipmentCd = payload[0].EQUIPMENT_CD
    },
    TOGGLEEQUIPMENTINFOSEARCH(state,payload) {
      state.toggleEquipmentInfoSearch = payload
    },
  },
  actions : {
  }  
}