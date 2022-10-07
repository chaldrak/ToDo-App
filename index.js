window.onload = function () {
    let input = document.getElementById("todo");
    let btn = document.getElementById("btn");
    let input_count = document.getElementById("input-count");
    let todos = document.getElementById("todos");
    input.value = "";

    let todos_local = localStorage.getItem("todos");
    if (todos_local) {
        todos_tab = JSON.parse(todos_local);
    }
    else {
        todos_tab = [];
    }

    input.addEventListener("input", function (e) {
        input_count.innerHTML = input.value.length;

        isInput(input)
    });

    btn.addEventListener("click", function (e) {
        todos_tab.push(input.value);
        localStorage.setItem("todos", JSON.stringify(todos_tab));
        input.value = ""
        input_count.innerHTML = 0;
        isInput(input)
    })
    
    // let todos = document.getElementById("todos");
    // let todo_card = document.getElementById("todo-card");

    // console.log(todo_card)
    // let para = document.createElement("p")
    // let node = document.createTextNode("This is a paragraph")
    // para.appendChild(node)
    // todos.appendChild(para);

    // console.log(todos);

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

    todos_tab.forEach(todo => {
        let div = document.createElement("div");
        let p = document.createElement("p");
        const node = document.createTextNode(todo);

        p.appendChild(node);
        div.appendChild(p);
        todos.appendChild(div);
    });
}