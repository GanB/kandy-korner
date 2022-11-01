import { Outlet, Route, Routes } from "react-router-dom";
import { Locations } from "../locations/Locations";
import { Products } from "../Products/Products";
import { ProductForm } from "../Products/ProductForm";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Kandy Korner</h1>
            <div>Your Favorite Sweet Shoppe</div>

            <Outlet />
          </>
        }
      >
        <Route path="locations" element={<Locations />} />
        <Route path="products" element={<Products />} />
        <Route path="product/add" element={<ProductForm />} />
      </Route>
    </Routes>
  );
};
