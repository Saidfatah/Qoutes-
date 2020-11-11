
import fireBase from 'firebase'
const reply =(reply_text, id ,image, user_name )=> ({
    reply_text  : reply_text||'' ,
    id          : id||"" ,
    image       : image||"" , 
    user_name   : user_name || "",
    created_at  : fireBase.firestore.Timestamp.now(),
})
export default reply