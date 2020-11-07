const model ={
    state:{
        message:null,
        id:null
    },
    reducers:{
        seted :(state,payload)=>({message: payload.message , id : payload.id }),
        cleard :(state,payload)=>({message: null, id : null}),
    },
    effects:(dispatch)=>({
        set({message,id}){
            dispatch.error.seted({message,id})
        },
        clear(){
            dispatch.error.cleard()
        }
    })
}
export default model