import './User/SingUp';
import './Home';
import './User/Login';
import './AddPaste';
import './AllPastes';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import './NavBar.css'

function NavBar(props) {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      props.setUserOn(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Navbar className="my-navbar" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" >HOME</Nav.Link>
            <Nav.Link as={Link} to="/addpaste">ADD PASTE</Nav.Link>
            <Nav.Link  as={Link} to="/allpastes">ALL PASTES</Nav.Link>
          </Nav>
          <Nav>
            {props.userOn ?
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">{auth.currentUser.email}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleSignOut}>SING OUT</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              :
              <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
            }
            <Link to="/singup" className="nav-link">SING UP</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;