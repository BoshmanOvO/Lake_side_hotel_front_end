// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { addNewRoom } from "../utils/ApiFunctions";
import RoomTypeSelect from "../common/RoomTypeSelect";
import {Link} from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomChange = (room) => {
    // console.log(room.target.name);
    // console.log(room.target.value);
    const name = room.target.name;
    let value = room.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleimageChange = (e) => {
    console.log(e.target.files);
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newRoom);
      const sucess = await addNewRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (sucess !== undefined) {
        setSuccessMessage("Room Added Successfully to the Database");
        setErrorMessage("");
        setNewRoom({
          photo: null,
          roomType: "",
          roomPrice: "",
        });
        setImagePreview("");
      } else {
        setErrorMessage("Error in adding room");
      }
    }
    catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a new room</h2>

            {sucessMessage && (
                <div className="alert alert-success" role="alert">
                  {sucessMessage}
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
             
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <div>
                  <RoomTypeSelect
                    handleRoomChange={handleRoomChange}
                    newRoom={newRoom}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Room Price in Rs."
                  type="number"
                  required 
                  id="roomPrice"
                  name="roomPrice"
                  value={newRoom.roomPrice}
                  onChange={handleRoomChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="roomPhoto" className="form-label">
                  Room Photo
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="roomPhoto"
                  name="roomPhoto"
                  onChange={handleimageChange}
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Image"
                    style={{ height: "400px", width: "400px" }}
                    className="img-fluid img-thubnail rounded mt-3"
                  />
                )}
              </div>

              <div className="d-grid d-md-flex mt-3">
                <Link to={"/existing-rooms"} className="btn btn-outline-primary mt-2">
                    Back
                </Link>
                <button
                  className="btn btn-outline-primary mt-2 ms-2"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
