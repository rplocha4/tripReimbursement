import { useEffect, useState } from 'react';

const ReceiptForm = ({ onSubmit, currentClaims, data }) => {
  const [error, setError] = useState('');
  const [type, setType] = useState(Object.keys(data.receipts)[0]);
  const [amount, setAmount] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();

    if (!amount) {
      setError('Please fill in all fields');
      return;
    }
    if (amount <= 0) {
      setError('Amount cannot be negative');
      return;
    }
    localStorage.removeItem('type');
    localStorage.removeItem('amount');
    onSubmit('receipts', { name: type, amount });
    setAmount(0);
    setType('Taxi');
    setError('');
  };

  useEffect(() => {
    if (localStorage.getItem('type')) {
      setType(localStorage.getItem('type'));
    }
    if (localStorage.getItem('amount')) {
      setAmount(localStorage.getItem('amount'));
    }
  }, []);

  return (
    <div className="w-full h-full text-center flex flex-col">
      <h1 className="font-bold text-4xl">Claim receipts refund</h1>

      <form
        action=""
        onSubmit={submitHandler}
        className=" w-full h-full flex flex-col gap-4 text-center justify-center items-center"
      >
        <div className="flex flex-col gap-2 justify-center items-center text-2xl w-full text-black">
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-white">Receipt type: </p>

          <select
            className="w-40 rounded-md p-1"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              localStorage.setItem('type', e.target.value);
            }}
          >
            {Object.keys(data.receipts).map((receipt) => (
              <option key={receipt} value={receipt}>
                {receipt}, limit: ${data.receipts[receipt]}
              </option>
            ))}
          </select>
          <div className="">
            <p className="text-white">Amount: </p>
            <input
              type="number"
              name=""
              max={data.receipts[type]}
              min={0}
              id=""
              className="w-40 rounded-md p-1"
              value={amount}
              onChange={(e) => {
                localStorage.setItem('amount', +e.target.value);
                setAmount(+e.target.value);
              }}
            />
          </div>
        </div>

        <button className="py-2 px-5 bg-green-400 rounded-lg text-xl hover:bg-green-300 active:scale-90">
          Add
        </button>
      </form>
    </div>
  );
};

export default ReceiptForm;
