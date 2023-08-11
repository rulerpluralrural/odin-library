let myLibrary = [];
const saveToLocalStorage = () => {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

const formSubmit = document.getElementById("getBook");
const submit = document.getElementById("submit");

class Book {
  constructor(title, author, chapters, read) {
    this.title = title;
    this.author = author;
    this.chapters = chapters;
    this.read = read;
  }
}

if (!localStorage.getItem("myLibrary")) {
  myLibrary.push(new Book("Naruto", "Masashi Kishimoto", "700", "Read"));
  myLibrary.push(new Book("One Piece", "Oda Eichiro", "1000"));
} else {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const chapters = document.getElementById("chapters");
  // @ts-ignore
  const read = document.getElementById("read").checked;
  const titleError = document.getElementById("errorOne");
  const authorError = document.getElementById("errorTwo");
  // @ts-ignore
  if (title.value === "") {
    titleError.textContent = "*Please provide input!";
    titleError.classList.add("show-error");
    titleError.classList.remove("remove-error");
    // @ts-ignore
  } else if (author.value === "") {
    authorError.textContent = "*Please provide input!";
    authorError.classList.add("show-error");
    authorError.classList.remove("remove-error");
    // @ts-ignore
  } else if ((title.value !== "") & (author.value !== "")) {
    titleError.classList.remove("show-error");
    authorError.classList.remove("show-error");
    titleError.classList.add("remove-error");
    authorError.classList.add("remove-error");
    // @ts-ignore
    const newBook = new Book(
      // @ts-ignore
      title.value,
      // @ts-ignore
      author.value,
      // @ts-ignore
      chapters.value,
      read
    );
    myLibrary.push(newBook);

    appendBook(newBook);
    window.location.href = "#main";
    console.table(myLibrary.indexOf(newBook));
    saveToLocalStorage();
  }
});

function appendBook(book) {
  const main = document.getElementById("main");
  const newCard = document.createElement("div");
  const newTitle = document.createElement("p");
  const newAuthor = document.createElement("p");
  const newChapter = document.createElement("p");
  const newStatus = document.createElement("button");
  const newRemove = document.createElement("button");

  newCard.className = "card-container";
  // @ts-ignore
  newCard.setAttribute("id", myLibrary.indexOf(book));
  newStatus.setAttribute("id", "status-btn");
  newRemove.setAttribute("id", "remove-btn");

  newRemove.textContent = "Remove";
  newTitle.textContent = book.title;
  newAuthor.textContent = book.author;
  newChapter.textContent = `Chapter ${book.chapters}`;

  if (book.read) {
    newStatus.textContent = "Read";
  } else {
    newStatus.textContent = "Haven't Read";
  }

  main.append(newCard);
  newCard.append(newTitle);
  newCard.append(newAuthor);
  newCard.append(newChapter);
  newCard.append(newStatus);
  newCard.append(newRemove);

  newStatus.addEventListener("click", () => {
    if (newStatus.textContent === "Read") {
      newStatus.textContent = "Haven't Read";
    } else if (newStatus.textContent === "Haven't Read") {
      newStatus.textContent = "Read";
    }
    saveToLocalStorage();
  });

  newRemove.addEventListener("click", () => {
    console.log(myLibrary);
    myLibrary.splice(myLibrary.indexOf(book), 1);
    newCard.remove();
    saveToLocalStorage();
  });
}

myLibrary.forEach((book) => {
    appendBook(book)
})