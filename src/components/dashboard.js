import React from "react";
import axios from "axios";

import Form from "../common/form";

import Joi from "joi-browser";
import { clearAllToken } from "../services/localStorageServices";
import SubmitBtn from "../common/submitBtn";

class Dashboard extends Form {
  state = {
    searchResults: [],
    loading: false,
    data: {
      search: "",
    },
    errors: {},
  };

  schema = {
    search: Joi.string()
      .required()
      .error(() => {
        return { message: "*Required" };
      }),
  };

  componentDidMount = () => {
    if (!localStorage.getItem("jwt")) window.location.href = "/";
    window.scrollTo(0, 0);
  };

  logout = (e) => {
    e.preventDefault();
    clearAllToken();
    window.location.href = "/";
  };

  doSubmit = () => {
    const searchTerm = this.state.data.search;

    this.setState({
      loading: true,
    });
    axios
      .get("https://api.github.com/users/" + searchTerm + "/repos")
      .then((res) => {
        this.setState({ loading: false });
        this.setState({ searchResults: res.data });
      })
      .catch(() => {
        window.alert("Internal server error");
        this.setState({ loading: false });
      });

    // this.props.search(searchTerm, this.callback);
  };

  render() {
    this.state.searchResults.sort((a, b) =>
      a.watchers_count > b.watchers_count ? 1 : -1
    );

    return (
      <form className="search-results" onSubmit={this.handleSubmit}>
        <h3>Search</h3>

        {this.renderInput("search", "Start Typing to search", "text")}

        <SubmitBtn
          btnClass="btn btn-primary"
          disabled={this.state.loading}
          label={"Submit"}
        />

        <div>
          {this.state.searchResults &&
            this.state.searchResults.map((searchResult, index) => {
              return (
                <div key={index}>
                  <div className="details">
                    <img
                      alt="Nothing to display"
                      src={searchResult.owner && searchResult.owner.avatar_url}
                    />
                    <p>
                      Name : {searchResult.full_name && searchResult.full_name}
                    </p>
                    <p>
                      Description:{" "}
                      {searchResult.description && searchResult.description}{" "}
                    </p>
                    <p>
                      Watchers Count :{" "}
                      {searchResult.watchers_count &&
                        searchResult.watchers_count}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <a href="#!" className="wcl-link" onClick={this.logout}>
          Logout
        </a>
      </form>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   search: (searchTerm, callback) => dispatch(search(searchTerm, callback)),
// });

// export default withRouter(connect(null, mapDispatchToProps)(Dashboard));
export default Dashboard;
