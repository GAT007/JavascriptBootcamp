//book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI constructor
function UI() {
}


//Add book to list
UI.prototype.addBookToList = function (book) {
    let list = document.getElementById("book-list");
    //Create tr element
    const row = document.createElement("tr");
    //Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`
    list.appendChild(row);
    console.log(row);
}

UI.prototype.clearFields = function () {
    doument.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

UI.prototype.showAlert = function (message, className) {
    //Create div
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector(".container");
    //Get form
    const form = document.querySelector("#book-form");
    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3 seconds
    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 3000);
}


UI.prototype.deleteBook = function (target) {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
}

//Event Listeners
//Event Listener for delete
document.getElementById("book-form").addEventListener("submit", function (e) {
    //Get form values
    let title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;
    //console.log(title, author, isbn);
    const book = new Book(title, author, isbn);
    //console.log(book);
    const ui = new UI();

    //Validation
    if (title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill in all fields", "error");
    } else {
        ui.addBookToList(book);
        //clear fields
        ui.clearFields();
    }


    e.preventDefault();
});

//Event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("Book Removed", "success");
    e.preventDefault();
})