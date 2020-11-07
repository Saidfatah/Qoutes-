// const date =d=>fireBaseNamespace.firestore.FieldValue.serverTimestamp()
import fireBase from 'firebase'

import QoutePublisher from './quotePublisher'
const qoute =( qoute_text ,quote_publisher,tags,image)=> ({
    qoute_text      :  qoute_text || "",
    image           :  image ||  "no_image" ,
    quote_publisher :  quote_publisher||QoutePublisher(),
    created_at      :  fireBase.firestore.FieldValue.serverTimestamp(),
    tags            :  tags||[],
    likes           :  0,
    replies         :  [],
    shared_by       :  [],
    liked_by        :  [],
})  
export default qoute