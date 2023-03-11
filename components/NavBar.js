/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            HOMEWORK
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Workouts
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/workout/easy">
                <a className="nav-link">
                  Easy
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/workout/medium">
                <a className="nav-link">
                  Medium
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/workout/hard">
                <a className="nav-link">
                  Hard
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/workout/new">
                <a className="nav-link">
                  New Workouts
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/plan/new">
                <a className="nav-link">
                  New Plan
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/profile">
                <a className="nav-link">
                  Profile
                </a>
              </Link>
            </li>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
