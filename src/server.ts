import express from 'express';
import bodyParser from 'body-parser';
import user_routes from './handler/user';
import product_route from './handler/products';
import order_routes from './handler/orders';
import dashboard_routes from './handler/dashboard';

const app: express.Application = express();
const address: string = 'http://localhost:3000';

app.use(bodyParser.urlencoded({ extended: false }));

user_routes(app);
product_route(app);
order_routes(app);
dashboard_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
