// const types= ["DANGER","SUCCESS","ALARM"]
// const toastModel={
//     message:"no message yet",
//     type:"null",
//     id:null
// }

const model ={
    state:[],
    reducers:{
        added   : (state,toast)=>[...state,toast],
        removed : (state,toast)=>state.filter(t=> t.id !== toast.id),
    },
    effects:(dispatch)=>({
        async add({message,type}){
            console.log("toasting: "+message+ type)
             const toast = {message,type,id : new Date().getTime()}
             dispatch.toast.added(toast)
             await new Promise(r=>setTimeout(r,2000))
             dispatch.toast.removed(toast)
        }
    })
}
export default model