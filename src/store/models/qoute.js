import QouteModel from '../../Common/Firebase/models/quote'
import QoutePublisherModel from '../../Common/Firebase/models/quotePublisher'
import fireBase from '../../Common/Firebase/Firebase'
import {QOUTES_LOAD_FAILED} from '../../Common/messages/errors'
import {QOUTE_DELETED,QOUTE_POSTED,QOUTE_UPDATED,QOUTE_UNSHARE,QOUTE_SHARED} from '../../Common/messages/succes'


const model ={
    state:{
        qoutes_home          :[],
        qoutes_profile       :[],
        fetch_Limit_home     :2,
        fetch_Limit_profile  :10
    },
    reducers:{
        loaded_home   : (state,qoutes)=>({
             ...state ,
             qoutes_home    : qoutes ,
             fetch_Limit_home : state.fetch_Limit_home + 3
        }),
        loaded_profil : (state,qoutes)=>({
             ...state ,
             qoutes_profile : qoutes , 
             fetch_Limit_profile : state.fetch_Limit_profile + 3
        }),
        added   : (state,qoute)=>({   
             ...state , 
             qoutes_home    : state.qoutes_home.push(qoute),
             qoutes_profile : state.qoutes_profile.push(qoute),
        }),
        removed : (state,qoute)=>({ 
             ...state ,
             qoutes_home    : state.qoutes_home.filter(q=> q.id !== qoute.id),
             qoutes_profile : state.qoutes_profile.filter(q=> q.id !== qoute.id),
        }),
        edited  : (state,qoute)=>({
             ...state,
             qoutes_home    : state.qoutes_home.map(q=>{
                if(q.id ==qoute.id) return qoute
                return q 
             }),
             qoutes_profile : state.qoutes_profile.map(q=>{
                if(q.id ==qoute.id) return qoute
                return q 
             }),
        }),
    },
    effects:(dispatch)=>({
        async loadHomeQoutes(args,state){
            //load followed users qoutes 
            //qoutesthat are at max one week old 
            //liked qoutes  wth who liked them 
            //shared qoutes with who shared them 
            //store friends ids locally , then load latest posted qoutes and filter qoutes which downerèid isn't in local stored id's
            //we need to also store each friend qoutes array 
            //well need to get mutual friends 
            //if storedUser_id is not

            //qoutes now have shared_by list 
            //liked_by list 
            //so now when we get all the qoutes we can just check if our Local followed_ids are in any of these lists 
            console.log(state.quotes.fetch_Limit_home)
            try {
                const getQoutesResponse= await fireBase.firestore().collection('qoutes').limit(state.quotes.fetch_Limit_home)
               
                getQoutesResponse.onSnapshot(res=>{
                if(res.docs.length)
                {
                    
                    let qoutes =res.docs.map(q=>({...q.data(),id:q.id}))
                    dispatch.quotes.loaded_home(qoutes)
                }
            })
            } catch (error) {
                 dispatch.toast.add({message:QOUTES_LOAD_FAILED,type:"DANGER"})
            }
        },
        async loadProfilQoutes(){

        },
        async share(quote,state){
            const user= state.auth.user
            console.log(quote,user)
            //share code 
            //update user
            //add qoute to users qoutes array 
            dispatch.toast.add({message:QOUTE_SHARED,type:"SUCCESS"})
        },
        async add({message,tags,image},state){
            try {
                const user= state.auth.user
                const qoutePublisher = QoutePublisherModel(user.id,user.image,user.user_name)
                const qoute = QouteModel(message,qoutePublisher,tags,image)
                const createQouteDocResponse= await fireBase
                                                   .firestore()
                                                   .collection('qoutes')
                                                   .add(qoute)
                if(createQouteDocResponse.id == undefined) throw Error('QOUTE_CREATION_FAILED')
              
                qoute.id=createQouteDocResponse.id
                dispatch.quotes.added(qoute)
                dispatch.toast.add({message:QOUTE_POSTED,type:"SUCCESS"})
            } catch (error) {
                console.log(error)
            }
        },
        async remove(quote,state){
            const user= state.auth.user
            console.log(quote,user)
            //check if qoute exists 
            //toast on delete 
            //throw toast error type if qoute doesnt exist
            //check if qoute was shared if so just rmove it from users qoutes 
            //if qoute was shared dispatch.toast.add(QOUTE_UNSHARE,"SUCCESS")
            dispatch.toast.add(QOUTE_DELETED,"SUCCESS")
        },
        async edit(new_qoute_Msg){
            //check if qoute exists 
            //toast on edit
            //throw toast error type if qoute doesnt exist
            dispatch.toast.add(QOUTE_UPDATED,"SUCCESS")
        },
        async reply(qoute,msg,user){
            console.log({qoute,msg,user})
            //update qoute replies array 
           
        },
        async like(qoute,user){
            console.log({qoute,user})
            //update qoute likes array 
            //add qoute d to users qoutes array 
            
        },
    })
}
export default model