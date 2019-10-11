import books from '../data/books.json'
import authors from '../data/authors.json'
import characters from '../data/characters.json'

function findOne(arr, id) {
  return find(arr, id)[0]
}

function find(arr, id) {
  id = Array.isArray(id) ? id : [id]
  return arr.filter(o => id.includes(o.id))
}

export default {
  Query: {
    book: (parent, args, context, info) => findOne(books, args.id),
  },
  Mutation: {
    createBook: (parent, args, context, info) => {
      const book = { id: Date.now(), ...args.input }
      books.push(book)
      return book
    },
    updateBook: (parent, args, context, info) => {
      const book = find(books, args.id)
      const updated = { ...book, ...args.input }
      books.splice(books.indexOf(book), 1, updated)
      return updated
    },
    deleteBook: (parent, args, context, info) => {
      const book = find(books, args.id)
      books.splice(book, 1)
      return true
    },
  },
  Book: {
    author: book => findOne(authors, book.author),
    characters: book => find(characters, book.characters),
  },
  Author: {
    books: author => find(books, author.books),
  },
  Character: {
    books: character => find(books, character.books),
  },
}
