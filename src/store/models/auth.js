import fireBase from '../../Common/Firebase/Firebase'
import userModel from '../../Common/Firebase/models/user'
import {USER_CREATION,USER_EMAIL_EXISTS,USER_CREATION_FAILED} from '../../Common/messages/errors'
import {LOGGED_IN,LOGGED_OUT,SIGN_IN} from '../../Common/messages/succes'

const model ={
    state:{
        user:userModel(),
        IsAuthenticated:false,
        registerSuccess:false
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
        async login({email,password}){
            try {
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
                 dispatch.toast.add({message:LOGGED_OUT,type:"SUCCESS"})
              } catch (error) {
                  console.log(error)
              }
        },
        async signup({email,password,full_name,birth_date,user_name,country}){
            try {
                //create user in authentication email password 
                console.log(email,password)
                const createUserResponse=await fireBase.auth().createUserWithEmailAndPassword(email,password)
                const id= createUserResponse.user.uid
                
                console.log("done auth")
                // check for username 
                const userNameCheckResponse= await fireBase
                                                  .firestore()
                                                  .collection("all_users")
                                                  .where("user_name","==", user_name)
                userNameCheckResponse.onSnapshot(res=>{
                    console.log(res.docs )   
                    if(res.docs[0] != null)  throw Error('USER_EMAIL_EXISTS')
                })                               
                
                // create user doc 
                const user= userModel(id,full_name,user_name,email,birth_date,country)
                console.log(user)
                const createUserDocResponse= await fireBase
                                                  .firestore()
                                                  .collection('users')
                                                  .add(user)

                if(createUserDocResponse.id === undefined) throw Error('USER_CREATION_FAILED')
                
                //check f user doc was created and get it 
                createUserDocResponse.onSnapshot(snapshot=>
                {
                      const userDoc= snapshot.data()
                      console.log({userDoc})
                      if( userDoc=== undefined || userDoc=== null) throw new Error('NO_USER')
                      dispatch.auth.signedIn(userDoc)
                      dispatch.toast.add({message:SIGN_IN,type:"SUCCESS"})
                })

            } catch (error) {
                dispatch.auth.signupFailed(error)
                if(error.message==="USER_CREATION_FAILED"){
                    return dispatch.error.set({message:USER_CREATION,id:"USER_CREATION_FAILED"})
                }
                if(error.message=="USER_EMAIL_EXISTS"){
                    return dispatch.error.set({message:USER_EMAIL_EXISTS,id:"USER_EMAIL_EXISTS"})
                }
                dispatch.error.set({message:USER_CREATION_FAILED,id:"USER_CREATION_FAILED"})
            }
        }
    })
}
export default model