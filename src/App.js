import { Routes, Route } from "react-router-dom";

import Adminlogin from "./Comp/Admin/Adminlogin";

import AdminLayout from "./Comp/Admin/AdminLayout";

import Dashboard from "./Comp/Admin/Dashboard";

import CattleManagement from "./Comp/Admin/CattleManagement";

import CreateCow from "./Comp/Admin/CreateCow";
import Feedplan from "./Comp/Admin/Feedplan";
import FoodIntake from "./Comp/Admin/FoodIntake ";
import CreateFoodIntake from "./Comp/Admin/CreateFoodIntake";
import CowDeath from "./Comp/Admin/CowDeath";
import CowDeathSearch from "./Comp/Admin/CowDeathSearch";
import CowDeathRecord from "./Comp/Admin/CowDeathRecord";
import Sellrecord from "./Comp/Admin/Sellrecord";
import CreateSellRecord from "./Comp/Admin/CreateSellRecord";
import TreatmentList from "./Comp/Admin/TreatmentList";
import CreateTreatment from "./Comp/Admin/CreateTreatment";
import AddCow from "./Comp/Admin/AddCow";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Adminlogin />} />

      <Route path="/admin-dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="cows" element={<CattleManagement />} />
        <Route path="cows/create" element={<AddCow />} />
        <Route path="feed-plan" element={<Feedplan />} />
        <Route path="intake" element={<FoodIntake />} />
        <Route path="cow-death" element={<CowDeath />} />
        <Route path="sold" element={<Sellrecord />} />
        <Route path="treatment" element={<TreatmentList />} />
        {/* <Route path="/admin-dashboard/cows/create" element={<CreateCow />} /> */}
        <Route path="/admin-dashboard/create-food-intake" element={<CreateFoodIntake />} />
        <Route path="/admin-dashboard/cowdeath/search" element={<CowDeathSearch />} />
        <Route path="/admin-dashboard/cowdeath/record" element={<CowDeathRecord />} />
        <Route path="/admin-dashboard/sold/create" element={<CreateSellRecord />} />
        <Route path="/admin-dashboard/create-treatment" element={<CreateTreatment />} />
      </Route>
    </Routes>
  );
};

export default App;
