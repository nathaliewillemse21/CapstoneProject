import { connection as db } from '../config/index.js';
class Products {
  fetchProducts(req, res) {
    const qry = `
        SELECT BookID, Title, Category, Tags, Summary, Cover, UserID, Price
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
  fetchProduct(req, res) {
    const qry = `
        SELECT BookID, Title, Category, Tags, Summary, Cover, UserID, Price
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
  addProduct(req, res) {
    const qry = `
    INSERT INTO Library
    SET ?`;

    db.query(qry, [req.body], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: 'Internal Server Error',
        });
      }
      res.status(201).json({
        status: res.statusCode,
        msg: 'New book added',
      });
    });
  }

  deleteProduct(req, res) {
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
        return res.status(500).json({ msg: 'Failed to delete book' });
      }
      res.json({
        status: res.statusCode,
        msg: 'Book deleted',
      });
    });
  }
  updateProduct(req, res) {
    const qry = `
        UPDATE Library
        SET Title = ?, Category = ?, Tags = ?, Summary = ?, Cover = ?, Price = ?
        WHERE id = ?;
    `;
    const { Title, Category, Tags, Summary, Cover, Price, id } = req.body;
    db.query(qry, [Title, Category, Tags, Summary, Cover, Price, id], (err) => {
      if (err) {
        console.error('Error updating:', err);
        return res.status(500).json({ msg: 'Failed to update Book' });
      }
      res.json({
        status: res.statusCode,
        msg: 'Book updated',
      });
    });
  }
}
export { Products };
