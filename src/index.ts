/*
 *
 *
 *
 */
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
// import { connectToDatabase } from "./services/dao"
import { router as CupcakeRouter } from "./routes/cupcakes.router";
import { router as HealthRouter } from "./routes/health.router";


const app: Express = express();
const port = process.env.PORT || 3000;
const swaggerDoc = YAML.load("./docker/swagger.yaml");

app.use(morgan('dev'));
app.use("/specs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/health", HealthRouter);
app.use("/v2/cupcake", CupcakeRouter);

app.use((
  err: any, // eslint-disable-line 
  req: Request,
  res: Response,
  _next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
