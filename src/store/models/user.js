import fireBase from '../../Common/Firebase/Firebase'
import fireBaseNameSpace from 'firebase'
import userModel from '../../Common/Firebase/models/user'
import {USER_DOESNT_EXIST} from '../../Common/messages/errors'
import {IMAGE_UPLOAD,UPDATED,FOLLOWED,UNFOLLOWED,BLOCKED,UNBLOCKED} from '../../Common/messages/succes'
import user from '../../Common/Firebase/models/user'

const model ={
    state:{
        searched_users  : [],
        suggested_users : null,
        visited_user    : userModel(),
        recommendation  : null,
    }, 
    reducers:{
        fetchedRecommended   :(state,payload)=>({...state,recommendation:payload }),
        profileVisited       :(state,payload)=>({...state,visited_user:payload }),
          
        usersSuggested        :(state,payload)=>({...state,suggested_users:payload }),
        SuggestedUserCleared :(state,payload)=>({...state,suggested_users:null }),

        usersSearched        :(state,payload)=>({...state,searched_users:[...state.searched_users,payload] }),
        usersSearchFailed    :(state,payload)=>({...state,searched_users:[] }),

        userFetchFailed:(state,payload)=>({...state,visited_user:null , recommendation : null}),
    },
    effects: (dispatch)=>({
        async fecthRecommend(id,state){
            try {
                const followedUsersIds   = state.auth.followed.map(u=>u.id)
                const followingUsersIds  = state.auth.following.map(u=>u.id)
                const currentUserId      = state.auth.user.id

                const recommendedResponse = await fireBase
                                            .firestore()
                                            .collection('users')
                                            .where('id','not-in',[...followedUsersIds])
                                         

                recommendedResponse.onSnapshot(snapshot=>
                {
                        const recommended= snapshot.docs.map(user=> (
                            {
                                image:user.data().image,
                                doc_id:user.id,
                                id:user.data().id,
                                full_name:user.data().full_name,
                                user_name:user.data().user_name,
                            }))
                        dispatch.users.fetchedRecommended(recommended)
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
                    dispatch.users.usersSearched(userDoc)
                })
            } catch (error) {
                console.log(error)
                if(error.message =="NO_USER") 
                   dispatch.toast.add({message:USER_DOESNT_EXIST,type:"DANGER"})
                dispatch.auth.usersSearchFailed()
            }
        },
        async suggestUsers(full_name,state){
           try {
               
                const users = [
                     {
                       full_name: 'aziz fatah',
                       id: '2OFAMNWk7ycLzaPVi3SJbJe7kBB3',
                       image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
                     },
                    {
                       full_name: 'Said fatah',
                       id: 'azgDma3eN9Nvo5HOKquxPRitOK23',
                       image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                     },
                    {
                       full_name: 'mohamed fatah',
                       id: 'a7Fr8ODkeKUMk0e73t4eQHkF6bE3',
                       image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                     },
                ];
                const matchedUsers=  users.filter(u=>u.full_name.indexOf(full_name) > -1)
                console.log({matchedUsers})
                dispatch.users.usersSuggested(matchedUsers)
            } catch (error) {
                console.log(error)
                dispatch.auth.usersSearchFailed()
            }
        },
        async clearSuggestedUser(user_name,state){
           try {
                dispatch.users.SuggestedUserCleared()
            } catch (error) {
                console.log(error)
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
                let  update  = null 
                let  following = [...state.auth.user.following]
                console.log({following})

                if(follow)
                {
                    following = [...following.filter(u=>u.id != user.id )]
                    update ={ following: fireBaseNameSpace.firestore.FieldValue.arrayRemove(user) }
                }else{
                    following.push(user)
                    update ={ following: fireBaseNameSpace.firestore.FieldValue.arrayUnion(user) }
                }

                dispatch.auth.editFollowing({update,following})
                dispatch.toast.add(!follow?FOLLOWED:UNFOLLOWED,"SUCCESS")
            } catch (error) {
                 console.log(error)
            }
        },
        async block(user,state){
           try {
                 const update ={ blocked: fireBaseNameSpace.firestore.FieldValue.arrayUnion(user) }
                 let blocked= [...state.auth.user.blocked]
                 blocked.push(user)
                
                 dispatch.auth.editBlocked({update, blocked})
                 dispatch.toast.add(BLOCKED,"SUCCESS")
            } catch (error) {
                console.log(error)
            }
        },
        async unBlock(user,state){
            try {
                
                const update ={ blocked: fireBaseNameSpace.firestore.FieldValue.arrayRemove(user) }
                const blocked= state.auth.user.blocked.filter(u=>u.id != user.id)

                dispatch.auth.editBlocked({update, blocked})
                dispatch.toast.add(BLOCKED,"SUCCESS")
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
                dispatch.auth.editUser(update)
            } catch (error) {
                console.log(error)
            }
        },
    
    })
}
export default model