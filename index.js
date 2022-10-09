window.onload = function () {
    let input = document.getElementById("todo");
    let btn = document.getElementById("btn");
    let input_count = document.getElementById("input-count");
    let todos = document.getElementById("todos");
    let default_box = document.getElementById("default-message");
    input.value = "";
    console.log(default_box)
    // Get the todos in local storage
    let todos_local = localStorage.getItem("todos");
    
    if (todos_local) {
        todos_tab = JSON.parse(todos_local);
        todos_tab.forEach(todo => {
            display(todo);
        });
    }
    else {
        todos_tab = [];
    }

    // Show default message if nothing to do
    showDefaultMessage()

    function showDefaultMessage() {
        if (todos_tab.length === 0) {
            default_box.style.display = "block";
        }
        else {
            default_box.style.display = "none";
        }
    }

    // Get the size of input
    input.addEventListener("input", function (e) {
        input_count.innerHTML = input.value.length;

        isInput(input)
    });

    // Add a new todo
    btn.addEventListener("click", function (e) {
        todos_tab.push({id: Math.round(Math.random() * 10E9), name: input.value, isDone: false});
        localStorage.setItem("todos", JSON.stringify(todos_tab));
        input.value = ""
        input_count.innerHTML = 0;
        isInput(input);
        display(todos_tab.at(todos_tab.length-1));

        showDefaultMessage()

        var close = document.getElementsByClassName("delete");
        for (let i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                
                removeFromLocal(close[i])
                
            }
        }
    });

    // Function used to control the button 
    const isInput = (input) => {
        if (input.value.length >= 3) {
            btn.classList.replace("btn-disabled", "btn-primary")
            btn.classList.remove("text-gray-500")
        } 
        else {
            btn.classList.replace("btn-primary", "btn-disabled")
            btn.classList.add("text-gray-500")
        }
    };

    // Function to display the todos
    function display (todo) {
        let div1 = document.createElement("div");
        let div2 = document.createElement("div")
        let p = document.createElement("p");
        let input = document.createElement("input");
        let btn = document.createElement("button");
        let span = document.createElement("span");
        const id_text = document.createTextNode(todo.id);
        const node = document.createTextNode(todo.name);

        span.appendChild(id_text);
        span.className = "hidden";

        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "checkbox border border-gray-50 checkbox");
        if (todo.isDone) {
            input.setAttribute("checked", true);
        }

        p.appendChild(node);
        if (todo.isDone) {
            p.setAttribute("class", "line-through");
        }
        
        div2.appendChild(input);
        div2.appendChild(p);
        div2.classList.add("w-full", "items-center", "flex", "space-x-5");
        
        btn.innerHTML = "<i class='fa fa-trash'></i>";
        btn.setAttribute("class", "btn text-gray-50 btn-error btn-xs delete");
        // btn.setAttribute("id", "delete");

        div1.appendChild(div2);
        div1.appendChild(btn);
        if (todo.isDone) {
            div1.setAttribute("class", "w-full bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 px-5 py-2 inline-flex items-center justify-between rounded-md shadow-sm mb-2");
        }
        else {
            div1.setAttribute("class", "w-full bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 px-5 py-2 inline-flex items-center justify-between rounded-md shadow-sm mb-2");
        }
        
        div1.appendChild(span);
        todos.appendChild(div1);
    };

    // Delete todo
    var close = document.getElementsByClassName("delete");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            
            removeFromLocal(close[i])
            
        }
    }

    // Change style of card when todo is done
    var list = document.querySelector("#todos");
    list.addEventListener('click', function (e) {
        if(e.target.tagName === "INPUT") {
            var div1 = e.target.parentElement;
            var div = div1.parentElement;
            var isChecked = e.target.getAttribute("checked");
            var p = div1.lastElementChild;
            var isDone
            if (isChecked == null) {
                e.target.setAttribute("checked", true);
                isDone = true;
                p.classList.add("line-through");
                div.classList.replace("from-indigo-400", "from-gray-600");
                div.classList.replace("via-purple-400", "via-gray-300");
                div.classList.replace("to-indigo-400", "to-gray-600");
            }
            else {
                e.target.removeAttribute("checked");
                isDone = false;
                p.classList.remove("line-through");
                div.classList.replace("from-gray-600", "from-indigo-400");
                div.classList.replace("via-gray-300", "via-purple-400");
                div.classList.replace("to-gray-600", "to-indigo-400");
            }
            updateTodo(div, isDone);
        }
    });

    // Remove todo from local
    function removeFromLocal(element) {
        var div = element.parentElement;
        const id = parseInt(div.lastElementChild.innerText);
        
        todo = todos_tab.filter(todo => todo.id === id).at(0);
        if (confirm("Do you really want to delete this item ?")) {
            todos_tab.splice(todos_tab.indexOf(todo), 1);

            localStorage.removeItem("todos");
            localStorage.setItem("todos", JSON.stringify(todos_tab));
            div.style.display = "none"
        }
        showDefaultMessage()
    }

    function updateTodo(element, isDone) {
        const id = parseInt(element.lastElementChild.innerText);
        
        todo = todos_tab.filter(todo => todo.id === id).at(0);
        todo_index = todos_tab.indexOf(todo)
        todo.isDone = isDone
        todos_tab.splice(todo_index, 1, todo);

        localStorage.removeItem("todos");
        localStorage.setItem("todos", JSON.stringify(todos_tab));
    }
}