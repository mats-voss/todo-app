const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const placeholdersDE = [
    "Hund Füttern",
    "Duschen gehen",
    "Hausaufgaben",
    "Essen Kochen",
    "Sport machen",
    "Laufen gehen",
    "Zimmer aufräumen",
    "Fenster Putzen",
    "Blumen gießen",
];
const placeholdersEN = [
    "walk the dog",
    "eat breakfast",
    "do homework",
    "go to the gym",
    "clean the room",
    "watering plants",
];

const todos = JSON.parse(localStorage.getItem("todos"));

var userLang = navigator.language || navigator.userLanguage;

changeHintText();

setInterval(changeHintText, 2500);

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

/**
 * Erstellt ein todo
 * @param {Object} todo
 */
function addTodo(todo) {
    const todosEl = document.querySelectorAll("li");
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    // beim wiederholten eingeben einer task wird diese als erledigt makiert
    if (todosEl) {
        todosEl.forEach((data) => {
            if (data.innerHTML == todoText) {
                data.classList.toggle("completed");
                input.value = "";
                todoText = false;
                updateLS();
            }
        });
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        /**
         * Ändert den Status einer task auf erledigt
         */
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
        });

        /**
         * Löscht eine task aus der Todo liste
         */
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = "";
        updateLS();
    }
}

/**
 * Updatet den local storage mit den aktuellen todos und dem jeweiligen status
 */
function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Ändert den Hint text basierent auf dem "placeholders" array
 */
function changeHintText() {
    if (userLang == "de-DE")
        input.placeholder = placeholdersDE[Math.floor(Math.random() * 9)];
    else input.placeholder = placeholdersEN[Math.floor(Math.random() * 6)];
}
