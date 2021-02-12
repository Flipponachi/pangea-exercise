import { mongoose } from "mongoose";

//define schema of subscription
export const SubscriptionSchema = new mongoose.Schema({
    topic: {type: String, required: true},
    subscribers: [String]
});

//prevent duplicate entry and to ensure faster retrieves
SubscriptionSchema.index({'topic': 1}, {unique: true})
