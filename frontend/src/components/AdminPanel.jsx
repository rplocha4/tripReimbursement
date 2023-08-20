import { useEffect, useState } from 'react';

const AdminPanel = ({ onBack }) => {
  const [data, setData] = useState({});
  const [serverData, setServerData] = useState({});
  const [addReceipt, setAddReceipt] = useState(false);

  const [newReceiptData, setNewReceiptData] = useState('');
  const [newReceiptLimit, setNewReceiptLimit] = useState(0);
  const [result, setResult] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/postData', {
      method: 'POST',

      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((res) => {
        setResult(res);
      });
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResult('');
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [result]);

  useEffect(() => {
    fetch('http://localhost:8080/data')
      .then((res) => res.json())
      .then((res) => {
        setServerData(res);
        setData(res);
      });
  }, []);
  if (Object.keys(data).length === 0) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-950 text-white">
      {result && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className={`bg-${
              result === 'fail' ? 'red' : 'green'
            }-900 p-10 rounded-lg`}
          >
            <p className="text-2xl font-bold">
              {result === 'fail'
                ? 'Error submitting data'
                : 'Data submitted successfully'}
            </p>
          </div>
        </div>
      )}
      <form
        className="md:w-1/3 w-full h-3/4 flex flex-col bg-slate-900 p-10 rounded-lg overflow-y-auto gap-10"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-4xl text-center">Admin Panel</h1>
        <div>
          <p className="text-xl font-bold">Claims limits: </p>
          <div className="flex flex-col">
            <Rates
              val={data.dailyAllowanceRate}
              name="Daily allowance rate"
              key="Daily allowance rate"
              onSave={(newVal) => {
                if (newVal < 0) {
                  return;
                }

                setData((prevData) => {
                  return {
                    ...prevData,
                    dailyAllowanceRate: newVal,
                  };
                });
              }}
            />

            <Rates
              val={data.mileageRate}
              name="Mileage allowance rate"
              key="Mileage allowance rate"
              onSave={(newVal) => {
                if (newVal < 0) {
                  return;
                }

                setData((prevData) => {
                  return {
                    ...prevData,
                    mileageRate: newVal,
                  };
                });
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-xl font-bold">List of receipts: </p>
          <ul>
            {Object.keys(data.receipts).map((receipt) => {
              return (
                <li key={receipt} className="py-1">
                  <Receipt
                    receipt={receipt}
                    limit={data.receipts[receipt]}
                    onDelete={() => {
                      setData((prevData) => {
                        return {
                          ...prevData,
                          receipts: Object.fromEntries(
                            Object.entries(prevData.receipts).filter(
                              ([key]) => key !== receipt
                            )
                          ),
                        };
                      });
                    }}
                    onEdit={(oldReceipt, newReceipt, newLimit) => {
                      setData((prevData) => {
                        return {
                          ...prevData,
                          receipts: Object.fromEntries(
                            Object.entries(prevData.receipts).map(
                              ([key, val]) => {
                                if (key === oldReceipt) {
                                  return [newReceipt, newLimit];
                                }
                                return [key, val];
                              }
                            )
                          ),
                        };
                      });
                    }}
                  />
                </li>
              );
            })}
          </ul>
          {addReceipt ? (
            <div className="flex gap-3">
              <input
                type="text"
                className="text-black  rounded-md w-40"
                value={newReceiptData}
                onChange={(e) => {
                  setNewReceiptData(e.target.value);
                }}
              />
              <input
                type="number"
                className="text-black  rounded-md w-20"
                value={+newReceiptLimit}
                onChange={(e) => {
                  setNewReceiptLimit(+e.target.value);
                }}
              />
              <button
                className="ml-3 bg-red-400 rounded-lg hover:bg-red-300 px-1"
                type="button"
                onClick={() => {
                  setAddReceipt(false);
                }}
              >
                Cancel
              </button>
              <button
                className="ml-3 bg-green-400 rounded-lg hover:bg-green-300 px-1"
                type="button"
                onClick={() => {
                  setData((prevData) => {
                    if (Object.keys(data.receipts).includes(newReceiptData)) {
                      return prevData;
                    }
                    if (newReceiptData === '' || newReceiptLimit === 0) {
                      return prevData;
                    }

                    return {
                      ...prevData,
                      receipts: {
                        ...prevData.receipts,
                        [newReceiptData]: newReceiptLimit,
                      },
                    };
                  });
                  setNewReceiptData('');
                  setNewReceiptLimit(0);
                  setAddReceipt(false);
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddReceipt(true)}
              className="bg-green-600 rounded-lg hover:bg-green-500 p-1 "
            >
              Add receipt
            </button>
          )}
        </div>
        <div>
          <div>
            <p className="text-xl font-bold">Claim limits: </p>
            {Object.keys(data.limits).map((key) => {
              return (
                <Limits
                  key={key}
                  val={data.limits[key]}
                  name={key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function (str) {
                      return str.toUpperCase();
                    })}
                  onSave={(newVal) => {
                    if (newVal < 0) {
                      return;
                    }

                    setData((prevData) => {
                      return {
                        ...prevData,
                        limits: {
                          ...prevData.limits,
                          [key]: newVal,
                        },
                      };
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="py-2 px-5 bg-red-400 rounded-lg text-xl hover:bg-red-300 active:scale-90  col-start-1"
          >
            Go Back
          </button>
          <button className="py-2 px-5 bg-green-400 rounded-lg text-xl hover:bg-green-300 active:scale-90 col-start-2 self-center">
            Save
          </button>
          <button
            type="button"
            className="py-2 px-5 bg-blue-400 rounded-lg text-xl hover:bg-blue-300 active:scale-90 col-start-2 self-center"
            onClick={() => {
              setData(serverData);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;

const Receipt = ({ receipt, limit, onDelete, onEdit }) => {
  const [editReceipt, setEditReceipt] = useState(false);
  const [newReceipt, setNewReceipt] = useState(receipt);
  const [newLimit, setNewLimit] = useState(limit);
  return (
    <div className="flex gap-3">
      {editReceipt ? (
        <div className="flex gap-3">
          <input
            type="text"
            defaultValue={receipt}
            className="text-black  rounded-md w-20"
            onChange={(e) => {
              setNewReceipt(e.target.value);
            }}
          />
          <input
            type="number"
            defaultValue={+limit}
            className="text-black  rounded-md w-20"
            onChange={(e) => {
              setNewLimit(+e.target.value);
            }}
          />

          <button
            className="ml-3 bg-red-400 rounded-lg hover:bg-red-300 px-1"
            type="button"
            onClick={() => {
              setEditReceipt(false);
            }}
          >
            Cancel
          </button>
          <button
            className="ml-3 bg-green-400 rounded-lg hover:bg-green-300 px-1"
            type="button"
            onClick={() => {
              onEdit(receipt, newReceipt, newLimit);
              setEditReceipt(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <span>
            {receipt}, limit: <p className="font-bold inline">${limit}</p>
          </span>
          <button
            className="ml-3 bg-blue-400 rounded-lg hover:bg-blue-300 px-1"
            type="button"
            onClick={() => {
              setEditReceipt({ editing: true, id: receipt });
            }}
          >
            Edit
          </button>
          <button
            className="ml-3 bg-red-500 rounded-lg hover:bg-red-400 px-1"
            type="button"
            onClick={() => {
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
const Rates = ({ val, name, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [newVal, setNewVal] = useState(val);
  return (
    <div className="flex gap-3  p-1">
      {' '}
      <p>{name} </p>
      {editing ? (
        <div>
          <input
            type="number"
            className="text-black  rounded-md w-20"
            defaultValue={val}
            onChange={(e) => {
              setNewVal(+e.target.value);
            }}
          />
          <button
            className="ml-3 bg-red-400 rounded-lg hover:bg-red-300 px-1"
            type="button"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 bg-green-400 rounded-lg hover:bg-green-300 px-1"
            onClick={() => {
              onSave(newVal);
              setEditing(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <div>
            <span className="font-bold">${val}</span>
            <button
              className="ml-3 bg-blue-400 rounded-lg hover:bg-blue-300 px-1"
              type="button"
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const Limits = ({ val, name, onSave }) => {
  const [editLimits, setEditLimits] = useState(false);
  const [newVal, setNewVal] = useState(val);
  return (
    <div className="flex gap-3 py-1">
      <p>{name}: </p>
      {editLimits ? (
        <div className="flex gap-3">
          <input
            type="number"
            className="text-black  rounded-md w-20"
            defaultValue={val}
            onChange={(e) => {
              setNewVal(+e.target.value);
            }}
          />
          <button
            type="button"
            className="ml-3 bg-red-400 rounded-lg hover:bg-red-300 px-1"
            onClick={() => {
              setEditLimits(false);
              // setEditLimits({ editing: false, id: '' });
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 bg-green-400 rounded-lg hover:bg-green-300 px-1"
            onClick={() => {
              onSave(newVal);
              setEditLimits(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <span className="font-bold">${val}</span>

          <button
            className="ml-3 bg-blue-400 rounded-lg hover:bg-blue-300 px-1"
            type="button"
            onClick={() => {
              setEditLimits(true);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
