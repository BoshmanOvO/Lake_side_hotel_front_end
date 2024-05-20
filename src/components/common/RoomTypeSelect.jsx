import React, { useEffect, useState } from "react";
import { getRoomType } from "../utils/ApiFunctions";
const RoomTypeSelect = ({ handleRoomChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomType, setshowNewRoomType] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    const fetchRoomType = async () => {
      const roomType = await getRoomType();
      if (roomType.length > 0) {
        setRoomTypes(roomType);
      }
    };
    fetchRoomType().then(r => r);
  }, []);

  const handleNewRoomType = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    console.log(newRoomType);
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setshowNewRoomType(false);
    }
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <div className="form-group">
          <select
            className="form-control"
            id="roomType"
            name="roomType"
            onChange={(e) => {
              if (e.target.value === "Add New Room Type") {
                setshowNewRoomType(true);
              } else {
                handleRoomChange(e);
              }
            }}
          >
            <option value={""}>Select Room Type</option>
            <option value={"Add New Room Type"}>Add New Room Type</option>

            {roomTypes.map((type, index) => {
              try {
                const parsedType = JSON.parse(type);
                return (
                  <option key={index} value={parsedType.RoomType}>
                    {parsedType.RoomType}
                  </option>
                );
              }
              catch (error) {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              }
            })}
          </select>

          {showNewRoomType && (
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new room type"
                onChange={handleNewRoomType}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleAddNewRoomType}
              >
                Add New Room Type
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default RoomTypeSelect;
