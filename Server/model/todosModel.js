import mongoose, {Types} from 'mongoose'

const todoStructure = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    text:{
        type: String,
        
    },

    date:{
        type: Date,
        default:Date.now()
    },

    isChecked:{
        type: Boolean,
        default:true
    },

    priority:{
        type:Number,
        default:1
    },

    index:{
        type:Number,
    }

})

export default mongoose.model('toDo' , todoStructure)