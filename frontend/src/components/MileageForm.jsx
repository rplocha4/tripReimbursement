import { useEffect, useState } from 'react';

const MileageForm = ({ onSubmit, currentClaims }) => {
  const [mileage, setMileage] = useState(0);
  const [error, setError] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!mileage) {
      setError('Please fill in all fields');
      return;
    }
    if (mileage < 0) {
      setError('Mileage cannot be negative');
      return;
    }
    localStorage.removeItem('mileage');
    onSubmit('mileage', { mileage });

    setMileage(0);
    setError('');
  };
  useEffect(() => {
    if (localStorage.getItem('mileage')) {
      setMileage(+localStorage.getItem('mileage'));
    }
  }, []);
  return (
    <div className="w-full h-full text-center flex flex-col ">
      <h1 className="font-bold text-4xl">Claim car mileage</h1>

      <form
        action=""
        onSubmit={submitHandler}
        className=" w-full h-full flex flex-col gap-4 text-center justify-center items-center"
      >
        <div className="flex flex-col gap-2 justify-center items-center text-2xl">
          {error && <p className="text-red-500">{error}</p>}
          <p>Car mileage</p>
          <input
            type="number"
            name=""
            id=""
            className="text-black rounded-md w-1/2 p-1"
            value={mileage}
            onChange={(e) => {
              setMileage(+e.target.value);
              localStorage.setItem('mileage', e.target.value);
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

export default MileageForm;
