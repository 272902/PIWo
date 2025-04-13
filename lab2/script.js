"use strict";
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let elementToRemove = null;

function AddTask() {
    if(inputBox.value === '') {
        return;
    }

    const li = document.createElement("li");

    const taskText = document.createElement("div");
    taskText.classList.add("task-text");
    taskText.textContent = inputBox.value;
    li.appendChild(taskText);

    const span = document.createElement("span");
    span.innerHTML = "⨉";
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            const dateElement = document.createElement("div");
            dateElement.classList.add("completion-date");
            const now = new Date();
            const formattedDate = now.toLocaleString('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            dateElement.textContent = 'Zadanie wykonane: '+ formattedDate;
            const taskText = e.target.querySelector(".task-text");
            if (taskText) {
                taskText.insertAdjacentElement("afterend", dateElement);
            } else {
                e.target.appendChild(dateElement);
            }
        } else {
            const dateElement = e.target.querySelector(".completion-date");
        if (dateElement) {
            dateElement.remove();
        }
        }
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        elementToRemove = e.target.parentElement;
        const tekst = elementToRemove.firstChild.textContent;
        document.getElementById("modalText").textContent = 
            'Czy na pewno chcesz usunąć zadanie o treści: ' + tekst.trim() + ' ?';
        document.getElementById("confirmModal").style.display = "flex";
    }
});

document.getElementById("confirmBtn").onclick = function() {
    if (elementToRemove) {
        elementToRemove.remove();
        saveData();
    }
    document.getElementById("confirmModal").style.display = "none";
    elementToRemove = null;
};

document.getElementById("cancelBtn").onclick = function() {
    document.getElementById("confirmModal").style.display = "none";
    elementToRemove = null;
};

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const saved = localStorage.getItem("data");
    if (saved) {
        listContainer.innerHTML = saved;
    }
}
showTask();