export const utils = {
    methods: {
        fn_getGrantCode : (grantCode) =>
        {
            // eslint-disable-next-line
            console.log("mixins Utils  >>>>>> : ")
            if(grantCode == "U00100001")
            return "시스템관리자"
            else if(grantCode == "U00100002")
            return "일반관리자"
            else if(grantCode == "U00100003")
            return "영업관리자"
            else if(grantCode == "U00100004")
            return "생산관리자"
            else if(grantCode == "U00100005")
            return "인사관리자"
            else if(grantCode == "U00100005")
            return "일반사용자"
            else return "조회권한자"
        }
    }
}