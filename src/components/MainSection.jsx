import { useSelector } from "react-redux";
import MainSectionOrder from "./MainSectionOrder";
const MainSection = () => {
  const { orders } = useSelector((state) => state.pizza);

  return (
    <div>
      <h1 className=" font-bold">Main section</h1>
      <table className="w-full table-auto my-4">
        <thead>
          <tr className="border border-black">
            <th className="border border-black">Order Id</th>
            <th className="border border-black">Stage</th>
            <th className="border border-black">Total time spent</th>
            <th className="border border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
          
            let stage = "";
            if (item.stage === 1) stage = "placed";
            else if (item.stage === 2) stage = "making";
            else if (item.stage == 3) stage = "ready";
            else stage = "";

            const { making, placed, ready } = item.delays;
            const totalDelays = making + placed + ready;
            return (
              <MainSectionOrder
                key={item.id}
                id={item.id}
                stage={stage}
                totalDelays={totalDelays}
                cancelled={item.cancelled}
              />
            );
          })}
          <tr>
            <td className="border text-center font-bold border-black">
              Total order delivered
            </td>
            <td className="border text-center font-bold border-black">
              {orders.filter((item) => item.picked === true).length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainSection;
