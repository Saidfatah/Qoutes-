import fireBase from '../../Common/Firebase/Firebase'
import fireBaseNameSpace from 'firebase'
import userModel from '../../Common/Firebase/models/user'
import {USER_DOESNT_EXIST} from '../../Common/messages/errors'
import {IMAGE_UPLOAD,UPDATED,FOLLOWED,UNFOLLOWED,BLOCKED,UNBLOCKED} from '../../Common/messages/succes'

const ids=users=>users.map(u=>u.id)

const model ={
    state:{
        searched_users  : [],
        suggested_users : null,
        visited_user    : userModel(),
        recommendation  : null,
    }, 
    reducers:{
        fetchedRecommended        : (state,payload)=>({...state,recommendation:payload }),
        fetchRecommendedFailed    : (state,payload)=>({...state,recommendation:null }),

        profileVisited            : (state,payload)=>({...state,visited_user:payload }),
           
        usersSuggested            : (state,payload)=>({...state,suggested_users:payload }),
        SuggestedUserCleared      : (state,payload)=>({...state,suggested_users:null }),
 
        usersSearched             : (state,payload)=>({...state,searched_users:[...state.searched_users,payload] }),
        usersSearchFailed         : (state,payload)=>({...state,searched_users:[] }),
 
        userFetchFailed           : (state,payload)=>({...state,visited_user:null , recommendation : null}),
    }, 
    effects: (dispatch)=>({
        async fecthRecommend(id,state){
            try {
                const followedUsersIds    = ids(state.auth.user.following)
                const blockedUsersIds     = ids(state.auth.user.blocked)
                const currentUserId       = state.auth.user.id
                const currentUserTags     = state.auth.user.tags

                //exclude current user and followed users 
                //exclude users we're following 
                //exclude users we have blocked   
                const recommendedResponse = await fireBase
                                            .firestore()
                                            .collection('users')
                                            .where('id','not-in',[...followedUsersIds,...blockedUsersIds,currentUserId])
                                         
                                            

                recommendedResponse.onSnapshot(snapshot=>
                {
                     let recommended   = snapshot.docs.map(user=> (
                            {
                                image     : user.data().image ,
                                doc_id    : user.id ,
                                id        : user.data().id ,
                                full_name : user.data().full_name ,
                                user_name : user.data().user_name ,
                                following : user.data().following ,
                                tags      : user.data().tags , 
                                followers : user.data().followers , 
                                blocked   : user.data().blocked , 
                            }))
                            console.log(recommended)
                            
                     //exclude users who have blocked us
                     recommended       = [...recommended.filter(u=> !ids(u.blocked).includes(currentUserId) )]

  
                     const usersFollowedByUsersWeFollow =  [...recommended.filter(u=> ids(u.followers).some( f => followedUsersIds.includes(f)) )]
                     const usersWhoFollowUsersWeFollow  =  [...recommended.filter(u=> ids(u.followers).some( f => followedUsersIds.includes(f)) )]
                     const usersWhoUseSameTags          =  [...recommended.filter(u=> u.tags.some(f => currentUserTags.includes(f)))]
                     console.log({usersFollowedByUsersWeFollow})
                     console.log({usersWhoFollowUsersWeFollow})
                     console.log({usersWhoUseSameTags})

                    //either this or that randomly  
                    //  if(Math.round(Math.random()) == 0)
                    //  {
                      
                    //  }else{
                         
                    //  }


                     dispatch.users.fetchedRecommended(recommended)
                })
              
            } catch (error) {
                console.log(error)
                if(error.message =="NO_USER")  dispatch.toast.add({message:USER_DOESNT_EXIST,type:"DANGER"})     
                dispatch.users.fetchRecommendedFailed()
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
                       dispatch.users.profileVisited({...userDoc,doc_id:snapshot.docs[0].id})
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
                if(user.followers) delete user.followers
                
                let  CurrentUserupdate = null 
                let  visitedUserupdate = null 
                let  following = [...state.auth.user.following]
                const follower = {
                    id        : state.auth.user.id ,
                    image     : state.auth.user.image ,
                    user_name : state.auth.user.user_name ,
                    full_name : state.auth.user.full_name ,
                }


                //update following array of current user
                if(follow)
                {
                    following = [...following.filter(u=>u.id != user.id )]
                    CurrentUserupdate ={ following: fireBaseNameSpace.firestore.FieldValue.arrayRemove(user) }
                    visitedUserupdate ={ followers: fireBaseNameSpace.firestore.FieldValue.arrayRemove(follower) }
                }else{
                    following.push(user)
                    CurrentUserupdate ={ following: fireBaseNameSpace.firestore.FieldValue.arrayUnion(user) }
                    visitedUserupdate ={ followers: fireBaseNameSpace.firestore.FieldValue.arrayUnion(follower) }
                }

                //update visted followers 
                console.log(visitedUserupdate)
                if(visitedUserupdate == null) throw new Error('FAILED_UPDATE')
                const docRef          = await fireBase.firestore().collection('users').doc(user.doc_id)
                const updateResponse  = await docRef.update(visitedUserupdate) 
            

                dispatch.auth.editFollowing({update:CurrentUserupdate,following})
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