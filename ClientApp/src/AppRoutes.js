import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/goal-setting',
    element: <FetchData />
  },
  {
    path: '/shopping-cart',
    element: <ShoppingCart />
  }
];

export default AppRoutes;
