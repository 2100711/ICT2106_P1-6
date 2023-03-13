import { BuildingOverviewView } from "./components/CarbonFootprint/BuildingOverviewView";
import { CustomerReportView } from "./components/CarbonFootprint/CustomerReportView";
import { RoomOverviewView } from "./components/CarbonFootprint/RoomOverviewView";
import Home from "./components/Home";
import InventoryDashboard from "./components/Inventory/InventoryDashboard";
import { Products } from "./components/Inventory/Products";
import { Stock } from "./components/Inventory/Stock";
import { Reward } from "./components/Reward/Reward";
import { Rewards } from "./components/Reward/Rewards";
import { AddRewardForm } from "./components/Reward/AddRewardForm";
import { Goals } from "./components/Goal/Goals";
import { Recommender } from "./components/Recommender/Recommender";

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
    path: '/rewards',
    element: <Rewards />
  },
  {
    path: '/reward/:id',
    element: <Reward />
  },
  {
    path: '/create-reward',
    element: <AddRewardForm />
  },
  {
    path: '/goal',
    element: <Goals />
  },
  {
    path: '/recommender',
    element: <Recommender />
  }
];

export default AppRoutes;
