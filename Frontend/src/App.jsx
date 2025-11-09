import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Pages/Auth.jsx";
import Posts from "./Pages/Post.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import EditPost from "./Pages/EditPost.jsx";
import Profile from "./Pages/Profile.jsx";
import { useAuth } from "./context/AuthContext.jsx"; 

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();   
  return token ? children : <Navigate to="/" />;
};

function App() {
  const { token } = useAuth();  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route
          path="/"
          element={!token ? <Auth /> : <Navigate to="/posts" />}
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
