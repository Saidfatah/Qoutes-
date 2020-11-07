import React from 'react'

const UserImage=({image})=> {
    // <img src="/image.jpg" alt="image" />
    if(image === "no_image") return <img src={window.location.origin+"/images/no-image.jpg"} />
    return <img src={image} />
}

export default UserImage
