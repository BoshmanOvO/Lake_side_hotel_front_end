import axios from 'axios';


export const api = axios.create({
    baseURL: 'http://localhost:9192',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});


// this function add a new room to the database;
export async function addNewRoom(photo, roomType, roomPrice) {
    try {
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('roomType', roomType);
        formData.append('roomPrice', roomPrice);
        const response = await api.post('/rooms/add/new-room', formData);
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new Error("Error in adding room");
    }
    
}


// this function get all the room type from the database;
export async function getRoomType() {
    try {
        const response = await api.get('/rooms/room/type');
        if (response.status === 200) { 
            return response.data;
        }
        else {
            return [];
        }
    }
    catch (error) {
        throw new Error("Error in getting room type");
    }
}


// this function get all the rooms from the database;
export async function getAllRooms() {
    try {
        const response = await api.get('/rooms/all-rooms');
        if (response.status === 200) { // 200
            return response.data;
        }
        else {
            return [];
        }
    }
    catch (error) {
        throw new Error("Error in getting all rooms");
    }
}

export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/delete/room/${roomId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    }
    catch (error) {
        throw new Error("Error in deleting room");
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append('roomType', roomData.roomType);
    formData.append('roomPrice', roomData.roomPrice);
    formData.append('photo', roomData.photo);
    try {
        const response = await api.put(`/rooms/update/room/${roomId}`, formData);
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new Error("Error in updating room");
    }
}

export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/room/${roomId}`);
        if (response.status === 200) {
            return response.data;
        }
        else {
            return {};
        }
    }
    catch (error) {
        throw new Error(`Error in getting room by id ${roomId}`);
    }
}