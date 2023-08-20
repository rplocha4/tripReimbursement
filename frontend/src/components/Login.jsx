import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter a username');
      return;
    }
    onLogin(username);
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-950 text-white">
      <div className="md:w-1/3 w-full h-1/2 flex flex-col bg-slate-900 p-10 justify-between rounded-lg">
        <h1 className="font-bold text-5xl flex items-center justify-center">
          Login
        </h1>
        <form
          className="flex gap-10 flex-col justify-center items-center"
          action=""
          onSubmit={submitHandler}
        >
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <input
            className="border-2 border-slate-700 rounded-md p-2 bg-inherit text-white "
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error && e.target.value) {
                setError('');
              }
            }}
          />
          <button className="py-2 px-5 bg-blue-400 rounded-lg text-xl hover:bg-blue-300 active:scale-90">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
