import fireBase from 'firebase'
import notificationSender from './notificationSender'
const notification =(topic, sender, redirect, concerned)=> ({
    topic           :  topic     || "notification topic ",
    redirect        :  redirect  || "/",
    concerned       :  concerned || [], // if this array is empty then we know the notification is for everybody 
    sender          :  sender    || notificationSender(),
    created_at      :  fireBase.firestore.FieldValue.serverTimestamp(),
})  
export default notification