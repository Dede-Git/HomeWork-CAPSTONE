/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import PropTypes from 'prop-types';
// import Link from 'next/link';
import {
  Navbar, Container, Nav, Image,
} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBar from './searchBar';
// import logo from '../public/logo.png';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav.Link href="/"><img src="./logo.png" alt="HOMEWORK Logo" width={100} height={50} /></Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/exercises">Stretches</Nav.Link>
            {/* <Nav.Link href="/explans">Stretch Plans</Nav.Link> */}
            <NavDropdown title="Create" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/workout/new">Create Workout</NavDropdown.Item>
              <NavDropdown.Item href="/plan/new">Create Plan</NavDropdown.Item>
              <NavDropdown.Item href="/exercise/new">Create Stretch</NavDropdown.Item>
              {/* <NavDropdown.Item href="/explan/new">Create Stretch Plan</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <SearchBar className="d-flex" />
          <Nav.Link href="/profile">
            <Image src={user.photoURL} alt="userURL" width="50px" height="50px" id="navbarprofile" />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

//   return (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Container>
//         <Nav.Link href="/"><img src="./logo.png" alt="logo" width={100} height={60} /></Nav.Link>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse className="justify-content-end">
//           <Nav className="ml-auto">
//             {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
//             <Link passHref href="/workout/new">
//               <Nav.Link>Create Workout</Nav.Link>
//             </Link>
//             <Link passHref href="/plan/new">
//               <Nav.Link>Create Plan</Nav.Link>
//             </Link>
//             <Link passHref href="/exercises">
//               <Nav.Link>Exercises</Nav.Link>
//             </Link>
//             <Link passHref href="/explans">
//               <Nav.Link>Exercise Plans</Nav.Link>
//             </Link>
//             <Link passHref href="/exercise/new">
//               <Nav.Link>Create Exercise</Nav.Link>
//             </Link>
//             <Link passHref href="/explan/new">
//               <Nav.Link>Create Exercise Plan</Nav.Link>
//             </Link>
//             <Nav.Link href="/profile">
//               <Image src={user.photoURL} alt="userURL" width="50px" height="50px" id="navbarprofile" />
//             </Nav.Link>
//             <SearchBar />
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// NavBar.propTypes = {
//   user: PropTypes.shape({
//     displayName: PropTypes.string,
//     photoURL: PropTypes.string,
//   }).isRequired,
// };
// img src="./logo.png"
