import { model ,Schema } from 'mongoose';

const User = new Schema({
  username: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  //salt: {type: String, required: true}
}, {
  timestamps: true,
});

export default model("User", User);
