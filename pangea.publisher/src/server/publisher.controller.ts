import { Request, Response } from 'express';
import Joi from "joi";
import { SubscriptionModel } from '../models/subscription/subscription.model';

//validate subscriber industry
const isValidSubscriber = Joi.object({
    url: Joi.string().uri().required(),
});

export const subscribe = async (req: Request, res: Response) => {

    const { body, params: { topic } } = req;
    await isValidSubscriber.validateAsync(body);

    //update/create mongo collection with update
    await SubscriptionModel.updateOne({ topic },
        {
            topic: topic,
            "$addToSet": { "subscribers": body.url }//append to existing array
        },
        { upsert: true, strict: true })
        .catch(error => {
            res.status(500).json({ err: "Unable to add subscriber to topic." + error })
        })

    var responseData = {
        url: body.url,
        topic: topic
    }

    res.send(responseData);
} 