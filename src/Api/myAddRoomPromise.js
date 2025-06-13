export const myAddRoomPromise = (email, accessToken) => {
    return fetch(`${import.meta.env.VITE_baseurl}/rooms/myAdded-rooms?email=${email}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res => res.json());
};
