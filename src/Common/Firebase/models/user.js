import fireBase from 'firebase'
const user =( id , full_name, user_name, email,birth_date ,country)=> ({
    id         : id || 'id',
    full_name  : full_name || 'said fatah',
    user_name  : user_name || 'saidFatah',
    email      : email || 'sadàsaid.com',
    country    : country || 'Morroco',
    birth_date : fireBase.firestore.FieldValue.serverTimestamp(birth_date) || 'birthday',
    bio        : "not_set",
    image      : "no_image",
    following  : [],
    followers  : [],
    likes      : [],
    quotes     : [],//if one of these qooutes ownerèid is not equal to current user id in profil then we know it was shared 
})
export default user