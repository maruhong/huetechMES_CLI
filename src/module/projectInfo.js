export default {
    namespaced : true,

    state : {
      popItems : [],
      projectCd :'',
      projectNm : '',
      toggleProjectInfoReg : false,
      toggleProjectInfoEdit : false,
      toggleProjectInfoDetail : false,
      toggleProjectInfoSearch : false,
    },
    getters : {

    },
    //mutations
    mutations : {
      SETITEMS(state,payload) {
        state.popItems = payload
      },
      SETPROJECTITEMS(state,payload) {
        state.projectNm = payload[0].PROJECT_NM,
        state.projectCd = payload[0].PROJECT_CD
      },
      SETPROJECTNM(state,payload) {
        state.projectNm = payload
      },
      TOGGLEPROJECTINFOREG(state,payload) {
        state.toggleProjectInfoReg = payload
      },
      TOGGLEPROJECTINFOEDIT(state,payload) {
        state.toggleProjectInfoEdit = payload
      },
      TOGGLEPROJECTINFODETAIL(state,payload) {
        state.toggleProjectInfoDetail = payload
      },
      TOGGLEPROJECTINFOSEARCH(state,payload) {
        state.toggleProjectInfoSearch = payload
      }
      
    },
    actions : {
    }  
}