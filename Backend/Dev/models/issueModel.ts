// Author: Aadith Shameel - B00929852
import mongoose, { Document, Model } from "mongoose";

export interface IIssue extends Document {
    title: string;
    description: string;
    userName: string;
}

const issueSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userName: {type: String, required: true},
});

const Issue: Model<IIssue> = mongoose.model<IIssue>('Issue', issueSchema)

export default Issue;