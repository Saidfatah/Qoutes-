import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
     faHeart,
     faSignLanguage,
     faShare ,
     faHashtag,
     faImage ,
     faArrowLeft,
     faMapMarkerAlt,
     faCalendarAlt,
     faBirthdayCake
} from '@fortawesome/free-solid-svg-icons'
import {
    faHeart as farHeart ,
    faCommentAlt ,
    faBell,
    faUser,
    faEnvelope,
    faTrashAlt
} from '@fortawesome/free-regular-svg-icons'

//send
//reply
//like
//config
//modify
//image
//logout
//log in 
//location
//calender
//arrow left
//arrow left



export const EmptyHeart = ({color,fontSize})=> <FontAwesomeIcon  icon={farHeart}        style={{color,fontSize}} /> ;
export const FullHeart  = ({color,fontSize})=> <FontAwesomeIcon  icon={faHeart}         style={{color,fontSize}} /> ;
export const Reply      = ({color,fontSize})=> <FontAwesomeIcon  icon={faCommentAlt}    style={{color,fontSize}} /> ;
export const Share      = ({color,fontSize})=> <FontAwesomeIcon  icon={faShare}         style={{color,fontSize}} /> ;
export const Submit     = ({color,fontSize})=> <FontAwesomeIcon  icon={faHeart}         style={{color,fontSize}} /> ;
export const LogOut     = ({color,fontSize})=> <FontAwesomeIcon  icon={faSignLanguage}  style={{color,fontSize}} /> ;
export const Bell       = ({color,fontSize})=> <FontAwesomeIcon  icon={faBell}          style={{color,fontSize}} /> ;
export const User       = ({color,fontSize})=> <FontAwesomeIcon  icon={faUser}          style={{color,fontSize}} /> ;
export const Hashtag    = ({color,fontSize})=> <FontAwesomeIcon  icon={faHashtag}       style={{color,fontSize}} /> ;
export const Message    = ({color,fontSize})=> <FontAwesomeIcon  icon={faEnvelope}      style={{color,fontSize}} /> ;
export const Delete     = ({color,fontSize})=> <FontAwesomeIcon  icon={faTrashAlt}      style={{color,fontSize}} /> ;
export const Image      = ({color,fontSize})=> <FontAwesomeIcon  icon={faImage}         style={{color,fontSize}} /> ;
export const ArrowLeft  = ({color,fontSize})=> <FontAwesomeIcon  icon={faArrowLeft}     style={{color,fontSize}} /> ;
export const Location   = ({color,fontSize})=> <FontAwesomeIcon  icon={faMapMarkerAlt}  style={{color,fontSize}} /> ;
export const Calender   = ({color,fontSize})=> <FontAwesomeIcon  icon={faCalendarAlt}   style={{color,fontSize}} /> ;
export const Birth      = ({color,fontSize})=> <FontAwesomeIcon  icon={faBirthdayCake}  style={{color,fontSize}} /> ;
 
