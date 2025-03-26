const tasks = [
    { name: "Eat Pussy", timer: 18000, battery: 100, element: document.getElementById("eat-battery-img"), timeElement: document.getElementById("eat-time"), isActive: true },
    { name: "Swallow!", timer: 3600, battery: 100, element: document.getElementById("drink-battery-img"), timeElement: document.getElementById("drink-time"), isActive: true },
    { name: "Molly is starving", timer: 36000, battery: 100, element: document.getElementById("feed-cat-battery-img"), timeElement: document.getElementById("feed-cat-time"), isActive: true }
];

// Function to get the corresponding battery image based on the charge level
function getBatteryImage(percentage) {
    if (percentage > 83) return "battery-6.png";
    if (percentage > 66) return "battery-5.png";
    if (percentage > 50) return "battery-4.png";
    if (percentage > 33) return "battery-3.png";
    if (percentage > 16) return "battery-2.png";
    return "battery-1.png";
}

// Function to format time as hours, minutes, seconds
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours}h ${minutes}m ${sec}s`;
}

// Update task timers and battery images
function updateTaskTimers() {
    tasks.forEach(task => {
        if (task.isActive) {
            task.timer--; // Decrease time by 1 second each update
            if (task.timer <= 0) {
                task.timer = 0; // Stop the timer at 0
                task.battery = 0; // Stop the battery at 0 (battery-1 image)
                task.isActive = false; // Stop the task after timer runs out
            }

            // Calculate battery percentage and set the battery image
            const batteryPercentage = (task.timer / (task.name === "Eat Pussy" ? 21600 : (task.name === "Swallow!" ? 3600 : 36000))) * 100;
            task.battery = Math.max(batteryPercentage, 0); // Ensure battery doesn't go below 0

            task.element.src = getBatteryImage(task.battery); // Update the battery image
            
            // Format and display the time left in hours, minutes, and seconds
            const formattedTime = formatTime(task.timer);
            task.timeElement.textContent = `${task.name} - Time left: ${formattedTime}`;
        }
    });
}

// Function to reset the task when a checkbox is clicked
function resetTask(taskName) {
    const task = tasks.find(t => t.name === taskName);
    
    if (!task) {
        console.error(`Task with name "${taskName}" not found.`);
        return;
    }

    if (taskName === "Eat Pussy") {
        task.timer = 18000; // 6 hours in seconds
    } else if (taskName === "Swallow!") {
        task.timer = 3600; // 1 hour in seconds
    } else if (taskName === "Molly is starving") {
        task.timer = 36000; // 10 hours in seconds
    }

    task.battery = 100; // Reset battery to full
    task.isActive = true; // Reactivate the task
    task.element.src = getBatteryImage(100); // Set battery to full image
    task.timeElement.textContent = `${taskName} - Time left: ${formatTime(task.timer)}`;
}

// Start the timer
setInterval(updateTaskTimers, 1000);  // Update every second

// Select the person container
const personContainer = document.getElementById('person-container');

// Initial position
let positionX = window.innerWidth - 200; // Start near the right side of the screen
let positionY = window.innerHeight / 2 - 50; // Center vertically

// Set the initial position of the person container
personContainer.style.left = `${positionX}px`;
personContainer.style.top = `${positionY}px`;

document.addEventListener('keydown', function (event) {
    const moveAmount = 10; // How much the person moves per key press

    if (event.key === "w" || event.key === "W") {
        positionY -= moveAmount; // Move up
    } else if (event.key === "s" || event.key === "S") {
        positionY += moveAmount; // Move down
    } else if (event.key === "a" || event.key === "A") {
        positionX -= moveAmount; // Move left
    } else if (event.key === "d" || event.key === "D") {
        positionX += moveAmount; // Move right
    }

    // Set the new position, constrain within screen bounds
    personContainer.style.left = `${Math.min(window.innerWidth - 200, Math.max(0, positionX))}px`;
    personContainer.style.top = `${Math.min(window.innerHeight - 200, Math.max(0, positionY))}px`;
});
