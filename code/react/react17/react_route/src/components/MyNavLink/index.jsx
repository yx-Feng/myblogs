import { Component } from "react";
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
    render() {
		return (
			<NavLink className={({ isActive }) =>"list-group-item" + (isActive ? " activeStyle" : "")} { ...this.props }/>
		)
	}
}
