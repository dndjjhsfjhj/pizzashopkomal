/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOrder, updateDelays } from "../redux/pizzaSlice";
import { formatTime } from "../config";

const Order = ({ id, stage, size }) => {
  const [delay, setDelay] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const style = {
    backgroundColor: "red",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const newIntervalId = setInterval(() => {
      setDelay((prev) => prev + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  }, []);

  const handleNext = () => {
    const delayTitle =
      stage == 1
        ? "placed"
        : stage === 2
        ? "making"
        : stage == 3
        ? "ready"
        : "";

    dispatch(updateDelays({ id: id, field: delayTitle, value: delay }));
    if (delayTitle === "ready")
      dispatch(updateOrder({ id: id, field: "picked", value: true }));

    dispatch(updateOrder({ id: id, field: "stage", value: stage + 1 }));

    clearInterval(intervalId);
    setDelay(0);
  };
  return (
    <div
      style={
        stage < 4
          ? delay > 180 && stage != 2
            ? style
            : delay > 180 && stage == 2 && size == "small"
            ? style
            : delay > 240 && stage == 2 && size == "medium"
            ? style
            : delay > 300 && stage == 2 && size == "large"
            ? style
            : {}
          : {}
      }
      className="flex flex-col gap-2 border items-center m-2 p-2 border-black"
    >
      <p>Order {id}</p>
      {stage < 4 ? <p>{formatTime(delay)}</p> : <p></p>}
      {stage < 4 ? (
        <button className="bg-gray-200" onClick={() => handleNext()}>
          Next
        </button>
      ) : (
        <p>Picked</p>
      )}
    </div>
  );
};

export default Order;
