document.addEventListener("DOMContentLoaded", function() {
    document.body.style.opacity = '1';

    const beforeDiv = document.querySelector('.before');
    const mainDiv = document.querySelector('.main');
    const topSection = document.querySelector('.top');

    setTimeout(function() {
        beforeDiv.style.opacity = '1';
        beforeDiv.classList.add('clicked');
        mainDiv.style.opacity = '1';
    }, 500);

    beforeDiv.addEventListener('click', function() {
        beforeDiv.style.opacity = '0';
        mainDiv.style.opacity = '1';

        mainDiv.classList.add('visible');
    });

    mainDiv.addEventListener('transitionend', function() {
        mainDiv.style.opacity = '1';
    });
});
