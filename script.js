document.addEventListener("DOMContentLoaded", () => {
    const batteryLevelElem = document.getElementById("battery-level");
    const chargeLevelElem = document.getElementById("charge-level");
    const chargingTimeElem = document.getElementById("charging-time");
    const chargingIconElem = document.getElementById("charging-icon");

    if (!navigator.getBattery) {
        alert("Battery status API is not supported in your Browser");
        return false;
    }

    navigator.getBattery().then((battery) => {
        function updateBatteryInfo() {
            // Update charge level
            const batteryLevel = Math.floor(battery.level * 100);
            batteryLevelElem.style.width = `${batteryLevel}%`;
            chargeLevelElem.textContent = `${batteryLevel}%`;

            // Update charging time
            if (battery.charging) {
                batteryLevelElem.classList.add("battery-charging");
                chargingIconElem.style.display = "block";
                chargingTimeElem.textContent = "";
            } else {
                batteryLevelElem.classList.remove("battery-charging");
                chargingIconElem.style.display = "none";
                if (battery.dischargingTime && battery.dischargingTime > 0) {
                    let hr = Math.floor(battery.dischargingTime / 3600);
                    let min = Math.floor((battery.dischargingTime % 3600) / 60);
                    chargingTimeElem.textContent = `${hr}hr ${min}mins remaining`;
                } else {
                    chargingTimeElem.textContent = "Calculating time remaining...";
                }
            }
        }

        updateBatteryInfo();

        battery.addEventListener("chargingchange", updateBatteryInfo);
        battery.addEventListener("levelchange", updateBatteryInfo);
    }).catch(error => {
        console.log("Error accessing battery API:", error);
    });
});
