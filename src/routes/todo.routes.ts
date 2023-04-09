const express = require("express");
export const todoRouter = express.Router();

todoRouter.get('/all', () => {})
todoRouter.get('/get/:product_id', () => {})
todoRouter.put('/update/:product_id', () => {})
todoRouter.post('/create', () => {})
todoRouter.delete('/delete/:product_id', () => {}) 

