import fireBase from '../../Common/Firebase/Firebase'
import userModel from '../../Common/Firebase/models/user'
import {USER_CREATION,USER_EMAIL_EXISTS,USER_CREATION_FAILED,USER_NAME_EXISTS} from '../../Common/messages/errors'
import {LOGGED_IN,LOGGED_OUT,SIGN_IN ,WELLCOME} from '../../Common/messages/succes'

const model ={
    state:{
        user:JSON.parse(localStorage.getItem('user')) || userModel(),
        IsAuthenticated:false,
        registerSuccess:false,
    },
    reducers:{
        authenticated:(state,payload)=>({...state,user:payload.user,IsAuthenticated : true}),
        loggedOut:(state,payload)=>({...state,user:null,IsAuthenticated : false}),

        loggedIn:(state,payload)=>({...state,user:payload ,IsAuthenticated : true}),
        signedIn:(state,payload)=>({...state,user:payload ,IsAuthenticated : true}),

        editedUser:(state,edit)=>({...state,user:{...state.user,...edit} }),

        logginFailed:(state,payload)=>({...state,user:null,IsAuthenticated : false}),
        signupFailed:(state,payload)=>({...state,user:null,IsAuthenticated : false}),
    },
    effects: (dispatch)=>({
        async checkAuth(){
           try {
                 localStorage.setItem('followed',JSON.stringify([
                     {
                     id:'a7Fr8ODkeKUMk0e73t4eQHkF6bE3',
                     user_name:'Somiya',
                     mage:'no_image'
                    },
                     {
                     id:'mlRNNURoZfNOB4Dc8qxlg4ORFWq1',
                     user_name:'AliJhones',
                     mage:'no_image'
                    },
                     {
                     id:'2OFAMNWk7ycLzaPVi3SJbJe7kBB3',
                     user_name:'SAdifatah',
                     mage:'no_image'
                    },
                ]))
                fireBase.auth().onAuthStateChanged(user=>{
                     if(user)
                     {
                         const userDoc=JSON.parse(localStorage.getItem('user'))
                         dispatch.toast.add({message:WELLCOME+ " "+ userDoc.full_name ,type:"SUCCESS"})
                         return   dispatch.auth.loggedIn(userDoc)
                     }
                })
           } catch (error) {
               console.log(error)
           }
        },
        async login({email,password}){
            try {
               const logginResponse =await fireBase.auth().signInWithEmailAndPassword(email,password)
               const id= logginResponse.user.uid
         
               if(logginResponse.user === undefined || logginResponse.user == null) throw new Error('NO_USER')
              
               const userDocResponse= await fireBase.firestore().collection('users').where('id','==',id)
               userDocResponse.onSnapshot(snapshot=>
               {
                     const userDoc= snapshot.docs[0].data()
                     if( userDoc === undefined || userDoc === null) throw new Error('NO_USER')

                     //set followed 
                     localStorage.setItem('followed',JSON.stringify(userDoc.following))

                     //set used doc
                     dispatch.auth.loggedIn({
                         ...userDoc,
                         doc_id:snapshot.docs[0].id,
                         birth_date:userDoc.birth_date.toDate() 
                        })
                     localStorage.setItem('user',JSON.stringify({
                         ...userDoc,
                         doc_id:snapshot.docs[0].id,
                         birth_date:userDoc.birth_date.toDate() 
                        }))
                     dispatch.toast.add({message:LOGGED_IN,type:"SUCCESS"})

               })
              
            } catch (error) {
                console.log(error)
                dispatch.auth.logginFailed()
            }
        },
        async logout(){
              try {
                 const signOutResponse = await fireBase.auth().signOut()
                 dispatch.auth.loggedOut()
                 localStorage.removeItem('user')
                 dispatch.toast.add({message:LOGGED_OUT,type:"SUCCESS"})
              } catch (error) {
                  console.log(error)
              }
        },
        async signup({email,password,full_name,birth_date,user_name,country}){
            try {
                // check for username 
                const userNameCheckResponse = await fireBase
                                                  .firestore()
                                                  .collection("users")
                                                  .where("user_name","==", user_name)
                                                  .get()
                if(!userNameCheckResponse.empty)  throw new Error('USER_NAME_EXISTS')   
               

                //creating the user auth
                const createUserResponse=await fireBase.auth().createUserWithEmailAndPassword(email,password)
                const id= createUserResponse.user.uid
               
                
                // creating user doc in users collection
                const user= userModel(id,full_name,user_name,email,birth_date,country)
                const createUserDocResponse= await fireBase
                                                  .firestore()
                                                  .collection('users')
                                                  .add(user)
                if(createUserDocResponse.id === undefined) throw new Error('USER_CREATION_FAILED')
                
                //check if user doc was created and get it 
                createUserDocResponse.onSnapshot(snapshot=>
                {
                      const userDoc= snapshot.data()
                      if( userDoc=== undefined || userDoc=== null) throw new Error('NO_USER')
                      localStorage.setItem('followed',JSON.stringify([]))
                      dispatch.auth.signedIn({
                          ...userDoc,
                          doc_id:snapshot.docs[0].id,
                          birth_date:userDoc.birth_date.toDate() 
                        })
                      localStorage.setItem('user',JSON.stringify({
                          ...userDoc,
                          doc_id:snapshot.docs[0].id,
                          birth_date:userDoc.birth_date.toDate() 
                        }))
                      dispatch.toast.add({message:SIGN_IN,type:"SUCCESS"})
                })

            } catch (error) {
                dispatch.auth.signupFailed(error)
                if(error.message==="USER_CREATION_FAILED"){
                    return dispatch.error.set({message:USER_CREATION,id:"USER_CREATION_FAILED"})
                }
                if(error.code == "auth/email-already-in-use"){
                    return dispatch.error.set({message:USER_EMAIL_EXISTS,id:"USER_EMAIL_EXISTS"})
                }
                if(error.message == "USER_NAME_EXISTS"){
                    return dispatch.error.set({message:USER_NAME_EXISTS,id:"USER_EMAIL_EXISTS"})
                }
                dispatch.error.set({message:USER_CREATION_FAILED,id:"USER_CREATION_FAILED"})
            }
        },
        async editUser(update,state){
            try {
                const targetUser =await fireBase.firestore().collection('users').doc(state.auth.user.doc_id)
                const updateResponse= await targetUser.update(update) 
                dispatch.auth.editedUser(update)
            } catch (error) {
               console.log(error)
            }
        }
    })
}
export default model