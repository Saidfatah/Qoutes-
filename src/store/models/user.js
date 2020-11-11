import fireBase from '../../Common/Firebase/Firebase'
import userModel from '../../Common/Firebase/models/user'
import {USER_DOESNT_EXIST} from '../../Common/messages/errors'
import { FOLLOWED,UNFOLLOWED,BLOCKED,UNBLOCKED} from '../../Common/messages/succes'

const model ={
    state:{
        accessible      : true,
        searched_users  : [],
        visited_user    : userModel(),
        follow          : false,
        followed        : JSON.parse(localStorage.getItem('followed')),
        recommendation  :  null,
    }, 
    reducers:{
        fetchedRecommended :(state,payload)=>({...state,visited_user:payload }),
        profileVisited     :(state,payload)=>({...state,visited_user:payload }),
        
        usersSearched      :(state,payload)=>({...state,searched_users:payload }),
        usersSearchFailed  :(state,payload)=>({...state,searched_users:[] }),

        blocked            :(state,payload)=>({...state,accessible:false}),
        unBlocked          :(state,payload)=>({...state,accessible:true }),

        toggledFollow      :(state,payload)=>({...state,follow:!state.users.follow}),

        userFetchFailed:(state,payload)=>({...state,visited_user:null , recommendation : null}),
    },
    effects: (dispatch)=>({
        async fecthRecommend(id,state){
           try {
                const followedUsersIds = state.users.followed.map(u=>u.id)
                const currentUserId      = state.auth.user.id
                return console.log({followedUsersIds ,currentUserId })

                const recommendedResponse = await fireBase
                                            .firestore()
                                            .collection('users')
                                            .where('followers','array-contains',followedUsersIds)
                recommendedResponse.onSnapshot(snapshot=>
                {
                        const recommendedFilterdFromAlreadyFollowed = snapshot.docs.map(user=> !user.followers.includes(currentUserId))
                        dispatch.auth.profileVisited(recommendedFilterdFromAlreadyFollowed)
                })
              
            } catch (error) {
                console.log(error)
                if(error.message =="NO_USER") 
                   dispatch.toast.add({message:USER_DOESNT_EXIST,type:"DANGER"})
                dispatch.auth.userFetchFailed()
            }
        },
        async searchUsers(user_name,state){
            //implemnt agolia
           try {
                const usersSearchResponse= await fireBase
                                             .firestore()
                                             .collection('users')
                                             .where('user_name','==',user_name)
                usersSearchResponse.onSnapshot(snapshot=>
                {
                    const userDoc= snapshot.docs[0].data()
                    if( userDoc === undefined || userDoc === null) throw new Error('NO_USER')
                    dispatch.auth.usersSearched(userDoc)
                })
            } catch (error) {
                console.log(error)
                if(error.message =="NO_USER") 
                   dispatch.toast.add({message:USER_DOESNT_EXIST,type:"DANGER"})
                dispatch.auth.usersSearchFailed()
            }
        },
        async visitProfile(id){
           try {
                const userDocResponse= await fireBase
                                             .firestore()
                                             .collection('users')
                                             .where('id','==',id)
                 userDocResponse.onSnapshot(snapshot=>
                 {
                       const userDoc= snapshot.docs[0].data()
                       if( userDoc === undefined || userDoc === null) throw new Error('NO_USER')
                       dispatch.auth.profileVisited(userDoc)
                 })
            } catch (error) {
                console.log(error)
                if(error.message =="NO_USER") 
                   dispatch.toast.add({message:USER_DOESNT_EXIST,type:"DANGER"})
                dispatch.auth.userFetchFailed()
            }
        },
        async toggleFollow(id){
           try {
                 dispatch.users.toggledFollow()
            } catch (error) {
                console.log(error)
            }
        },
        async block(id){
           try {
               //modify blocked field
               //{id,user_name}
            } catch (error) {
                console.log(error)
            }
        },
        async unBlock(id){
           try {
                //modify blocked field
               //remove obj from array
            } catch (error) {
                console.log(error)
            }
        },
    })
}
export default model