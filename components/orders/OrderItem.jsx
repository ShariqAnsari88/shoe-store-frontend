import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function OrderItem(props) {
  const { totalPrice, status, orderId } = props;
  const selectedStatus = {
    active: <div className="shadow-xl rounded-full h-4 w-4 p-0"><FontAwesomeIcon color="orange" icon={faCircle} /></div>,
    finished: <div className="shadow-xl rounded-full h-4 w-4 p-0"><FontAwesomeIcon color="#3EC70B" icon={faCircle} /></div>,
    cancelled:  <div className="shadow-xl rounded-full h-4 w-4 p-0"><FontAwesomeIcon color="#B22222" icon={faCircle} /></div>
  };
  return (
    <div className="bg-[#EEEEEE] max-h-24 relative vertical justify-between flex flex-col gap-2 p-2 w-full h-full content-center text-black rounded-md">

      <div className="flex flex-row justify-between">
        <div className="font-semibold uppercase">№: {orderId}</div>
        <div className="">{selectedStatus[status] ?? null}</div>
      </div>
      <div>
      Цена: {totalPrice ?? '[Липсва] '}лв
      </div>
    </div>
  );
}

export default OrderItem;
