import fireBase from '../../Common/Firebase/Firebase'
import userModel from '../../Common/Firebase/models/user'
import {USER_CREATION,USER_EMAIL_EXISTS,USER_CREATION_FAILED,USER_NAME_EXISTS} from '../../Common/messages/errors'
import {LOGGED_IN,LOGGED_OUT,SIGN_IN ,WELLCOME} from '../../Common/messages/succes'

const model ={
    state:{
        user:JSON.parse(localStorage.getItem('user')) || userModel(),
        IsAuthenticated:false,
        registerSuccess:false,
        followed:JSON.parse(localStorage.getItem('followed'))
    },
    reducers:{
        authenticated:(state,payload)=>({...state,user:payload.user,IsAuthenticated : true}),
        loggedOut:(state,payload)=>({...state,user:null,IsAuthenticated : false}),

        loggedIn:(state,payload)=>({...state,user:payload ,IsAuthenticated : true}),
        signedIn:(state,payload)=>({...state,user:payload ,IsAuthenticated : true}),

        logginFailed:(state,payload)=>({...state,user:null,IsAuthenticated : false}),
        signupFailed:(state,payload)=>({...state,user:null,IsAuthenticated : false}),
    },
    effects: (dispatch)=>({
        async checkAuth(){
           try {
                fireBase.auth().onAuthStateChanged(user=>{
                    console.log(user)
                     if(user)
                     {
                         console.log('user logged')
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
                localStorage.setItem('followed',JSON.stringify([
                    {
                        user_name:"mohMo",
                        id:"2OFAMNWk7ycLzaPVi3SJbJe7kBB3"
                    },
                    {
                        user_name:"aliAli",
                        id:"mlRNNURoZfNOB4Dc8qxlg4ORFWq1"
                    },
                    {
                        user_name:"aziz",
                        id:"a7Fr8ODkeKUMk0e73t4eQHkF6bE3"
                    }
                ]))
               const logginResponse =await fireBase.auth().signInWithEmailAndPassword(email,password)
               const id= logginResponse.user.uid
         
               if(logginResponse.user === undefined || logginResponse.user == null) throw new Error('NO_USER')
              
               const userDocResponse= await fireBase.firestore().collection('users').where('id','==',id)
               userDocResponse.onSnapshot(snapshot=>
               {
                     const userDoc= snapshot.docs[0].data()
                     console.log({userDoc})
                     if( userDoc === undefined || userDoc === null) throw new Error('NO_USER')
                     dispatch.auth.loggedIn(userDoc)
                     localStorage.setItem('user',JSON.stringify(userDoc))
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
                      console.log({userDoc})
                      if( userDoc=== undefined || userDoc=== null) throw new Error('NO_USER')
                      dispatch.auth.signedIn(userDoc)
                      localStorage.setItem('user',JSON.stringify(userDoc))
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
        }
    })
}
export default model