const toggleButtons = document.querySelectorAll('.toggle-button');
const collapseBlocks = document.querySelectorAll('.collapse');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-bs-target'));
        
        if (target.classList.contains('show')) {
            button.textContent = 'Подробнее о проекте';
            button.setAttribute('aria-expanded', 'false');
        } else {
            button.textContent = 'Закрыть подробности';
            button.setAttribute('aria-expanded', 'true');
        }
    });
});
