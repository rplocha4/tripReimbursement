/*  eslint-disable react/prop-types*/
import { useState } from 'react';

const Summary = ({ currentClaims }) => {
  const { mileage, receipts, dailyAllowance } = currentClaims;
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const formattedData = Object.keys(currentClaims)
      .map((key) => {
        if (key === 'dailyAllowance') {
          return { [key]: { nDays: currentClaims[key].nDays } };
        }
        return { [key]: currentClaims[key] };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    fetch('http://localhost:8080/total', {
      method: 'POST',

      body: JSON.stringify(formattedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setTotal(data);
      });
  };

  return (
    <div className="w-full h-full text-center flex flex-col gap-10">
      <h1 className="font-bold text-4xl">Summary</h1>
      <h2>
        {dailyAllowance && (
          <div className="flex flex-col self-start gap-2 text-2xl">
            <p className="self-start">Start date: {dailyAllowance.startDate}</p>
            <p className="self-start">End date: {dailyAllowance.endDate}</p>
          </div>
        )}
      </h2>
      <div className="flex flex-col gap-4 text-2xl ">
        {mileage && (
          <div className="flex flex-col self-start gap-2 text-2xl">
            <p>Car mileage:</p>
            <p className="self-start ml-5">{mileage.amount}km</p>
          </div>
        )}

        {dailyAllowance && (
          <div className="flex flex-col self-start gap-2 text-2xl">
            <p className="self-start">Daily allowance: </p>
            <p className="self-start ml-5">{dailyAllowance.nDays} days</p>
          </div>
        )}
        {receipts && (
          <div className="flex flex-col self-start gap-2 text-2xl">
            <p className="self-start">Receipts: </p>
            {receipts.map((item, index) => (
              <div key={index} className="flex ml-5">
                <p>
                  {index + 1}. {item.name}, amount: ${item.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {total !== 0 && (
        <div className="flex flex-col self-start gap-2 text-2xl">
          <p className="self-start">Total claim: ${total}</p>
        </div>
      )}
      {dailyAllowance ? (
        total === 0 && (
          <button
            className="ml-3 bg-blue-400 rounded-lg hover:bg-blue-300 p-2 self-start"
            onClick={calculateTotal}
          >
            Calculate total
          </button>
        )
      ) : (
        <p>Please add a trip date to calculate total</p>
      )}
    </div>
  );
};

export default Summary;
