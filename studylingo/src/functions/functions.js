import { goto } from "$app/navigation";

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
    goto("/login");
    alert(data.error);
  }
  else {
    return data;
  }
}

export async function updateBadge(badgeIndex, target) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    goto("/login");
    return;
  }

  const res = await fetch("http://localhost:3000/update-badges", {
    method: "PATCH",
    headers: {authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    body: JSON.stringify({badgeIndex, target})
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    goto("/login");
  }
}