import React, { useEffect, useState } from "react";
import partsService from "../services/parts.service";
import { useDispatch, useSelector } from "react-redux";

const Shelvebox = ({ Shelve }) => {
  const [shelfParts, setShelfParts] = useState([]);
  const dispatch = useDispatch();
  const reloadTriggerShelve = useSelector(
    (state) => state.stock.reloadTriggerShelve
  );
  console.log(Shelve);

  useEffect(() => {
    const fetchShelfParts = async () => {
      try {
        const parts = await partsService.getShelfParts(Shelve.shelfName);
        if (parts) {
          setShelfParts(parts.data.data);
          console.log(shelfParts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchShelfParts();
  }, [dispatch, reloadTriggerShelve]);

  return (
    <div className="bg-[#121212] rounded-md p-2 flex flex-col font-nexar1 w-32 mr-3">
      <p className="text-purple-700 text-lg">Shelve : {Shelve?.shelfName}</p>
      <p className="mt-1 text-gray-300 text-[11px] font-nexar1 flex justify-between items-start ">
        Types :
        <span className=" font-nexar3 text-lg pr-8">{shelfParts?.length}</span>
      </p>
      {/* <span className="mt-1 font-nexar3">{shelfParts?.length}</span> */}
    </div>
  );
};

export default Shelvebox;
