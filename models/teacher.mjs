import mongoose, { Schema } from 'mongoose';



const teacherSchema = new Schema({
  username: String,
  password: String,
  name :String,
  isDeleted:Boolean,
  }, 
  {
  timestamps: true,

},);
export default mongoose.model('Teacher',teacherSchema);
