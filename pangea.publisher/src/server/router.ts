import express from "express";

export const router = express
                      .Router({strict: true})
                      .get('/', (req, res) => {
                          console.log(req);
                          res.send("Publisher application is running!")
                      });
