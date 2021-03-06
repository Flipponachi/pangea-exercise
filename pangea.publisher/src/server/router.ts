import express from "express";
import { publish, subscribe } from "./publisher.controller";

export const router = express
                      .Router({strict: true})
                      .get('/', (req, res) => {
                          
                          res.send("Publisher application is running!")
                      }).post('/subscribe/:topic', subscribe)
                      .post('/publish/:topic', publish);
