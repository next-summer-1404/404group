export async function getHouse() {
  const res = await fetch("https://delta-project.liara.run/api/houses", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch houses");
    return [];
  }

  return res.json();
}
