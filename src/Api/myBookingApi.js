export const myBookingPromise = (email, accessToken) => {
    return fetch(`${import.meta.env.VITE_baseurl}/my-bookings?userEmail=${email}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res => res.json());
};
