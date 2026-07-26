import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// Home
import HomePage from "./features/home/pages/HomePage";


// Auth
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";


// Layout
import DashboardLayout from "./layouts/DashboardLayout";


// Dashboard
import Dashboard from "./features/dashboard/pages/Dashboard";
import Profile from "./features/profile/pages/Profile";
import CompleteProfilePage from "./features/profile/pages/CompleteProfilePage";
import EditProfile from "./features/profile/pages/EditProfile";

// Avatar
import CreateAvatar from "./features/avatar/pages/CreateAvatar";


// Posts
import PostsPage from "./features/posts/pages/PostsPage";


// Countries
import CountriesPage from "./features/countries/pages/CountriesPage";
import CountryDetailsPage from "./features/countries/pages/CountryDetailsPage";


// Universities
import UniversitiesPage from "./features/universities/pages/UniversitiesPage";
import UniversityDetailsPage from "./features/universities/pages/UniversityDetailsPage";


// Academic
import Faculties from "./features/faculties/pages/Faculties";
import Specialties from "./features/specialties/pages/Specialties";
import Levels from "./features/levels/pages/Levels";
import Semesters from "./features/semesters/pages/Semesters";
import Modules from "./features/modules/pages/Modules";



export default function App() {


  return (

    <BrowserRouter>

      <Routes>


        {/* Public */}

        <Route
          path="/"
          element={<HomePage />}
        />


        <Route
          path="/login"
          element={<LoginPage />}
        />


        <Route
          path="/register"
          element={<RegisterPage />}
        />



        {/* Complete Profile */}

        <Route
          path="/complete-profile"
          element={<CompleteProfilePage />}
        />



        {/* Old Avatar route */}

        <Route
          path="/create-avatar"
          element={<CreateAvatar />}
        />





        {/* Protected */}

        <Route element={<ProtectedRoute />}>


          <Route element={<DashboardLayout />}>


            <Route
              path="/dashboard"
              element={<Dashboard />}
            />


            <Route
              path="/profile"
              element={<Profile />}
            />

             <Route
              path="/profile/edit"
              element={<EditProfile />}
             />

            {/* Posts */}

            <Route
              path="/posts"
              element={<PostsPage />}
            />



            {/* Countries */}

            <Route
              path="/countries"
              element={<CountriesPage />}
            />


            <Route
              path="/countries/:countryId"
              element={<CountryDetailsPage />}
            />



            {/* Universities */}

            <Route
              path="/universities"
              element={<UniversitiesPage />}
            />


            <Route
              path="/universities/:universityId"
              element={<UniversityDetailsPage />}
            />



            {/* Faculties */}

            <Route
              path="/faculties"
              element={<Faculties />}
            />


            <Route
              path="/universities/:universityId/faculties"
              element={<Faculties />}
            />



            {/* Academic */}

            <Route
              path="/faculties/:id/specialties"
              element={<Specialties />}
            />


            <Route
              path="/specialties/:id/levels"
              element={<Levels />}
            />


            <Route
              path="/levels/:levelId/semesters"
              element={<Semesters />}
            />


            <Route
              path="/semesters/:semesterId/modules"
              element={<Modules />}
            />



          </Route>

        </Route>




        {/* 404 */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />


      </Routes>

    </BrowserRouter>

  );

}