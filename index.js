window.onload = function () {
    let input = document.getElementById("todo");
    let btn = document.getElementById("btn");
    let input_count = document.getElementById("input-count");
    let todos = document.getElementById("todos");
    input.value = "";

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

    input.addEventListener("input", function (e) {
        input_count.innerHTML = input.value.length;

        isInput(input)
    });

    btn.addEventListener("click", function (e) {
        todos_tab.push(input.value);
        localStorage.setItem("todos", JSON.stringify(todos_tab));
        input.value = ""
        input_count.innerHTML = 0;
        isInput(input);
        display(todos_tab.at(todos_tab.length-1));
    });

    
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

    function display (todo) {
        let div1 = document.createElement("div");
        let div2 = document.createElement("div")
        let p = document.createElement("p");
        let input = document.createElement("input");
        let btn = document.createElement("button");
        const node = document.createTextNode(todo);

        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "checkbox border border-gray-50");
        
        p.appendChild(node);
        
        div2.appendChild(input);
        div2.appendChild(p);
        div2.classList.add("w-full", "items-center", "flex", "space-x-5");
        
        btn.innerHTML = "<i class='fa fa-trash'></i>";
        btn.setAttribute("class", "btn text-gray-50 btn-error btn-xs");
        btn.setAttribute("id", "delete" + Math.round(Math.random() * 10E9));

        div1.appendChild(div2);
        div1.appendChild(btn);
        div1.classList.add("w-full", "bg-gradient-to-r", "from-indigo-400", "via-purple-400", "to-indigo-400", "px-5", "py-2", "inline-flex", "items-center", "justify-between", "rounded-md", "shadow-sm", "mb-2");
        
        todos.appendChild(div1);
    };
}