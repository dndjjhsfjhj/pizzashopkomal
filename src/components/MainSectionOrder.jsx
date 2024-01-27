/* eslint-disable react/prop-types */
import { formatTime } from "../config";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../redux/pizzaSlice";
const MainSectionOrder = ({ id, stage, totalDelays, cancelled }) => {
  const [delay, setDelay] = useState(totalDelays);
  const [intervalId, setIntervalId] = useState(null);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      setDelay((prev) => prev + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  }, []);

  useEffect(() => {
    if (stage !== "placed" && stage !== "making" && stage !== "ready") {
      clearInterval(intervalId);
      setShow(false);
    }
  }, [stage, intervalId]);

  const handleCancel = (id) => {
    dispatch(updateOrder({ id: id, field: "cancelled", value: true }));
  };

  return (
    show &&
    cancelled === false && (
      <tr className="border border-black">
        <td className="border text-center border-black">{id}</td>
        <td className="border text-center border-black">{stage}</td>
        <td className="border text-center border-black">{formatTime(delay)}</td>
        {stage === "placed" || stage === "making" ? (
          <td
            onClick={() => handleCancel(id)}
            className="cursor-pointer border text-center border-black"
          >
            Cancel
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    )
  );
};

export default MainSectionOrder;
