# Meetup Page Draft

Создайте экземпляр Vue приложения для вывода информации о митапе.

Требуется:
- Получить данные митапа по [API /meetups/:ID](https://course-vue.javascript.ru/api/#/Meetups/MeetupsController_findById);
- Вывести изображение митапа по [API /images/:ID](https://course-vue.javascript.ru/api/#/Images/ImagesController_getImage);
- Вывести описание митапа;
- Вывести основную информацию о митапе;
- Дату митапа вывести локализовано, вывести также `datetime`;
- Вывести программу митапа;
- Пункты программы могут быть разного типа (`agenda[].type`);
- Для типа "talk" (доклад) требуется дополнительно вывести докладчика и язык;
- У каждого типа элемента программы есть своя иконка (см. `agendaItemIcons`);
- Если у пункта программы отсутствует заголовок (`agenda[].title`), требуется вывести заголовок по умолчанию для данного типа элемента программы (см. `agendaItemTitles`);
- Если какой-то блок пустой (например, нет описания) -- его не нужно выводить.

**Обработка ошибок при загрузке митапов не требуется.**

Fetch API: [https://learn.javascript.ru/fetch](https://learn.javascript.ru/fetch)

<img src="https://i.imgur.com/gZFOxnY.png">

---

### Инструкция

📝 Для решения задачи отредактируйте файлы: `index.html`, `script.js`.

🚀 Команда запуска для ручного тестирования: `npm run file-serve`;<br>
приложение будет доступно на [http://localhost:5000/01-basics/02-MeetupPageDraft/](http://localhost:5000/01-basics/02-MeetupPageDraft/).

💬 Задача проверяется вручную на Code Review.
