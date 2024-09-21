const express = require("express");

const { addtodo, updatetodo, deletetodo , getalltodo} = require("./TodoController");

const routers = express.Router();

routers.get("/todo", getalltodo);

routers.post("/todo", addtodo);

routers.delete("/todo/:id", deletetodo);
 
routers.patch("/todo/:id", updatetodo);

module.exports = routers;
