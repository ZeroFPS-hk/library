const addBookStartButton = document.querySelector("button#add-book-start");
const addBookEndButton = document.querySelector("button#add-book-complete");
const addBookDialogue = document.querySelector("dialog#add-book-form");
const inputTitle = document.querySelector("input#title");
const inputAuthor = document.querySelector("input#author");
const inputPages = document.querySelector("input#pages");
const inputRead = document.querySelector("select#read");
const libraryTable = document.querySelector("#library-table");

const exampleBook = new Book("Sherlock Holmes", "Conan", 128, true);
const myLibrary = [exampleBook];

window.onload = ()=> displayLibrary();
addBookStartButton.addEventListener("click", ()=> addBookDialogue.showModal());
addBookEndButton.addEventListener("click", addNewBook);

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(book){
    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary(){
    libraryTable.replaceChildren();
    let tableRow = document.createElement("tr");
    createLibraryHeaderRow(tableRow);
    libraryTable.appendChild(tableRow);
    for(const book of myLibrary){
        tableRow = document.createElement("tr");
        listBookInTable(tableRow, book);
        libraryTable.appendChild(tableRow);
    }
}

function addNewBook(event){
    event.preventDefault();
    const isRead = inputRead.value? true: false;
    const newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, isRead);
    addBookToLibrary(newBook);
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.value = "1";
    addBookDialogue.close();
}

function createLibraryHeaderRow(tableRow){
    createTableHeader(tableRow, "Title");
    createTableHeader(tableRow, "Author");
    createTableHeader(tableRow, "Pages");
    createTableHeader(tableRow, "Status");
    createTableHeader(tableRow, "Toggle read");
    createTableHeader(tableRow, "Remove book");
}

function listBookInTable(tableRow, book){
    for(const property in book){
        const tableData = document.createElement("td");
        if(property !== "isRead") tableData.textContent = book[property];
        else if(book.isRead){
            tableData.textContent = "Read";
            tableData.classList.add("read");
        }else{
            tableData.textContent = "Not read";
            tableData.classList.add("not-read");
        }
        tableRow.appendChild(tableData);
    }

    createTableDataButton(tableRow, "Toggle", "toggle-read", `${myLibrary.indexOf(book)}`, toggleRead);
    createTableDataButton(tableRow, "X", "remove-book", `${myLibrary.indexOf(book)}`, removeBook);
}

function createTableHeader(tableRow, content){
    const tableHeader = document.createElement("th");
    tableHeader.textContent = content;
    tableRow.appendChild(tableHeader);
}

function createTableDataButton(tableRow, content="", buttonClass="", buttonId="", clickFunction){
    const tableData = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = content;
    button.classList.add(buttonClass);
    button.id = buttonId;
    button.addEventListener("click", clickFunction);
    tableData.appendChild(button);
    tableRow.appendChild(tableData);
}

function toggleRead(event){
    myLibrary[event.target.id].isRead = !myLibrary[event.target.id].isRead;
    displayLibrary();
}

function removeBook(event){
    myLibrary.splice(event.target.id, 1);
    displayLibrary();
}