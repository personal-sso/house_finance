export default {
    state: {
        p_info:JSON.parse(localStorage.getItem("p_info")) || {},
        bannerImg:JSON.parse(localStorage.getItem("bannerImg")) || {},
        title: localStorage.getItem("bannerImg") || '',
        assessData:JSON.parse(localStorage.getItem("assessData")) || {}
    },
    mutations: {
        changePInfo(state,value){
            if(!value) return;
            state.p_info = value;
        },
        changeImg(state,value){
            state.bannerImg = value;
        },
        changeTitle(state,value){
            state.title = value;
        },
        changeAssessData(state,value){
            state.assessData = value;
            localStorage.setItem('assessData',JSON.stringify(value));
        }
    }
}
