import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import cors from "cors";

import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, async function () {
  console.log(`starting app on: ${address}`);

});
export default app