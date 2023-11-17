const libraryTable = document.querySelector("#library-table");

const myLibrary = [];

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

function addNewBook(){

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