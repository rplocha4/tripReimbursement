import { useEffect, useState } from 'react';
import ReceiptForm from './ReceiptForm';
import AllowanceForm from './AllowanceForm';
import MileageForm from './MileageForm';
import Summary from './Summary';

const CLAIMS = ['dailyAllowance', 'receipts', 'mileage', 'summary'];

const componentsClaims = {
  allowance: AllowanceForm,
  receipts: ReceiptForm,
  mileage: MileageForm,
  summary: Summary,
};
const ClaimForm = ({ onBack }) => {
  const [currentClaim, setCurrentClaim] = useState(0);
  const CurrentComponentClaim =
    componentsClaims[Object.keys(componentsClaims)[currentClaim]];
  const [resultData, setResultData] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/data')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
      localStorage.removeItem('mileage');
      localStorage.removeItem('type');
      localStorage.removeItem('amount');
    };
  }, []);
  if (Object.keys(data).length === 0) return <div>Loading...</div>;

  const submitHandler = (type, data, startDate, endDate) => {
    // if (type === 'receipt') {
    //   setResultData((prev) => ({
    //     ...prev,
    //     [type]: [...(prev[type] || []), data],
    //   }));
    // } else  setResultData((prev) => ({ ...prev, [type]: data }));
    switch (type) {
      case 'receipts':
        setResultData((prev) => ({
          ...prev,
          [type]: [...(prev[type] || []), data],
        }));
        break;
      case 'dailyAllowance':
        setResultData((prev) => ({
          ...prev,
          [type]: {
            nDays: data,
            startDate,
            endDate,
          },
        }));
        break;
      case 'mileage':
        setResultData((prev) => ({
          ...prev,
          [type]: {
            amount: data.mileage,
          },
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-screen h-screen bg-slate-950 text-white">
        <div className="md:w-1/3 w-full h-3/4 flex flex-col bg-slate-900 p-10 justify-between rounded-lg overflow-y-auto gap-10">
          <CurrentComponentClaim
            onSubmit={submitHandler}
            currentClaims={resultData}
            data={data}
          />

          <div className="flex flex-col gap-10 justify-center items-center">
            <div className="items-center gap-5 w-full grid grid-cols-2">
              {currentClaim !== 0 && (
                <button
                  className="py-2 px-5 bg-blue-400 rounded-lg text-xl hover:bg-blue-300 active:scale-90 col-start-1 col-end-1"
                  onClick={() => {
                    setCurrentClaim(currentClaim - 1);
                  }}
                >
                  {'<'}
                </button>
              )}
              {currentClaim !== CLAIMS.length - 1 && (
                <button
                  className="py-2 px-5 bg-blue-400 rounded-lg text-xl hover:bg-blue-300 active:scale-90 col-start-2"
                  onClick={() => {
                    setCurrentClaim(currentClaim + 1);
                  }}
                >
                  {'>'}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 items-centers gap-5 w-full">
              <button
                onClick={onBack}
                className="py-2 px-5 bg-red-400 rounded-lg text-xl hover:bg-red-300 active:scale-90  col-start-1"
              >
                Go Back
              </button>
              {Object.keys(resultData).length > 0 && (
                <button
                  className="py-2 px-5 bg-green-400 rounded-lg text-xl hover:bg-green-300 active:scale-90 col-start-2"
                  onClick={() => {
                    setCurrentClaim(CLAIMS.length - 1);
                  }}
                >
                  See Summary
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
