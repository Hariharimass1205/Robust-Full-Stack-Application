import mongoose, { Schema, Document } from "mongoose";


interface IUserData extends Document {
  usage: string;
  userGoal: string[];
  Name:String;
  rateUserValue: number;
  suggestion: string;
  birthday: string;
}

const UserDataSchema = new Schema<IUserData>({
  usage: { type: String, required: true },
  Name:{ type: String, required: true },
  userGoal: { type: [String], required: true },
  rateUserValue: { type: Number, required: true },
  suggestion: { type: String, required: false },
  birthday: { type: String, required: true },
});

const UserData = mongoose.model<IUserData>("UserData", UserDataSchema);

export default UserData;
