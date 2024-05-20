// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';

// eslint-disable-next-line react/prop-types
const RoomFilter = ({data, setFilteredData}) => {
    const [filter , setFilter] = useState("");
    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        console.log(selectedRoomType);
        setFilter(selectedRoomType);
        // eslint-disable-next-line react/prop-types
        const filteredRooms = data.filter(room => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredRooms);
    }
    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    }
    // eslint-disable-next-line react/prop-types
    const roomTypes = [...new Set(data.map(room => room.roomType))]

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id = "room-type-filter">
                Filter Rooms by its type:
            </span>
            <select className="form-select" onChange={handleSelectChange} value={filter}>
                <option value=""> Select a room type to filter </option>
                {roomTypes.map((roomType, index) => (
                    <option key={index} value={roomType}>
                        {roomType}
                    </option>
                ))}
            </select>
            <button className={"btn btn-primary"} onClick={clearFilter} type={"button"}>
                Clear Filter
            </button>
        </div>
    );
};

export default RoomFilter;