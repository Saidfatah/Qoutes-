import NotificationModel from '../../Common/Firebase/models/Notification'
import notificationSenderModel from '../../Common/Firebase/models/notificationSender'
import fireBase from '../../Common/Firebase/Firebase'
import fireBaseNameSpace from 'firebase'

const model ={
    state:{
        notifications   : [],
 
    },
    reducers:{
        gotNotifs   : (state,notifs)=>({ ...state ,notifications :notifs }),
    },
    effects:(dispatch)=>({
        async notifyFollowers({post_id},state){
            try {
                //when user posts or does sommething that would be of nterst to their followers , we send them a notifcation 
                const {id,followers,user_name,image} = state.auth.user.id
                const concerned      = followers
                const redirectUrl    = "/posts/"+post_id
                const sender         = notificationSenderModel(id,user_name,image)
                const notification   = NotificationModel("topic",sender,redirectUrl,concerned)

                const notifyFollowersResponse = await fireBase
                                                .firestore()
                                                .collection('notifications')
                                                .add(notification)

                if(notifyFollowersResponse.id === undefined) throw new Error('NOTIY_FAILED')
                console.log("succes notify ")

            } catch (error) {
                //  dispatch.toast.add({message:QOUTES_LOAD_FAILED,type:"DANGER"})
                console.log(error)
            }
        },
        async notifyPublisher({quote,action,reply},state){
            try {
                const {id,full_name,user_name,image} = state.auth.user
                const {quote_publisher,quote_text} = quote

                if(!id || !full_name || !user_name || !image || quote_publisher || quote_text ) return 

                const redirectUrl    = "/quotes/"+quote.id
                const concerned      = [quote_publisher.id]

                //action = shared | liked  | replied
                let   topic ; 
                switch(action){
                    case "SAHRE" : topic = `${full_name} shared your quote "${quote_text}..."  `; break ; 
                    case "LIKE"  : topic = `${full_name} liked  your quote "${quote_text}..." ` ; break ; 
                    case "REPLY" : topic = `${full_name} replied "${reply}..." to  your quote "${quote_text}..." ` ; break ; 
                    default      : topic = `${full_name} viewd your quote "${quote_text}" `     ; break ;
                }
          

                const sender         = notificationSenderModel(id,user_name,image)
                const notification   = NotificationModel(topic,sender,redirectUrl,concerned)

                const notifyPublisherResponse = await fireBase
                                               .firestore()
                                               .collection('notifications')
                                               .add(notification)

                if(notifyPublisherResponse.id === undefined) throw new Error('NOTIY_FAILED')
                console.log("succes notify ")

            } catch (error) {
                //  dispatch.toast.add({message:QOUTES_LOAD_FAILED,type:"DANGER"})
                console.log(error)
            }
        },
        async checkNotification(args,state){
            try {
                const user = state.auth.user;
        
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