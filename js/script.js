function h(e) {
    e.preventDefault();
    window.removeEventListener("touchstart", h, null);
    window.removeEventListener("click", h, null);

    const audioSources = [
        "sounds/RUN UP.mp3",
        "sounds/EVIL TWINS.mp3"
    ];

    const audio = new Audio();
    const visualizer = document.querySelector(".visualizer");
    const progress = document.querySelector(".progress");
    const currentlyPlaying = document.querySelector(".currently-playing");

    const playButtons = document.querySelectorAll(".fa-light.fa-plus");
    const afterDiv = document.querySelector(".after");

    document.querySelector(".before").remove();
    afterDiv.style.display = "block";

    let isDragging = false;
    let isPlaying = true;

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
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                updatePlayButtonState(false);
            } else {
                audio.play();
                isPlaying = true;
                updatePlayButtonState(true);
            }
        });
    });

    function updatePlayButtonState(playing) {
        playButtons.forEach(btn => {
            if (playing) {
                btn.classList.remove("fa-plus");
                btn.classList.add("fa-minus");
            } else {
                btn.classList.remove("fa-minus");
                btn.classList.add("fa-plus");
            }
        });
    }

    playButtons.forEach(button => {
        button.classList.add("fa-plus");
    });

    function changeAudioSource(index) {
        playButtons.forEach(btn => {
            btn.classList.remove("fa-minus");
            btn.classList.add("fa-plus");
        });

        audio.src = audioSources[index];
        const audioFileName = audioSources[index].split("/").pop();
        currentlyPlaying.textContent = `Playing: ${audioFileName}`;
        audio.play().catch(error => {
            console.error('Failed to start audio playback:', error);
        });

        playButtons.forEach(btn => {
            btn.classList.remove("fa-plus");
            btn.classList.add("fa-minus");
        });
    }

    let currentAudioIndex = 0;
    changeAudioSource(currentAudioIndex);

    function playNextAudio() {
        currentAudioIndex = (currentAudioIndex + 1) % audioSources.length;
        changeAudioSource(currentAudioIndex);
    }

    audio.addEventListener('ended', playNextAudio);

    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            event.preventDefault();
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                updatePlayButtonState(false);
            } else {
                audio.play();
                isPlaying = true;
                updatePlayButtonState(true);
            }
        }
    });

    currentlyPlaying.addEventListener("click", function() {
        playNextAudio();
    });
}

window.addEventListener("touchstart", h);
window.addEventListener("click", h);

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
