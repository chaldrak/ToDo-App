window.onload = function () {
    let input = document.getElementById("todo");
    input.value = "";

    input.addEventListener("input", function (e) {
        let input_count = document.getElementById("input-count");
        input_count.innerHTML = input.value.length;
        console.log(input.value.length);
    })
}