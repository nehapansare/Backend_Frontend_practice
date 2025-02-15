import {model,Schema} from 'mongoose'
const filmSchema =new Schema({
    title:String,
    director:String,
    Poster:String,
    releaseYear:Number,
    language:String,
    rating:Number,
},{timestamps:true});




const Flim=model('Flim',filmSchema);
export default Flim;