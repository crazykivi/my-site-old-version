// Получаем все кнопки с классом 'toggle-button' и все блоки с классом 'collapse'
const toggleButtons = document.querySelectorAll('.toggle-button');
const collapseBlocks = document.querySelectorAll('.collapse');

// Применяем общий обработчик для всех кнопок
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-bs-target'));
        
        // Меняем текст и aria-expanded в зависимости от состояния блока
        if (target.classList.contains('show')) {
            button.textContent = 'Подробнее о проекте';
            button.setAttribute('aria-expanded', 'false');
        } else {
            button.textContent = 'Закрыть подробности';
            button.setAttribute('aria-expanded', 'true');
        }
    });
});
