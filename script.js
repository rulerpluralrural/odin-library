let myLibrary = [new Book('One Piece', 'Oda Eichiro', '1000', 'on')];

const formSubmit = document.getElementById('getBook')
const submit = document.getElementById('submit')

function Book(title, author, chapters, read) {
    this.title = title
    this.author = author
    this.chapters = chapters
    this.read = read
}

formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title')
    const author = document.getElementById('author')
    const chapters = document.getElementById('chapters')
    const read = document.getElementById('read').checked
    const titleError = document.getElementById('errorOne')
    const authorError = document.getElementById('errorTwo')

    if (title.value === '') {
        titleError.textContent = '*Please provide input!'
        titleError.classList.add('show-error')
        titleError.classList.remove('remove-error')
    } else if (author.value === '') {
        authorError.textContent = '*Please provide input!'
        authorError.classList.add('show-error')
        authorError.classList.remove('remove-error')
    } else if (title.value !== '' & author.value !== '') {
        titleError.classList.remove('show-error')
        authorError.classList.remove('show-error')
        titleError.classList.add('remove-error')
        authorError.classList.add('remove-error')

        const newBook = new Book(title.value, author.value, chapters.value, read);
        myLibrary.push(newBook)

        appendBook(newBook)
        window.location.href = ('#main')
        console.log(myLibrary)
    }
})

function appendBook(newBook) {
    const main = document.getElementById('main')
    const newCard = document.createElement('div')
    const newTitle = document.createElement('p')
    const newAuthor = document.createElement('p')
    const newChapter = document.createElement('p')
    const newStatus = document.createElement('button')
    const newRemove = document.createElement('button')

    newCard.className = 'card-container'
    newStatus.setAttribute('id', 'status-btn')
    newRemove.setAttribute('id', 'remove-btn')

    newRemove.textContent = ('Remove')
    newTitle.textContent = newBook.title
    newAuthor.textContent = newBook.author
    newChapter.textContent = `Chapter ${newBook.chapters}`
    if (newBook.read) {
        newStatus.textContent = 'Read'
    } else {
        newStatus.textContent = 'Haven\'t Read'
    }

    main.append(newCard)
    newCard.append(newTitle)
    newCard.append(newAuthor)
    newCard.append(newChapter)
    newCard.append(newStatus)
    newCard.append(newRemove)

    newStatus.addEventListener('click', () => {
        if(newStatus.textContent === 'Read') {
            newStatus.textContent = 'Haven\'t Read'
        } else if(newStatus.textContent === 'Haven\'t Read') {
            newStatus.textContent = 'Read'
        }
    })  
    
    newRemove.addEventListener('click', () => {
        newCard.remove()
    })

}
