// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {deleteRoom, getAllRooms} from "../utils/ApiFunctions.jsx";
import {Col, Row, Spinner, Table} from "react-bootstrap";
import RoomFilter from "../common/RoomFilter.jsx";
import RoomPagination from "../common/RoomPagination.jsx";
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [sucessMessage, setSucessMessage] = useState('');
    const [errorMessage, setErromMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);

    useEffect(() => {
        fetchRooms().then(r => r);
    } , []);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const responce = await getAllRooms();
            setIsLoading(false);
            console.log(responce);
            setRooms(responce);
        } catch (error) {
            setErromMessage(error.message);
            console.log(error);
        }
    }

    const handleDelete = async (roomId) => {
        try {
            const responce = await deleteRoom(roomId);
            if (responce !== 204) {
                setSucessMessage(`Room No. ${roomId} deleted successfully`);
                setRooms(rooms.filter(room => room.id !== roomId));
                fetchRooms();
            }
            else {
                console.error(`Error in deleting room No. ${roomId}`);
                setErromMessage(`Error in deleting room No. ${roomId}`);
            }
        }
        catch (error) {
            setErromMessage(error.message);
        }
        setTimeout(() => {
            setSucessMessage('');
            setErromMessage('');
        } , 2000);
        await fetchRooms();
    }

    useEffect(() => {
        if (selectedRoomType === '') {
            setFilteredRooms(rooms);
        }
        else {
            const filtered = rooms.filter(room => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [selectedRoomType, rooms]);

    const calculateTotalPages = (filteredRoom, itemsPerPage, rooms) => {
        const totalRooms = filteredRoom.length ? filteredRoom.length : rooms.length;
        return Math.ceil(totalRooms / itemsPerPage);
    }

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);


    return (
        <>
            {isLoading ?
                <Spinner
                    animation="border"
                    role="status"
                    className="position-sticky top-50 start-50 mt-5"
                />
                :(
                    <>
                        <section className="mt-5 mb-5 container">
                            <div className="d-flex justify-content-between mb-3 mt-5">
                                <h2>Existing Rooms</h2>
                            </div>
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
                            <Row>
                                <Col md={6} className="mb-3 mb-md-0">
                                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                                </Col>

                                <Col className={"d-flex justify-content-end"}>
                                    <Link to={'/add-room'}>
                                        <FaPlus className={`ms-3`} size={15}/> Add Room
                                    </Link>
                                </Col>
                            </Row>

                            <Table striped bordered hover variant={"dark"}>
                                <thead>
                                    <tr className="text-center">
                                        <th>Room No.</th>
                                        <th>Room Type</th>
                                        <th>Room Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentRooms.map((room) => (
                                        // console.log(room),
                                        <tr key={room.id} className="text-center">
                                            <td>{room.id}</td>
                                            <td>{room.roomType}</td>
                                            <td>{room.roomPrice}</td>
                                            <td className={`gap-5`}>
                                                <Link to={`/edit-rooms/${room.id}`}>
                                                    <span className="btn btn-info me-2">
                                                        <FaEye/>
                                                    </span>
                                                    <span className="btn btn-warning me-2">
                                                        <FaEdit/>
                                                    </span>
                                                </Link>
                                                <button className="btn btn-danger"
                                                        onClick={() => handleDelete(room.id)}>
                                                    <FaTrashAlt/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <RoomPagination
                                currentPage={currentPage}
                                TotalPage={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                                OnPageChange={handlePaginationClick}
                            />
                        </section>
                    </>
                )
            }
        </>
    );
};

export default ExistingRooms;