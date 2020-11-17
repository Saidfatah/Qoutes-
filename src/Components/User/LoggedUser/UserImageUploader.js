import React,{useState} from 'react'
import Modal from '../../Common/Modal/Modal'
import {Flex} from '../../Common/Styled Components/Container'
import {Submit} from '../../Common/Styled Components/Buttons'
const UserImageUploader=({upLoadProfileImage,imageUploadModalDislay, setimageUploadModalDislay})=> {
    const [imageFile, setimageFile] = useState(null)

    const submit=e=>{
        e.preventDefault()
        if(imageFile == null ) return
        upLoadProfileImage(imageFile)
    }

    return (
        <Modal display={imageUploadModalDislay} setdisplay={setimageUploadModalDislay} title="image upload">
            <form onSubmit={submit}>
                <Flex justify="space-between">
                     <input type="file"  onChange={e=>{ setimageFile(e.target.files[0])}} />
                     <Submit type="submit" >upload image</Submit>
                </Flex>
            </form>
        </Modal>
    )
}

export default UserImageUploader
