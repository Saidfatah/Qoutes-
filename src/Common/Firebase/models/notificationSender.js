const notificationSender =( id ,user_name,image)=> ({
    id          :  id || "",
    user_name   :  user_name  || "user_name",
    image       :  image      || "no_image",
})  
export default notificationSender