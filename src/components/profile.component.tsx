import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser,
  accessToken: string,
  successful: boolean,
  message: string 
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let accessToken = localStorage.getItem("access_token");
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {},
      accessToken: accessToken? accessToken : "",
      successful: false,
      message: ""
    };
  }

  componentDidMount() {
    AuthService.getMe()
    .then(
      response => {
        let user = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles
        }
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          userReady: true,
          currentUser: user
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    )
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { accessToken, currentUser, message, successful } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) && (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {accessToken.substring(0, 20)} ...{" "}
              {accessToken.substr(accessToken.length - 20)}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div>
        )}

        {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
        )}
      </div>
    );
  }
}
