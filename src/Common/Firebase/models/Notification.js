import fireBase from 'firebase'
import notificationSender from './notificationSender'
const notification =(topic, sender, redirect, concerned)=> ({
    topic           :  topic     || "notification topic ",
    redirect        :  redirect  || "/", // where do we redrect users when they click on notification 
    concerned       :  concerned || [], // if this array is empty then we know the notification is for everybody 
    checked         :  [],   //array of ids of users who have checked the notification 
    sender          :  sender    || notificationSender(), 
    created_at      :  fireBase.firestore.FieldValue.serverTimestamp(),
})  
export default notification