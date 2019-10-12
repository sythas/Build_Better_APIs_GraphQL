import { PubSub } from 'apollo-server'

import books from '../data/books.json'
import authors from '../data/authors.json'
import characters from '../data/characters.json'

const pubsub = new PubSub()
const BOOK_CHANGED = 'BOOK_CHANGED'

function toArray(arr) {
  return
}

function findOne(arr, id) {
  return find(arr, o => o.id === id)[0]
}

function find(arr, predicate) {
  arr = Array.isArray(arr) ? arr : [arr]
  return arr.filter(predicate)
}

export default {
  Query: {
    character: (parent, args, context, info) => findOne(characters, args.id),
    book: (parent, args, context, info) => findOne(books, args.id),
    books: (parent, args, context, info) => books,
    series: (parent, args, context, info) => {
      const regex = new RegExp(args.name, 'i')
      return find(books, book => regex.test(book.series))
    },
    author: (parent, args, context, info) => findOne(authors, args.id),
  },
  Mutation: {
    createBook: (parent, args, context, info) => {
      const book = { id: Date.now(), ...args.input }
      books.push(book)
      return book
    },
    updateBook: (parent, args, context, info) => {
      const book = findOne(books, args.id)
      const updated = { ...book, ...args.input }
      books.splice(books.indexOf(book), 1, updated)
      pubsub.publish(BOOK_CHANGED, { onBookChange: book })
      return updated
    },
    deleteBook: (parent, args, context, info) => {
      const book = findOne(books, args.id)
      books.splice(book, 1)
      return true
    },
    createAuthor: (parent, args, context, info) => {
      const author = { id: Date.now(), ...args.input }
      authors.push(author)
      return author
    },
    updateAuthor: (parent, args, context, info) => {
      const author = findOne(authors, args.id)
      const updated = { ...author, ...args.input }
      authors.splice(authors.indexOf(author), 1, updated)
      return updated
    },
    deleteAuthor: (parent, args, context, info) => {
      const author = findOne(authors, args.id)
      authors.splice(author, 1)
      return true
    },
    createCharacter: (parent, args, context, info) => {
      const character = { id: Date.now(), ...args.input }
      characters.push(character)
      return character
    },
    updateCharacter: (parent, args, context, info) => {
      const character = findOne(characters, args.id)
      const updated = { ...character, ...args.input }
      characters.splice(characters.indexOf(character), 1, updated)
      return updated
    },
    deleteCharacter: (parent, args, context, info) => {
      const character = findOne(characters, args.id)
      characters.splice(character, 1)
      return true
    },
    assignAuthorToBook: (parent, args, context, info) => {
      const book = findOne(books, args.bookId)
      const author = findOne(authors, args.authorId)
      book.author = author.id
      pubsub.publish(BOOK_CHANGED, { onBookChange: book })
      return { book, author }
    },
    assignCharacterToBook: (parent, args, context, info) => {
      const book = findOne(books, args.bookId)
      const character = findOne(characters, args.characterId)
      if (!book.characters.includes(character.id)) {
        book.characters.push(character.id)
        pubsub.publish(BOOK_CHANGED, { onBookChange: book })
      }
      return { book, character }
    },
  },
  Subscription: {
    onBookChange: {
      subscribe: () => pubsub.asyncIterator([BOOK_CHANGED]),
    },
  },
  Book: {
    author: book => findOne(authors, book.author),
    characters: book =>
      find(characters, character => book.characters.includes(character.id)),
  },
  Author: {
    books: author => find(books, book => author.books.includes(book.id)),
  },
  Character: {
    books: character => find(books, book => character.books.includes(book.id)),
  },
}
