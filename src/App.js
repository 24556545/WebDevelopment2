import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import FundraiserPage from './FundraiserPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UnderConstruction from './pages/UnderConstruction';
import FundraiserDetails from './pages/FundraiserDetails';
import EditFundraiserForm from './pages/EditFundraiserForm';
import AddFundraiserForm from './pages/AddFundraiserForm';
import DonationPage from './DonationPage';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import { AuthProvider } from './AuthContext'; // Import the AuthProvider to wrap your app

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fundraisers" element={<FundraiserPage />} /> {/* New route for Fundraiser Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protect these routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add" 
            element={
              <ProtectedRoute>
                <AddFundraiserForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <ProtectedRoute>
                <EditFundraiserForm />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/fundraiser/:id" element={<FundraiserDetails />} /> {/* Dynamic Fundraiser Route */}
          <Route path="/donate/:id" element={<DonationPage />} /> {/* New route for donations */}
          <Route path="/underconstruction" element={<UnderConstruction />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
