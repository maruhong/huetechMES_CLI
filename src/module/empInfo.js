export default {
    namespaced : true,

    state : {
      popItems : [],         
      checkEmpList : [],
      popDisplay : null,
      checkCadEmpNo : null,  
      checkCamEmpNo : null, 
      checkMgrEmpNo : null,
      toggleCadEmpInfoList : false,
      toggleCamEmpInfoList : false,
      toggleMgrEmpInfoList : false,

    },
    getters : {

    },
    //mutations
    mutations : {
      SETITEMS(state,payload) {
        state.popItems = payload
      },
      SETEMPLIST(state,payload) {
        state.checkEmpList = payload      
      },
      SETCADEMPNO(state,payload) {
        state.checkCadEmpNo = payload      
      },
      SETCAMEMPNO(state,payload) {
        state.checkCamEmpNo = payload      
      },
      SETMGREMPNO(state,payload) {
        state.checkMgrEmpNo = payload      
      },
      SETDISPLAY(state,payload) {
        state.popDisplay = payload
      },
      TOGGLECADEMPINFOLIST(state,payload) {
        state.toggleCadEmpInfoList = payload
      },
      TOGGLECAMEMPINFOLIST(state,payload) {
        state.toggleCamEmpInfoList = payload
      },
      TOGGLEMGREMPINFOLIST(state,payload) {
        state.toggleMgrEmpInfoList = payload
      }
    },
    actions : {
      /*실제 적용이 안됨
        set_cadEmpNo(state,payload) {
            state.checkCadEmpNo = payload     
        },
        set_camEmpNo(state,payload) {
            state.checkCamEmpNo = payload      
        },
        */
    }  
}