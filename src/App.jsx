import { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "./Services/firebase";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => data();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      {user ? (
        <Dashboard user={user} signOut={signOut} />
      ) : (
        
          <Login signIn={() => signInWithPopup(auth, provider)} />
        
      )}
    </div>
  );
}

export default App;