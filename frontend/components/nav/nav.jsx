import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
  Select,
  Navbar,
  MenuItem,
  DropdownButton
} from 'react-bootstrap';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class Nav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      username: "",
      password: "",
      email: "",
      typeOfSubmit: "guest",
      isSignUpOpen: false,
      isSignInOpen: false,
      fnamevalue: "",
      lnamevalue: "",
      uservalue: "",
      pwvalue: "",
      emailvalue: ""
    };
    this.goHome = this.goHome.bind(this);
    this.loginGuest = this.loginGuest.bind(this);
    this.test = this.test.bind(this);
    this.submit1 = this.submit1.bind(this);
    this.submit2 = this.submit2.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.openSignIn = this.openSignIn.bind(this);
    this.hideSignUp = this.hideSignUp.bind(this);
    this.hideSignIn = this.hideSignIn.bind(this);
    this.getFnameValidationState = this.getFnameValidationState.bind(this);
    this.getLnameValidationState = this.getLnameValidationState.bind(this);
    this.getUserValidationState = this.getUserValidationState.bind(this);
    this.getPwValidationState = this.getPwValidationState.bind(this);
    this.getEmailValidationState = this.getEmailValidationState.bind(this);
  }

  componentDidMount() {
  }

  openSignUp() {
    this.setState({ isSignUpOpen: true });
  }

  hideSignUp() {
    this.setState({ isSignUpOpen: false });
  }

  openSignIn() {
    this.setState({ isSignInOpen: true });
  }

  hideSignIn() {
    this.setState({ isSignInOpen: false });
  }

  redirectIfLoggedIn(){
    if (this.props.loggedIn){
      hashHistory.push("/");
    }
  }

  updateFname(field){
    return e => {
      this.setState({ fnamevalue: e.target.value });
      this.setState({[field]: e.currentTarget.value });
    };
  }

  updateLname(field){
    return e => {
      this.setState({ lnamevalue: e.target.value });
      this.setState({[field]: e.currentTarget.value });
    };
  }

  updateUser(field){
    return e => {
      this.setState({ uservalue: e.target.value });
      this.setState({[field]: e.currentTarget.value });
    };
  }

  updatePw(field){
    return e => {
      this.setState({ pwvalue: e.target.value });
      this.setState({[field]: e.currentTarget.value });
    };
  }

  updateEmail(field){
    return e => {
      this.setState({ emailvalue: e.target.value });
      this.setState({[field]: e.currentTarget.value });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors && nextProps.errors.length > 0) {
      if (this.state.typeOfSubmit === 'signup') {
        this.openSignUp();
      } else {
        this.openSignIn();
      }
    }
  }

  loginUser(e){
    e.preventDefault();
    let user = this.state;

    if (this.state.typeOfSubmit === "regular") {
      this.props.login({user});
      this.hideSignIn();
    }
    else {
      user = {username: "guest", password: "guestpw"};
      this.props.login({user});
      this.hideSignIn();
    }
  }

  signUpUser(e){
    e.preventDefault();
    let user = this.state;
    this.state.typeOfSubmit = "signup"
    this.props.signup({user});
    this.hideSignUp();
  }

  submit1() {
    this.setState({typeOfSubmit: "regular"});
  }

  submit2() {
    this.setState({typeOfSubmit: "guest"});
  }

  switchForm() {
    if (this.state.isSignInOpen) {
      this.hideSignIn();
      this.openSignUp();
    } else {
      this.hideSignUp();
      this.openSignIn();
    }
  }

  renderErrors(){
    return(
      <ul>
        {this.props.errors.map( (error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  getFnameValidationState() {
    const length = this.state.fnamevalue.length;
    if (length > 0) return 'success';
    else if (length > 0) return 'error';
  }

  getLnameValidationState() {
    const length = this.state.lnamevalue.length;
    if (length > 0) return 'success';
    else if (length > 0) return 'error';
  }

  getUserValidationState() {
    const length = this.state.uservalue.length;
    if (length > 3) return 'success';
    else if (length > 0) return 'error';
  }

  getPwValidationState() {
    const length = this.state.pwvalue.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
  }

  getEmailValidationState() {
    const email = this.state.emailvalue;
    const length = this.state.email.length;
    if (length !== 0 && email.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i) !== null) {
      if (email.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)[0] === email) return 'success';
    } else if (length > 0) return 'error';
  }

  goHome() {
    this.props.router.push(`/users/${this.props.currentUser.id}`);
  }

  loginGuest() {
    this.state.typeOfSubmit = "guest";
    $('.loginGuest').trigger("click");
  }

  test() {
    this.hideSignIn();
    this.hideSignUp();
    this.props.logout();
  }

  render() {
    if (this.props.currentUser) {
      return (
        <header>
          <nav>
            <Link to="/" className="header-link">
              <h1>TravelApp</h1>
            </Link>


            <hgroup className="header-group">
              <h2 className="header-name"></h2>
              <DropdownButton bsStyle="default" title={`Hi, ${this.props.currentUser.fname}!`} key={1} id={`dropdown-basic-${1}`}>
                <MenuItem eventKey="1" onClick={this.goHome}>
                  <button className="header-button">Profile</button>
                </MenuItem>
                <MenuItem eventKey="2" onClick={this.test}>
                  <button className="header-button">Log Out</button>
                </MenuItem>
              </DropdownButton>

            </hgroup>
          </nav>
        </header>
      )
    }
    else {
      return (
        <header>
        <nav>
        <Link to="/" className="header-link">
        <h1>TravelApp</h1>
        </Link>

        <ul className="signuplogin">
        <li>
        <button className="btn btn-primary" onClick={this.openSignUp}>
        Sign Up
        </button>
        </li>
        <li>
        <button className="btn btn-link toggleSignIn" onClick={this.openSignIn}>
        Sign In
        </button>
        </li>
        </ul>
        </nav>

        <Modal isOpen={this.state.isSignInOpen} onRequestHide={this.hideSignIn} >

        <ModalHeader>
        <ModalClose onClick={this.hideSignIn}/>
        <ModalTitle>
          Please Sign In
        </ModalTitle>
        <br/>
        { this.renderErrors() }
        </ModalHeader>

        <ModalBody>
        <form onSubmit={this.loginUser}>

        <div className="login-form">
        <FormGroup
          controlId="formBasicText"
          validationState={this.getUserValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.username}
            onChange={this.updateUser("username")}
            placeholder="Username"
            className="inputs"
          />

          <FormControl.Feedback />
          <br/>
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getPwValidationState()}
        >
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.updatePw("password")}
            placeholder="Password"
          />

          <FormControl.Feedback />
          <br/>
        </FormGroup>
        <FormGroup className="login-btns">
          <button type="submit" className="btn btn-success" onClick={this.submit1}>Sign in</button>
          <button type="submit" className="btn btn-primary loginGuest" onClick={this.submit2}>Login as guest</button>
        </FormGroup>
        </div>
        </form>
        <button className="btn btn-link switch-form-link" onClick={this.switchForm}>Not a user? Sign Up!</button>
        </ModalBody>

        <ModalFooter>
        <button className='btn btn-default' onClick={this.hideSignIn}>
        Close
        </button>
        </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.isSignUpOpen} onRequestHide={this.hideSignUp}>

        <ModalHeader>
        <ModalClose onClick={this.hideSignUp}/>
        <ModalTitle>
          Welcome to TravelApp!
        </ModalTitle>
        <br />
        { this.renderErrors() }
        </ModalHeader>

        <ModalBody>
        <form onSubmit={this.signUpUser}>
        <div className="login-form">

        <FormGroup
          controlId="formBasicText"
          validationState={this.getFnameValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.fname}
            onChange={this.updateFname("fname")}
            placeholder="First Name *"
          />

          <FormControl.Feedback />
          <br/>
        </FormGroup>

        <FormGroup
          controlId="formBasicText"
          validationState={this.getLnameValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.lname}
            onChange={this.updateLname("lname")}
            placeholder="Last Name *"
          />

          <FormControl.Feedback />
          <br/>
        </FormGroup>

        <FormGroup
          controlId="formBasicText"
          validationState={this.getUserValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.username}
            onChange={this.updateUser("username")}
            placeholder="Username *"
          />

          <FormControl.Feedback />
          <br/>
        </FormGroup>

        <FormGroup
          controlId="formBasicText"
          validationState={this.getPwValidationState()}
        >
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.updatePw("password")}
            placeholder="Password *"
          />

          <FormControl.Feedback />
          <br/>
        </FormGroup>

        <FormGroup
          controlId="formBasicText"
          validationState={this.getEmailValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.email}
            onChange={this.updateEmail("email")}
            placeholder="Email *"
          />

          <FormControl.Feedback />
        </FormGroup>
        <FormGroup className="login-btns">
          <button type="submit" className="btn btn-success sign-up-submit">Sign up</button>
          <button type="button" className="btn btn-primary pull-right" onClick={this.loginGuest}>Login as guest</button>
        </FormGroup>
        </div>
        </form>
        <button className="btn btn-link switch-form-link" onClick={this.switchForm}>Already a user? Sign In!</button>
        </ModalBody>

        <ModalFooter>
        <button className='btn btn-default' onClick={this.hideSignUp}>
        Close
        </button>
        </ModalFooter>

        </Modal>
        </header>
      )
    }
  }
}

export default withRouter(Nav);
