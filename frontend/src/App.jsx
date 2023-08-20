import { useEffect, useState } from 'react';
import Login from './components/Login';
import ClaimForm from './components/ClaimForm';
import AdminPanel from './components/AdminPanel';

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [view, setView] = useState('home');

  const loginHandler = (username) => {
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const logoutHandler = () => {
    setUsername('');
    localStorage.removeItem('username');
  };

  if (!username) {
    return <Login onLogin={loginHandler} />;
  }


  return (
    <>
      {view === 'home' ? (
        <div className="w-screen h-screen flex flex-col p-10 gap-10 items-start bg-slate-950 text-white">
          <div className="flex gap-10 items-center">
            <h1 className="font-bold text-4xl">Hello, {username}</h1>
            <button
              className="py-1 px-3 bg-red-400 rounded-lg text-xl hover:bg-red-300 active:scale-90"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
          <p className="text-xl">Claim your trip reimbursement now!</p>
          <button
            className="py-2 px-5 bg-blue-400 rounded-lg text-xl hover:bg-blue-300 active:scale-90"
            onClick={() => {
              setView('claim');
            }}
          >
            Claim
          </button>
          {username?.toLowerCase() === 'admin' && (
            <div className="flex flex-col gap-5">
              <h2 className="font-bold text-2xl">Admin Panel</h2>
              <button
                className="py-2 px-5 bg-blue-400 rounded-lg text-xl hover:bg-blue-300 active:scale-90"
                onClick={() => {
                  setView('manage');
                }}
              >
                Manage claims
              </button>
            </div>
          )}
        </div>
      ) : view === 'claim' ? (
        <ClaimForm
          onBack={() => {
            setView('home');
          }}
        />
      ) : (
        <AdminPanel
          onBack={() => {
            setView('home');
          }}
        />
      )}
    </>
  );
}

export default App;
