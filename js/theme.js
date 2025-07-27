function setTheme(theme) {
    localStorage.setItem('theme', theme);
    if (theme === 'original') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'original') {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
});