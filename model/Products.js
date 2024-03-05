import { connection as db } from '../config/index.js';
class Library {
  fetchBooks(req, res) {
    const qry = `
        SELECT BookID, Title, Category, Tags, Summary, Cover, UserID
        FROM Library;
        `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
    }
  fetchBook(req, res) {
    const qry = `
        SELECT BookID, Title, Category, Tags, Summary, Cover, UserID
        FROM Library
        WHERE BookID = ${req.params.id};
        `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result: result[0],
      });
    });
  }
  addBook(req, res) {
    const qry = `
        INSERT INTO Library
        SET ?;`;
    db.query(qry, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: 'New book added',
      });
    });
    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: 'New Book added',
      });
    });
  }
  deleteBook(req, res) {
    const BookID = req.params.id;
    if (!BookID) {
      return res.status(400).json({ msg: 'Book ID is required' });
    }
    const qry = `
            DELETE
            FROM Library
            WHERE BookID = ?;
        `;
    db.query(qry, [BookID], (err) => {
      if (err) {
        console.error('Error deleting book:', err);
          return res.status(500).json({ msg: 'Failed to delete book ' });
      }
      res.json({
        status: res.statusCode,
        msg: 'Book removed',
      });
    });
  }
  updateBook(req, res) {
    const qry = `
        UPDATE Library
        SET ?
        WHERE id = ?;
    `;
    db.query(qry, [req.body], (err) => {
      if (err) {
        console.error('Error updating:', err);
        return res.status(500).json({ msg: 'Failed to update book' });
      }
      res.json({
        status: res.statusCode,
        msg: 'Book was updated',
      });
    });
  }
}
export { Library }