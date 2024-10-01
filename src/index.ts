import express from "express";
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./database/config";
// import { isAuth } from "./middlewares/isAuth";
// import auth from "./routes/public/auth";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.get("/hello", (req, res) => {
  res.json({ message: "world" });
}); 

AppDataSource.initialize()
.then(() => {
    // Public router before middleware
    const publicRouterPath = path.resolve(__dirname, "routes", "public");
    const publicRouter: Array<string> = fs.readdirSync(publicRouterPath);

    for (const router of publicRouter) {
      const req_router = require(`./routes/public/${router}/index`);
      app.use(`/${router}`, req_router);
    }
    
    // app.use("/auth", auth);

    // // Middleware xác thực
    // app.use(isAuth);

    // const authedRouterPath = path.resolve(__dirname, "routes", "authed");
    // const authedRouter: Array<string> = fs.readdirSync(authedRouterPath);

    // for (const router of authedRouter) {
    //   const req_router = require(`./routes/authed/${router}/index`);
    //   app.use(`/${router}`, req_router);
    // }
    console.log('ok')
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
})
.catch((error) => console.log("Error initializing data source:", error));
