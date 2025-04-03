export function useMyLocation(setCity) {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser 😢");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      fetch(`${import.meta.env.VITE_API_BASE}/geo/reverse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: latitude, lon: longitude })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.city) {
            setCity(data.city); // update app state
          } else {
            alert("Could not determine your city 😞");
          }
        })
        .catch((err) => {
          console.error("Error contacting backend 🤯", err);
          alert("Error contacting backend 💥");
        });
    },
    (error) => {
      alert("Failed to get your location ❌");
      console.error(error);
    }
  );
}

