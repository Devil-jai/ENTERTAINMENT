import "./App.css";
import SignUpPage from "./Components/SignUpPage";
import LoginPage from "./Components/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./Components/Home/HomeScreen";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authCheck } from "./features/auth/authActions";
import { Loader } from "lucide-react";
import TrendingNowSlider from "./Components/Home/TrendingNowSlider";
import MoviesPage from "./Components/Home/MoviesPage";
import TvPage from "./Components/Home/TvPage";
import WatchPage from "./Components/WatchPage";

function App() {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);
  console.log("auth user is here", user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />}>
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TvPage />} />
        </Route>
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage  /> : <Navigate to={"/login"} />}
        />
         {/* <Route path="/watch" element={<WatchPage />} /> */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
