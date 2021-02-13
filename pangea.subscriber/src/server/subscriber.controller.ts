import { Request, Response } from 'express';

export const subscribe = (req: Request, res: Response) => {
  try {
    const { body } = req;

    res.status(200).json({
      msg: `Received message from publisher service`,
      data: body
    });

    console.log({
      msg: `Received message from publisher service`,
      data: body
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Unable to complete operation. Error details " + err })
  }
}