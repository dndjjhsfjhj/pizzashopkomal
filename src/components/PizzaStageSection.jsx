import { useSelector } from "react-redux";
import Order from "./Order";
const PizzaStageSection = () => {
  const pizza = useSelector((state) => state.pizza);
  const placedOrders = pizza.orders.filter(
    (item) => item.stage == 1 && item.cancelled == false
  );
  const makingOrders = pizza.orders.filter(
    (item) => item.stage == 2 && item.cancelled == false
  );
  const readyOrders = pizza.orders.filter(
    (item) => item.stage == 3 && item.cancelled == false
  );
  const pickedOrders = pizza.orders.filter(
    (item) => item.stage == 4 && item.cancelled == false
  );

  return (
    <>
      <h1 className="m font-bold">Pizza Stages Section</h1>
      <div className="border my-4 flex w-full border-black">
        <div className="flex flex-col items-center w-1/4 border border-black">
          <p className="font-bold">Order Placed</p>
          <div>
            {placedOrders.map((item) => (
              <Order
                key={item.id}
                id={item.id}
                stage={item.stage}
                size={item.size}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/4 border border-black">
          <p className="font-bold">Order in making</p>
          <div>
            {makingOrders.map((item) => (
              <Order
                key={item.id}
                id={item.id}
                stage={item.stage}
                size={item.size}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/4 border border-black">
          <p className="font-bold">Order Ready</p>
          <div>
            {readyOrders.map((item) => (
              <Order
                key={item.id}
                id={item.id}
                stage={item.stage}
                size={item.size}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/4 border border-black">
          <p className="font-bold">Order Picked</p>
          <div>
            {pickedOrders.map((item) => (
              <Order key={item.id} id={item.id} order={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaStageSection;
