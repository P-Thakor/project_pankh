export async function fetchEvents() {
    const res = await fetch('http://localhost:8000/api/v1/event/getAllEvents', {cache:'no-store'});
    const data = await res.json();
    console.log(data);
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

export async function fetchClub(id) {
    const res = await fetch(`http://localhost:8000/api/v1/club/${id}`);
    const data = await res.json();
    console.log(data);
    return data.data;
}