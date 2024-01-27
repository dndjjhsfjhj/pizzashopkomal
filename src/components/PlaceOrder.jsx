import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/pizzaSlice";
const PlaceOrder = () => {
  const pizza = useSelector((state) => state.pizza);

  const [order, setOrder] = useState({
    id: pizza.orders.length + 1,
    type: "",
    size: "",
    base: "",
    delays: {
      placed: 0,
      making: 0,
      ready: 0,
    },
    stage: 1,
    cancelled: false,
    picked: false,
  });
  const [error, setError] = useState(false);
  const activeOrders = pizza.orders.filter(
    (item) => item.cancelled === false && item.picked === false
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (pizza.orders.length > 0) {
      setOrder((prev) => ({
        ...prev,
        id: pizza.orders.length + 1,
      }));
    }
  }, [pizza]);

  useEffect(() => {
    if (activeOrders.length === 10) setError(true);
    else setError(false);
  }, [activeOrders]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOrder((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeOrders.length < 10)
      dispatch(placeOrder({ id: pizza.orders.length + 1, ...order }));
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center  ">
      <form onSubmit={handleSubmit} className="gap-1 border p-4 w-1/2 rounded">
        <div className="flex flex-col gap-2 m-2 ">
          <label htmlFor="type" className="font-bold">
            Type
          </label>
          <select
            name="type"
            id="type"
            className="p-2 border"
            value={order.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="veg">Veg</option>
            <option value="nonVeg">Non-Veg</option>
          </select>
        </div>
        <div className="flex flex-col gap-2  m-2">
          <label htmlFor="size" className="font-bold">
            Size
          </label>
          <select
            name="size"
            id="size"
            className="p-2 border"
            value={order.size}
            onChange={handleChange}
            required
          >
            <option value="">Select size</option>
            <option value="large">Large</option>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
          </select>
        </div>
        <div className="flex flex-col gap-2  m-2">
          <label htmlFor="base" className="font-bold">
            Base
          </label>
          <select
            name="base"
            id="base"
            className="p-2 border"
            value={order.base}
            onChange={handleChange}
            required
          >
            <option value="">Select base</option>
            <option value="thick">Thick</option>
            <option value="thin">Thin</option>
          </select>
        </div>
        {error === false ? (
          <input
            type="submit"
            value="Place Order"
            className="my-4 mx-2 font-bold bg-yellow-500 p-2 rounded cursor-pointer"
          />
        ) : (
          <input
            type="submit"
            disabled
            value="Place Order"
            className="my-4 mx-2 font-bold bg-yellow-450 cursor-not-allowed p-2 rounded"
          />
        )}
      </form>
      {error === true && (
        <p className="text-red-600 font-bold">
          Cannot take more than 10 orders at a time.
        </p>
      )}
    </div>
  );
};

export default PlaceOrder;
