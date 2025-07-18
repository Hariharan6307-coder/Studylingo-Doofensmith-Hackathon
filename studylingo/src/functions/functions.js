export async function fetchData() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    goto("/login");
    return;
  }

  const res = await fetch("http://localhost:3000/fetch-data", {
    headers: {authorization: `Bearer ${token}`}
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    goto("/login");
  }
  else {
    return data;
  }
}