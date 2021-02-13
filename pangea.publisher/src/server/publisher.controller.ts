import axios from 'axios';
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
        .then(success => {

            var responseData = {
                url: body.url,
                topic: topic
            }

            res.send(responseData);
        })
        .catch(error => {
            res.status(500).json({ err: "Unable to add subscriber to topic." + error })
        })
}


export const publish = async (req: Request, res: Response) => {
    try {

      const { body, params: { topic } } = req;
      const successfulPublish = {};
      const failedPublish = {};

      const subscription = await SubscriptionModel.findOne({ topic }).select("+subscribers -_id");
  
      if (!subscription) {
        return res.status(200).json({
          msg: "No Subscriber found found",
          successfulPublish: {},
          failedPublish: {}
        });
      }

      await Promise.all(subscription.subscribers.map(url => {
        return axios.post(url, body)
          .then(_ => {
            successfulPublish[url] = `Published to subscriber : ${url} successfully`;
           
          })
          .catch(_ => {
            console.error(`Unsuccessful publishing to ${url}`);
            failedPublish[url] = `Unsuccessful publishing to ${url}`;
          });
      }));
  
      res.status(200).json({
        published: successfulPublish,
        unpublished: failedPublish
      });
    } catch (err) {
      console.error(err);
      res.status(502).json({ msg: 'Unabke to complete request. Error details ' + err })
    }
  }
