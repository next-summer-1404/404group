export async function getHousedeteil() {
  const res = await fetch("https://delta-project.liara.run/api/houses/41", {
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Failed to fetch houses");
    return [];
  }

  return data;
}
