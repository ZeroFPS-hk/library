const addBookStartButton = document.querySelector("button#add-book-start");
const addBookEndButton = document.querySelector("button#add-book-complete");
const addBookDialogue = document.querySelector("dialog#add-book-form");
const inputTitle = document.querySelector("input#title");
const inputAuthor = document.querySelector("input#author");
const inputPages = document.querySelector("input#pages");
const inputRead = document.querySelector("select#read");
const libraryTable = document.querySelector("#library-table");

const myLibrary = [];

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
    createTableHeader(tableRow, "Mark read");
}

function listBookInTable(tableRow, book){
    for(const property in book){
        const tableData = document.createElement("td");
        property !== "isRead"? tableData.textContent = book[property]:
        book.isRead? tableData.textContent = "Read": tableData.textContent = "Not read";  
        tableRow.appendChild(tableData);
    }
}

function createTableHeader(tableRow, content){
    const tableHeader = document.createElement("th");
    tableHeader.textContent = content;
    tableRow.appendChild(tableHeader);
}