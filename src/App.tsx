import { Route, Routes } from "react-router-dom";

import { Layout } from "@components/Layout/Layout";
import { InventoryListPage } from "@pages/InventoryListPage/InventoryListPage";
import { CreateProductPage } from "@pages/CreateProductPage/CreateProductPage";
import { ROUTES } from "@constants/routes";
import { TabTitle } from "@components/TabTitle/TabTitle";

function App() {
  return (
    <Layout>
      <TabTitle />
      <Routes>
        <Route path={ROUTES.INVENTORY_LIST} element={<InventoryListPage />} />
        <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProductPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
