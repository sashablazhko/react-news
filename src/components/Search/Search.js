import React, { Component } from "react";
import classes from "./Search.module.css";
import { Form } from "react-final-form";
import debounce from "lodash/debounce";

import SearchField from "./SearchField/SearchField";

class Search extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.debouncedOnChange = debounce(this.onChange, 300);
  }

  onSubmit = values => {
    return false;
  };

  onChange(newValue, previousValue) {
    this.props.handleSearchTermChange(newValue);
  }

  render() {
    const { initData } = this.props;
    return (
      <div className={classes.Search}>
        <Form onSubmit={this.onSubmit} initialValues={initData}>
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <SearchField name="searchTerm" component="input" placeholder="Поиск" onChange={this.debouncedOnChange} />
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default Search;
