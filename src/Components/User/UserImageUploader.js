import React,{useState} from 'react'

const UserImageUploader=({upLoadProfileImage})=> {
    const [imageFile, setimageFile] = useState(null)

    const submit=e=>{
        e.preventDefault()
        if(imageFile == null ) return
        upLoadProfileImage(imageFile)
    }
    return (
        <div>
            <form onSubmit={submit}>
                <input type="file" 
                onChange={e=>{
                    setimageFile(e.target.files[0])
                }} 
                />
                <button type="submit" >upload image</button>
            </form>
          
        </div>
    )
}

export default UserImageUploader
