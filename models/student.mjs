import mongoose, { Schema } from 'mongoose';



const studentSchema = new Schema({
  name :String,
  subject:String,
  marks:String,
  isDeleted:Boolean,
  }, 
  {
  timestamps: true,

},);
export default mongoose.model('Student',studentSchema);
