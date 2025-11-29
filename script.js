// Dark/Light Mode Toggle
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Smooth Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
