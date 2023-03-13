import { BuildingOverviewView } from "./components/CarbonFootprint/BuildingOverviewView";
import { CustomerReportView } from "./components/CarbonFootprint/CustomerReportView";
import { RoomOverviewView } from "./components/CarbonFootprint/RoomOverviewView";
import { Goals } from "./components/Goal/Goals";
import Home from "./components/Home";
import InventoryDashboard from "./components/Inventory/InventoryDashboard";
import { Products } from "./components/Inventory/Products";
import { Stock } from "./components/Inventory/Stock";
import { Reward } from "./components/Reward/Reward";
<<<<<<< HEAD
import { Rewards } from "./components/Reward/Rewards";
import { AddRewardForm } from "./components/Reward/AddRewardForm";
import { Goals } from "./components/Goal/Goals";
import { Recommender } from "./components/Recommender/Recommender";
=======
>>>>>>> fc1ddfa0313e7a88f2222c9914e7530f6c28e994

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/inventory',
    element: <InventoryDashboard />
  },
  {
    path: '/inventory/stock',
    element: <Stock />
  },
  {
    path: '/inventory/products',
    element: <Products />
  },
  {
    path: '/building-overview',
    element: <BuildingOverviewView />
  },
  {
    path: '/customer-report',
    element: <CustomerReportView />
  },
  {
    path: '/building-report/:level/:roomID',
    element: <RoomOverviewView />
  },
  {
    path: '/reward',
    element: <Reward />
  },
  {
    path: '/goal-setting',
    element: <Goals />
  },
<<<<<<< HEAD
  {
    path: '/recommender',
    element: <Recommender />
  }
=======
>>>>>>> fc1ddfa0313e7a88f2222c9914e7530f6c28e994
];

export default AppRoutes;
