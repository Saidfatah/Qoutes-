import QoutePublisherModel from '../../Common/Firebase/models/quotePublisher'
import QuoteReplyModel from '../../Common/Firebase/models/reply'
import QouteModel from '../../Common/Firebase/models/quote'
import fireBase from '../../Common/Firebase/Firebase'
import fireBaseNameSpace from 'firebase'
import {QOUTES_LOAD_FAILED} from '../../Common/messages/errors'
import qoute from '../../Common/Firebase/models/quote'


const model ={
    state:{
        notifications   : [],
 
    },
    reducers:{
        gotNotifs   : (state,notifs)=>({ ...state ,notifications :notifs }),
    },
    effects:(dispatch)=>({
        async notifyFollowers(args,state){
            //when user posts , notify followers
            try {
          
          
            } catch (error) {
                //  dispatch.toast.add({message:QOUTES_LOAD_FAILED,type:"DANGER"})
            }
        },
        async notifyPublisher(args,state){
            //replies
            //posts

            try {
        
            } catch (error) {
             
            }
        },
        async getNotifications(args,state){
            try {
                const user = state.auth.user;
        
            } catch (error) {
             
            }
        },
  
    })
}
export default model