require("dotenv").config();

const express = require("express");
const configServer = require("./src/server/server");

const app = configServer(express());


app.listen(app.get("port"), () =>
  console.log(`Server run on port ${app.get("port")}`)
);
