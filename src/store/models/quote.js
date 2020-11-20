import QoutePublisherModel from '../../Common/Firebase/models/quotePublisher'
import QuoteReplyModel from '../../Common/Firebase/models/reply'
import QouteModel from '../../Common/Firebase/models/quote'
import fireBase from '../../Common/Firebase/Firebase'
import fireBaseNameSpace from 'firebase'
import {QOUTES_LOAD_FAILED} from '../../Common/messages/errors'
import {QOUTE_DELETED,QOUTE_POSTED,QOUTE_UPDATED,QOUTE_UNSHARE,QOUTE_SHARED} from '../../Common/messages/succes'
import qoute from '../../Common/Firebase/models/quote'


const model ={
    state:{
        qoutes_home          :[],
        qoutes_profile       :[],
        qoutes_search        :[],
        fetch_Limit_search   :2,
        fetch_Limit_home     :2,
        fetch_Limit_profile  :10
    },
    reducers:{
        loaded_home   : (state,qoutes)=>({
             ...state ,
             qoutes_home    : qoutes ,
             fetch_Limit_home : state.fetch_Limit_home + 3
        }),
        searched   : (state,qoutes)=>({ ...state ,
            qoutes_search: qoutes ,
            fetch_Limit_search : state.fetch_Limit_search + 3
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
  
            try {
                const getQoutesResponse= await fireBase.firestore()
                                                       .collection('qoutes')
                                                       .limit(state.quotes.fetch_Limit_home)
               
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
              
                //update user tags if quote post contains tags 
                if(tags.length)
                {
                    const userTags = [...state.auth.user.tags]
                    const tagsIntersecion= userTags.filter(tag=> tags.indexOf(tag) <= -1 ) // new tags 
                    if(tagsIntersecion.length)
                    {
                        userTags.push(...tagsIntersecion)
                        const update ={ tags: fireBaseNameSpace.firestore.FieldValue.arrayUnion([...tagsIntersecion]) }
                        dispatch.auth.editTags({update,tags:userTags})
                    }
                }

                qoute.id=createQouteDocResponse.id
                dispatch.quotes.added(qoute)
                dispatch.toast.add({message:QOUTE_POSTED,type:"SUCCESS"})
            } catch (error) {
                console.log(error)
            }
        },
        async remove(quote,state){
            const user= state.auth.user
            try {
                const targetQuote =await fireBase.firestore().collection('qoutes').doc(qoute.id)
                
                if(quote.quote_publisher.id == user.id)
                {
                    const docDeleteResponse= await targetQuote.delete()
                    dispatch.toast.add(QOUTE_DELETED,"SUCCESS")
                }else{
                    const update={
                         shared_by : quote.shared_by.filter(id=>id != user.id )
                    }
                    const updateResponse= await targetQuote.update(update)
                   
                    dispatch.toast.add(QOUTE_UNSHARE,"SUCCESS")
                }
                dispatch.quotes.removed(quote)
            } catch (error) {
                console.log(error)
            }
        },

        async share(quote,state){
            //check if it wasnt shared before 
            try {
                const user= state.auth.user
                const targetQuote =await fireBase.firestore().collection('qoutes').doc(quote.id)
                const update={
                    shared_by: fireBaseNameSpace.firestore.FieldValue.arrayUnion(user.id),
                }
                console.log(update)
                const updateResponse= await targetQuote.update(update)
                dispatch.toast.add(QOUTE_SHARED,"SUCCESS")
                dispatch.quotes.edited(quote)
            } catch (error) {
                console.log(error)
            }
        },
        async edit({quote,quote_text,image},state){
            try {
               
                const targetQuote =await fireBase.firestore().collection('qoutes').doc(quote.id)
                const update={
                    quote_text ,
                    image
                }
                const updateResponse= await targetQuote.update(update)
                dispatch.toast.add(QOUTE_UPDATED,"SUCCESS")
                dispatch.quotes.edited(quote)
            } catch (error) {
                console.log(error)
            }
        },
        async reply({quote,reply_text,id,image,user_name},state){
            try {
                const targetQuote =await fireBase.firestore().collection('qoutes').doc(quote.id)
                const replyObj=QuoteReplyModel(reply_text,id,image,user_name)
                const update={
                    replies: fireBaseNameSpace.firestore.FieldValue.arrayUnion(replyObj)
                }
                const updateResponse= await targetQuote.update(update)
                dispatch.toast.add(QOUTE_UPDATED,"SUCCESS")
                dispatch.quotes.edited(quote)
            } catch (error) {
                console.log(error)
            }
        },
        async like(qoute,state){
            const user= state.auth.user
 
            //update qoute likes array 
            //add qoute d to users qoutes array 
            
        },

        async searchByTag(tags,state){
             try {
                 const getSearchedQoutesResponse= await fireBase
                                                       .firestore()
                                                       .collection('qoutes')
                                                       .where('tags','array-contains-any',tags)
                                                       .limit(state.quotes.fetch_Limit_search)
                 getSearchedQoutesResponse.onSnapshot(res=>{
                     if(res.docs.length)
                     {
                         let qoutes =res.docs.map(q=>({...q.data(),id:q.id}))
                         dispatch.quotes.searched(qoutes)
                     }
                 })
             } catch (error) {
                 console.log(error)
             }
        },
    })
}
export default model