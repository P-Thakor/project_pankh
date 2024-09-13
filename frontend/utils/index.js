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