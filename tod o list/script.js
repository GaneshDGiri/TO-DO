let editId = null;

  function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (text === "") return;

    if (editId) {
      // Save edit option
      document.getElementById(editId).querySelector("span").textContent = text;
      editId = null;
    } else {
      // Create new todo option
      const li = document.createElement("li");
      const id = Date.now().toString();
      li.id = id;

      li.innerHTML = `
        <span>${text}</span>
        <div class="icons">
          <button class="icon-btn edit" onclick="editTodo('${id}')">✏️</button>
          <button class="icon-btn delete" onclick="deleteTodo('${id}')">🗑️</button>
        </div>
      `;

      document.getElementById("todoList").appendChild(li);
    }

    input.value = "";
  }
// edit button
  function editTodo(id) {
    const li = document.getElementById(id);
    const text = li.querySelector("span").textContent;
    document.getElementById("todoInput").value = text;
    editId = id;
  }
// delete button
  function deleteTodo(id) {/// id remove to delete the task
    document.getElementById(id).remove();
    if (editId === id) editId = null;
  }