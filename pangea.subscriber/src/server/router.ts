import express from "express";
import { subscribe } from "./subscriber.controller";

export const router = express
                      .Router({strict: true})
                      .get('/', (req, res) => {
                          
                          res.send("Publisher application is running!")
                      }).post('/subscribe/:topic', subscribe);
