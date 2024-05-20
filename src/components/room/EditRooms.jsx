import React, {useEffect, useState} from 'react';
import {getRoomById, updateRoom} from "../utils/ApiFunctions.jsx";
import {Link, useParams} from "react-router-dom";

const EditRooms = () => {
    const [room, setRoom] = useState({
        photoUrl: null,
        roomType: "",
        roomPrice: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [sucessMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {roomId} = useParams();

    const handleimageChange = (e) => {
        console.log(e.target.files);
        const selectedImage = e.target.files[0];
        console.log('selectedImage:', selectedImage);
        setRoom({ ...room, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
        console.log('preview:', imagePreview);
    };

    const handleRoomChange = (room) => {
        const {name , value} = room.target;
        setRoom({...room, [name]: value});
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await getRoomById(roomId);
                console.log('Roomres:', response);
                console.log('Photo:', response.photoUrl);
                setRoom(response);
                setImagePreview(response.photoUrl);
                console.log('ImagePreview:', imagePreview);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoom();
    }, [roomId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(room);
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                setSuccessMessage("Room Updated Successfully");
                const updatedRoom = await getRoomById(roomId);
                setRoom(updatedRoom);
                setImagePreview(updatedRoom.photoUrl);
                setErrorMessage("");
            }
            else {
                setErrorMessage("Error in updating room");
                setSuccessMessage("");
            }
        }
        catch (error) {
            console.log(error);
            setErrorMessage("Error in updating room");
        }
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Update the room</h2>
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
                                <input
                                    className="form-control"
                                    type="text"
                                    id="roomType"
                                    name="roomType"
                                    value={room.roomType}
                                    onChange={handleRoomChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">
                                    Room Price
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={room.roomPrice}
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
                            <div className="d-grid gap-2 d-md-flex mt-3">
                                <Link to="/existing-rooms" className="btn btn-outline-primary mt-2">
                                    Back
                                </Link>
                                <button className="btn btn-primary mt-2" type="submit">
                                    Update Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditRooms;