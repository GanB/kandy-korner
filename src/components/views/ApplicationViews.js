import { Outlet, Route, Routes } from "react-router-dom";
import { Locations } from "../locations/Locations";
// import { TicketForm } from "../tickets/TicketForm";

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
        {/* <Route path="ticket/create" element={<TicketForm />} /> */}
      </Route>
    </Routes>
  );
};
