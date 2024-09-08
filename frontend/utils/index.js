export async function fetchEvents() {
    const res = await fetch('/api/v1/events');
    const data = await res.json();
    return data;
}
