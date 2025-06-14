export const addRoomPromise = async (roomData, accessToken) => {
    const res = await fetch(`${import.meta.env.VITE_baseurl}/rooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(roomData)
    });
    return res.json();
};
