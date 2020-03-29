import React from "react";
import { useState } from "react";

function Navbar(props) {

  const [searchText, setSearchText] = useState('');
  const passSearch = (e) => {
    e.preventDefault();
    props.handleSearch(searchText, sortOrder);
  }

  const [sortOrder, setSortOrder] = useState('latest');
  const passSortOrder = (asd) => {
    props.handleSortOrder(asd);
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand">
        Scrape Space
      </div>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item dropdown">
            <button
              className="link-button nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Order by {sortOrder}
            </button>



            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <button className="button-link dropdown-item" 
              onClick={() => 
              {setSortOrder("latest");
              passSortOrder("latest");
              props.updateSort("latest");
            }}>
                Latest First
              </button>
              <button className="button-link dropdown-item"  
              onClick={() => 
                {setSortOrder("oldest");
                passSortOrder("oldest");
                props.updateSort("oldest");
              }}>
                Oldest First
              </button>
              <div className="dropdown-divider" />
              <button className="button-link dropdown-item" 
              onClick={() => 
                {setSortOrder("comments");
                passSortOrder("comments");
                props.updateSort("comments");
              }}>
                Most Comments
              </button>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Filter"
            aria-label="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => {
              passSearch(e); 
              if (searchText === '') {
                props.updateSearch('noSearch');
              } else {
              props.updateSearch(searchText);
              }
            }}>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
