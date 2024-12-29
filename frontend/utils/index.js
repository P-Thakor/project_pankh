export async function fetchEvents() {
    const res = await fetch('http://localhost:8000/api/v1/event/getAllEvents', {cache:'no-store'});
    const data = await res.json();
    return data.data;
}

export async function fetchEventById(id) {
    const res = await fetch(`http://localhost:8000/api/v1/event/getEvent/${id}`);
    const data = await res.json();
    return data.data;
}

export function formattedDate(date) {
    return new Date(date).toLocaleDateString('en-in', {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}

export function formattedTime(time) {
    return new Date(time).toLocaleTimeString('en-us', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export async function fetchClubById(id) {
    const res = await fetch(`http://localhost:8000/api/v1/club/club/${id}`);
    const data = await res.json();
    return data.data.club;
}

export async function fetchClubs() {
    const res = await fetch('http://localhost:8000/api/v1/club/clubs');
    const data = await res.json();
    return data.data.clubs;
}

export async function fetchCurrentUser() {
    const res = await fetch('http://localhost:8000/api/v1/user/me', {
        credentials: 'include',
    });
    const data = await res.json();
    return data.data;
}

export async function forgotPassword(email) {
    const res = await fetch('http://localhost:8000/api/v1/auth/forgotPassword', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    return await res.json();
}

export async function resetPassword(Otp) {
    const res = await fetch(`http://localhost:8000/api/v1/auth/resetPassword/${Otp}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await res.json();
}