import { useEffect, useState } from 'react';

const AllowanceForm = ({ onSubmit, currentClaims }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError('Please fill in all fields');
      return;
    }
    if (startDate > endDate) {
      setError('Start date cannot be after end date');
      return;
    }
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const timeDifference = date2 - date1;

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    onSubmit('dailyAllowance', daysDifference,  startDate, endDate );

    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    setStartDate('');
    setEndDate('');
    setError('');
  };
  useEffect(() => {
    if (localStorage.getItem('startDate')) {
      setStartDate(localStorage.getItem('startDate'));
    }
    if (localStorage.getItem('endDate')) {
      setEndDate(localStorage.getItem('endDate'));
    }
  }, []);

  return (
    <div className="w-full h-full text-center flex flex-col ">
      <h1 className="font-bold text-4xl">Claim daily allowance</h1>

      <form
        action=""
        onSubmit={submitHandler}
        className=" w-full h-full flex flex-col gap-4 text-center justify-center items-center"
      >
        <div className="flex flex-col gap-2 justify-center items-center text-2xl">
          {error && <p className="text-red-500">{error}</p>}
          <p>Start Date</p>
          <input
            type="date"
            name=""
            id=""
            className="text-black rounded-md p-1"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              localStorage.setItem('startDate', e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center text-2xl">
          <p>End Date</p>
          <input
            type="date"
            name=""
            id=""
            className="text-black rounded-md p-1"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              localStorage.setItem('endDate', e.target.value);
            }}
          />
        </div>
        <button className="py-2 px-5 bg-green-400 rounded-lg text-xl hover:bg-green-300 active:scale-90">
          Add
        </button>
      </form>
    </div>
  );
};

export default AllowanceForm;
