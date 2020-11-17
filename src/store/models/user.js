import fireBase from '../../Common/Firebase/Firebase'
import fireBaseNameSpace from 'firebase'
import userModel from '../../Common/Firebase/models/user'
import {USER_DOESNT_EXIST} from '../../Common/messages/errors'
import {IMAGE_UPLOAD,UPDATED,FOLLOWED,UNFOLLOWED,BLOCKED,UNBLOCKED} from '../../Common/messages/succes'
import user from '../../Common/Firebase/models/user'

const model ={
    state:{
        searched_users  : [],
        visited_user    : userModel(),
        follow          : false,
        followed        : JSON.parse(localStorage.getItem('followed')) || [],
        followers        : JSON.parse(localStorage.getItem('followers')) || [],
        blocked         : JSON.parse(localStorage.getItem('blocked')) || [],
        recommendation  :  null,
    }, 
    reducers:{
        fetchedRecommended :(state,payload)=>({...state,visited_user:payload }),
        profileVisited     :(state,payload)=>({...state,visited_user:payload }),
        
        usersSearched      :(state,payload)=>({...state,searched_users:payload }),
        usersSearchFailed  :(state,payload)=>({...state,searched_users:[] }),

        blocked            :(state,user)=>({...state , blocked:[...state.blocked,user]}),
        unBlocked          :(state,user)=>({...state , blocked:state.blocked.filter(u=>u.id !== user.id)}),

        toggledFollow      :(state,payload)=>({
            ...state,
            followed:payload.followed
        }),

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
                       dispatch.users.profileVisited(userDoc)
                 })
            } catch (error) {
                console.log(error)
                if(error.message =="NO_USER") 
                   dispatch.toast.add({message:USER_DOESNT_EXIST,type:"DANGER"})
                dispatch.users.userFetchFailed()
            }
        },
        async toggleFollow({user,follow},state){
           try {
                let  followed=null
                let update = null
                if(follow)
                {
                    followed =state.users.followed.filter(u=>u.id !== user.id)
                    update ={
                        following: fireBaseNameSpace.firestore.FieldValue.arrayRemove(user)
                    }
                }else{
                    followed =state.users.followed.push(user)
                    update ={
                        following: fireBaseNameSpace.firestore.FieldValue.arrayUnion(user)
                    }
                }

                localStorage.setItem('followed',JSON.stringify(followed))

                const targetUser =await fireBase.firestore().collection('users').doc(state.auth.user.id)
                const updateResponse= await targetUser.update(update)
          
                dispatch.users.toggledFollow(followed)
                dispatch.toast.add(!follow?FOLLOWED:UNFOLLOWED,"SUCCESS")
            } catch (error) {
                 console.log(error)
            }
        },
        async block(user,state){
           try {
                 const blockedArr= state.users.blocked
                 localStorage.setItem('blocked',JSON.stringify(blockedArr.push(user)))

                  const update ={
                    blocked: fireBaseNameSpace.firestore.FieldValue.arrayUnion(user)
                  }
                  
                 const targetUser =await fireBase.firestore().collection('users').doc(state.auth.user.id)
                 const updateResponse= await targetUser.update(update)
                 dispatch.users.blocked(user)
                 dispatch.toast.add(BLOCKED,"SUCCESS")
            } catch (error) {
                console.log(error)
            }
        },
        async unBlock(user,state){
            try {
                const blockedArr= state.users.blocked
                localStorage.setItem('blocked',JSON.stringify(blockedArr.filter(u=>u.id != user.id)))

                const update ={
                  blocked: fireBaseNameSpace.firestore.FieldValue.arrayRemove(user)
                }
                
                const targetUser =await fireBase.firestore().collection('users').doc(state.auth.user.id)
                const updateResponse= await targetUser.update(update)
                dispatch.users.unBlocked(user)
                dispatch.toast.add(UNBLOCKED,"SUCCESS")
            } catch (error) {
                console.log(error)
            }
        },
        async upLoadProfileImage(image_file,state){
            try {
                if(image_file ==undefined || image_file == null) return 
                console.log('uploading mage for ' + state.auth.user.user_name )
                let image_url ='no_image'
                const strageRef= fireBase.storage().ref()
                const fileRef= strageRef.child(state.auth.user.user_name)
                await fileRef.put(image_file)
                image_url  = await fileRef.getDownloadURL()

                //update image field
                const update ={
                     image: image_url
                }
                dispatch.auth.editUser(update)
                dispatch.toast.add(IMAGE_UPLOAD,"SUCCESS")
            } catch (error) {
                console.log(error)
            }
        },
        async editUserProfile(update,state){
           try {
                const updateForFrestore= {...update}
                if(updateForFrestore.birth_date) updateForFrestore.birth_date= fireBaseNameSpace.firestore.Timestamp.fromDate(updateForFrestore.birth_date)

                const targetUser =await fireBase.firestore().collection('users').doc(state.auth.user.doc_id)
                const updateResponse= await targetUser.update(update)
                
                dispatch.auth.editUser(update)
                dispatch.toast.add(UPDATED,"SUCCESS")
            } catch (error) {
                console.log(error)
            }
        },
    
    })
}
export default model