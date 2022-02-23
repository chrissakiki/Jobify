import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./context/AppProvider";
import { Landing, Register, Error, ProtectedRoute } from "./pages";
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/dashboard";
function App() {
  const { user } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/landing"
          element={!user ? <Landing /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
