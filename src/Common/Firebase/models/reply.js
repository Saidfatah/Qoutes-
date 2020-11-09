
import fireBase from 'firebase'
const reply =(reply_text, id ,image, user_name )=> ({
    reply_text ,
    id ,
    image, 
    user_name,
    created_at  : fireBase.firestore.FieldValue.serverTimestamp(),
})
export default reply