// Array to store book objects in:

const myLibrary = [];

// Constructor Function for each book:

function Book(title, author, datePublished, haveRead) {
  this.title = title;
  this.author = author;
  this.datePublished = datePublished;
  this.haveRead = haveRead;
}

// Selectors:

const submitButton = document.querySelector("#book-form");

// Event Listener and new Book creation:

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const datePublished = parseInt(
    document.querySelector("#date-published").value
  );
  const haveRead = document.querySelector("#status").value;

  const newBook = new Book(title, author, datePublished, haveRead);
  myLibrary.push(newBook);

  submitButton.reset();

  displayBooks();
});

// Function to display books

function displayBooks() {
  const table = document.querySelector(".display-table");

  // Remove the rows from the DOM, to prevent duplicates

  const tableRows = table.querySelectorAll("tr:not(:first-child)");

  tableRows.forEach((row) => {
    row.remove();
  });

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");

    // Create a button to toggle status:

    //const statusButtonText = book.haveRead === "Read" ? "Not Read" : "Read";

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.datePublished}</td>
      <td><button class="status-button">${book.haveRead}</button></td>
      <td>
          
          <button class="delete-button">Delete</button>
      </td>
    `;
    table.appendChild(row);

    // Event listener for handling delete and status functionality:

    row.querySelector(".delete-button").addEventListener("click", () => {
      deleteBook(book);
    });

    row.querySelector(".status-button").addEventListener("click", () => {
      toggleStatus(book);
    });
  });
}

// Defining deleteBook function

function deleteBook(bookToDelete) {
  //find the index of the book to delete

  const index = myLibrary.indexOf(bookToDelete);
  if (index > -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

//Defining the toggleStatus function:

function toggleStatus(book) {
  book.haveRead = book.haveRead === "Read" ? "Not read" : "Read";
  displayBooks();
}
