import React, { useContext, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../App";
import useInput from "../../custom-hooks/useInput";
import { retriveBooks } from "../../slices/book";

export default function AdminDashboard() {
  // @ts-ignore
  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAdmin, showUser } = useContext(RoleContext);
  // @ts-ignore
  const books = useSelector((state) => state.books);
  const searchBookId = useInput('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (showAdmin) {
      navigate("/admin-dashboard");
    }

    if (showUser) {
      navigate("/user-dashboard");
    }
  }, [showAdmin, showUser]);

  useEffect(() => {
    if (books.length === 0) {
      // @ts-ignore
      dispatch(retriveBooks());
    }

    console.log("books", books);
  }, [dispatch]);

  const handleSearch = () => {
    console.log('search', searchBookId.value);
    console.log('books', books);
   const filteredBooks =  books.filter(book => book.user_id === searchBookId.value)
     setSearchedBooks(filteredBooks);
  }

  const reset = () => {
    console.log('rrr', searchBookId.value);
  }

  return (
    <>
      <div>
        <div className="mt-3">
          <div className="d-flex ms-3">
            <input type={"search"} placeholder="Search By Member Id"  {...searchBookId}/>
            <Button variant="primary" size="sm" className="ms-3" onClick={() => handleSearch()}>
              Search
            </Button>
          </div> 
        </div>
        <h3 className="mt-3">List of Books</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Book Name</th>
              <th>Member Name</th>
              <th>Member ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {books &&
              (searchedBooks.length ? searchedBooks : books).map((book, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{book.book_name}</td>
                    <td>{book.name}</td>
                    <td>{book.user_id}</td>
                    <td>
                      <Button variant="secondary" size="sm" disabled>
                        {book.status}
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
