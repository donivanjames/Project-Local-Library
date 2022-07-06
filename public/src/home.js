////////////////////////////////
//      Helper Functions
////////////////////////////////
//Would normally put these in a separate file but we can't use .require in this project

//Returns the genre of a given book
const _findGenre = (book) => book.genre

//Returns the 5 most popular items of any array
const _popularitySorter = (unsortedArray) =>
    unsortedArray.sort((item1, item2) => item1.count > item2.count ? -1 : 1).slice(0, 5)

//Returns the amount of times an author's collection has been checked out
function _getTotalAuthorCheckouts(author, books){
    let authorBooks = books.filter(book => book.authorId === author.id)

    return authorBooks.reduce((acc, book) => {
        acc += book.borrows.length
        return acc
    }, 0)
  }
////////////////////////////////

const getTotalBooksCount = books => books.length

const getTotalAccountsCount = accounts => accounts.length

const getBooksBorrowedCount = books => books.filter(book => !book.borrows[0].returned).length

function getMostCommonGenres(books) {
  let genresArray = books.reduce((acc, book) => {
    let bookGenre = _findGenre(book)
    let genreFound = acc.find(genre => genre.name === bookGenre)

    genreFound ? genreFound.count++ : acc.push({name: bookGenre, count: 1})
    return acc;
  }, [])

  return(_popularitySorter(genresArray))
}

function getMostPopularBooks(books) {
  let booksArray = books.reduce((acc, book) => {
    acc.push({name: book.title, count: book.borrows.length})

    return acc
  }, [])

  return(_popularitySorter(booksArray))
}

function getMostPopularAuthors(books, authors) {
let authorArray = authors.reduce((acc, author) => {
  const authorName = `${author.name.first} ${author.name.last}`
  const allCheckoutsCount = _getTotalAuthorCheckouts(author, books)
  
  acc.push({name: authorName, count: allCheckoutsCount})
  return acc
}, [])

  return _popularitySorter(authorArray)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
