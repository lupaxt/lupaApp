import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import "./nav_style.css"

export default function Nav({history}) {
    return  <nav>
        <Link to='/'>HOME</Link>
        <Link to='/account'>ACCOUNT</Link>
        <Link to='/about'>ABOUT</Link>
        <Link to='/groups'>GROUPS</Link>
    </nav>
}