import mongoose, {Types} from 'mongoose'
   
const userStructure = new mongoose.Schema({
    firstName:{
        type: String
    },

    lastName:{
        type:String
    },

    email:{
        type: String
    },

    password:{
        type: string
    }

})

export default mongoose.model('toDo' , userStructure)