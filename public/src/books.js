const findAuthorById = (authors, id) => authors.find(author => author.id === id);

const findBookById = (books, id) => books.find(book => book.id === id);

function partitionBooksByBorrowedStatus(books) {
  let checkedOutBooks = [], returnedBooks = []

  books.map(book =>
    book.borrows[0].returned ? returnedBooks.push(book) : checkedOutBooks.push(book))

  return [checkedOutBooks, returnedBooks]
}

function getBorrowersForBook(book, accounts) {
  return accounts.reduce((acc, account) => {
    let matchingBorrower = book.borrows.find(borrow => borrow.id === account.id)
    
    if(matchingBorrower)
      acc.push({...account, ...matchingBorrower})

    return acc
  }, []).slice(0 , 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
