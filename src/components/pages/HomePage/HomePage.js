import React, { Component } from "react";
import classes from "./HomePage.module.css";
import { connect } from "react-redux";

import { loadAllBooks, moduleName } from "../../../ducks/books.js";
import BooksList from "../../BooksList/BooksList";
import LastReading from "../../LastReading/LastReading";

class Home extends Component {
  componentDidMount() {
    // this.props.loadAllBooks();
  }

  render() {
    return (
      <div className={classes.Home} style={{ background: `url(${this.props.bg})` }}>
        <div className="container background">
          {/* <code>
            <pre>{JSON.stringify(this.props, null, 4)}</pre>
          </code> */}
          <LastReading />
          <BooksList />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  // state => ({
  //   books: state[moduleName].entities,
  // }),
  { loadAllBooks }
)(Home);
