function h(e) {
    e.preventDefault();
    window.removeEventListener("touchstart", h, { passive: false });
    window.removeEventListener("click", h, { passive: false });

    const audio = new Audio("sounds/audio2.mp3");
    const visualizer = document.querySelector(".visualizer");
    const progress = document.querySelector(".progress");
    const playButtons = document.querySelectorAll(".fa-light.fa-plus");
    const afterDiv = document.querySelector(".after");

    document.querySelector(".before").remove();
    afterDiv.style.display = "block";

    let isDragging = false;
    let isPlaying = false;
    let audioInitialized = false;

    function calculateRelativePosition(event) {
        const rect = visualizer.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const width = rect.width;
        return Math.min(1, Math.max(0, offsetX / width));
    }

    function handleSeek(event) {
        const seekPosition = calculateRelativePosition(event);
        audio.currentTime = audio.duration * seekPosition;
        updateProgress(seekPosition);
    }

    visualizer.addEventListener("mousedown", function(event) {
        isDragging = true;
        handleSeek(event);
    });

    visualizer.addEventListener("mousemove", function(event) {
        if (isDragging) {
            handleSeek(event);
        }
    });

    window.addEventListener("mouseup", function() {
        isDragging = false;
    });

    function updateProgress(seekPosition) {
        const progressWidth = seekPosition * 100;
        progress.style.width = progressWidth + "%";
    }

    audio.addEventListener("timeupdate", function() {
        const progressWidth = (audio.currentTime / audio.duration) * 100;
        if (!isDragging) {
            progress.style.width = progressWidth + "%";
        }
    });

    playButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (!audioInitialized) {
                audioInitialized = true;
                audio.play().catch(function(error) {
                    console.error('Failed to start audio playback:', error);
                });
            }

            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                updatePlayButtonState();
            } else {
                audio.play().catch(function(error) {
                    console.error('Failed to start audio playback:', error);
                });
                isPlaying = true;
                updatePlayButtonState();
            }
        });
    });

    function updatePlayButtonState() {
        playButtons.forEach(btn => {
            if (isPlaying) {
                btn.classList.remove("fa-minus");
                btn.classList.add("fa-plus");
            } else {
                btn.classList.remove("fa-plus");
                btn.classList.add("fa-minus");
            }
        });
    }

    playButtons.forEach(button => {
        button.classList.add("fa-minus");
    });

    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            event.preventDefault();
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                updatePlayButtonState();
            } else {
                audio.play().catch(function(error) {
                    console.error('Failed to start audio playback:', error);
                });
                isPlaying = true;
                updatePlayButtonState();
            }
        }
    });
}

window.addEventListener("touchstart", h, { passive: false });
window.addEventListener("click", h, { passive: false });

document.addEventListener("DOMContentLoaded", function() {
    const discordLink = document.querySelector('.discord-link');

    discordLink.addEventListener('click', function(event) {
        event.preventDefault();

        const textToCopy = 'agh';

        navigator.clipboard.writeText(textToCopy)
            .then(function() {
                const notification = document.createElement('div');
                notification.classList.add('notification');
                notification.textContent = 'Copied!';
                document.body.appendChild(notification);

                setTimeout(function() {
                    notification.remove();
                }, 2000);
            })
            .catch(function(err) {
                console.error('Failed to copy: ', err);
            });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const beforeDiv = document.querySelector('.before');
    const mainDiv = document.querySelector('.main');
    const topSection = document.querySelector('.top');

    setTimeout(function() {
        beforeDiv.style.opacity = '1';
        mainDiv.style.opacity = '1';
    }, 500);
    beforeDiv.addEventListener('click', function() {
        beforeDiv.classList.add('clicked');

        setTimeout(function() {
            beforeDiv.style.opacity = '0';
            mainDiv.style.opacity = '1';
        }, 50);
    });

    mainDiv.addEventListener('transitionend', function() {
        mainDiv.style.opacity = '1';
    });
});
