import { DashboardQueries } from '../services/dashboard';
import express, { Application, Request, Response } from 'express';

const dashboard = new DashboardQueries();

const productsInOrder = async (req: Request, res: Response) => {
  const products = await dashboard.userOrderProduct();
  res.json(products);
};

const fivePopularProducts = async (req: Request, res: Response) => {
  const products = await dashboard.fiveMostPopular();
  res.json(products);
};

const dashboard_routes = (app: express.Application) => {
  app.get('/products_in_orders', productsInOrder);
  app.get('/five-product', fivePopularProducts);
};

export default dashboard_routes;
