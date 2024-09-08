import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
}

// Sets up the schema with email and password to be mandatory
const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export default mongoose.model<IUser>('User', UserSchema);