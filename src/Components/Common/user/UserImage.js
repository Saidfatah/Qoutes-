import React from 'react'
import {Image} from './styled'
const UserImage=({image})=> {
    // <img src="/image.jpg" alt="image" />
    if(image === "no_image") return <Image src={window.location.origin+"/images/no-image.jpg"} />
    return <Image src={image} />
}

export default UserImage
