const _findAuthorOfBook = (book, authors) => authors.find(author => author.id === book.authorId)

const findAccountById = (accounts, id) => accounts.find( account => account.id === id);

const sortAccountsByLastName = accounts => accounts.sort(({name : {last: name1}}, {name : {last: name2}}) =>
  name1.toLowerCase() < name2.toLowerCase() ? -1 : 1)

function getTotalNumberOfBorrows({id : userID}, books) {
  return books.reduce((acc, book) => {
      if(book.borrows.some(borrow => borrow.id === userID))
        acc++

        return acc
  }, 0)
}
   
function getBooksPossessedByAccount({id : userID}, books, authors) {
  let userBooks = books.filter(book => !book.borrows[0].returned && book.borrows[0].id === userID)

  userBooks.map(book => book["author"] = _findAuthorOfBook(book, authors))

  return userBooks
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
