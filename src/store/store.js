import {init} from '@rematch/core'
import auth from './models/auth'
import error from './models/Error'
import toast from './models/toast'
import quotes from './models/qoute'

const models={
    auth,
    error,
    toast,
    quotes
}

const store=init({
    models,
})


export default store 
