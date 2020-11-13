import React, { Component, Fragment } from "react";
import axios from "axios";
import _ from "lodash";
import RepoListElement from "./Repositories";

const API_URL = "https://api.github.com/users";

class SearchGithubUser extends Component {
  state = {
    username: "",
    apiMsg: "",
    repos: [],
    userInfo: {},
  };

  handleChange = (event) => {
    this.setState({ username: event.target.value });
    setTimeout(this.handleSearch, 1000);
  };

  handleSearch = () => {
    axios
      .get(`${API_URL}/${this.state.username}/repos`)
      .then((result) =>
        this.setState({
          repos: result.data,
          userInfo: result.data[0].owner,
        })
      )
      .catch((err) => {
        this.setState({
          repos: [],
          apiMsg: err.message,
        });
      });
  };

  render() {
    const {
      username,
      repos,
      apiMsg,
      userInfo: { avatar_url, login, html_url },
    } = this.state;
    return (
      <Fragment>
        <div className="search-bar">
          <input
            placeholder="Please enter a Github User"
            value={username}
            onChange={this.handleChange}
            type="text"
          />
          <p className="redText">{apiMsg}</p>
        </div>
        {repos.length > 0 && (
          <Fragment>
            <div className="user-info">
              <img
                alt=""
                className="img-responsive center-block"
                src={avatar_url}
              />
              <h3>{login}</h3>
              <h4>
                <a href={html_url} rel="noreferrer" target="_blank">
                  {html_url}
                </a>
              </h4>
            </div>
            <div className="repo-list">
              <h4>List user's repositories:</h4>
              <p>(Click repository to visit on GitHub)</p>
              <ul>
                {_.map(repos, (repo) => (
                  <RepoListElement key={repo.id} {...repo} />
                ))}
              </ul>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default SearchGithubUser;
