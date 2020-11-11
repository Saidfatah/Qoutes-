import {init} from '@rematch/core'
import auth from './models/auth'
import error from './models/Error'
import toast from './models/toast'
import quotes from './models/quote'
import users from './models/user'

const models={
    auth,
    error,
    toast,
    quotes,
    users
}

const store=init({
    models,
})


export default store 
