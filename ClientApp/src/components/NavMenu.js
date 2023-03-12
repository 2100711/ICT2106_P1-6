import React, { Component } from 'react';
import { Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {
      navCollapse: true,
      navInventoryDropdown: false,
      navCarbonFootprintDropdown: false,
      navRewardsDropdown: false
    };
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">Clean Bright Company</NavbarBrand>
          <NavbarToggler onClick={() => this.setState({ collapsed: !this.state.navCollapse })} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.navCollapse} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>

              <Dropdown nav isOpen={this.state.navInventoryDropdown} toggle={() => this.setState({ navInventoryDropdown: !this.state.navInventoryDropdown })}>
                <DropdownToggle nav caret>
                  Inventory
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Inventory</DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/inventory">Dashboard</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/inventory/stock">Stock</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/inventory/products">Product Management</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown nav isOpen={this.state.navCarbonFootprintDropdown} toggle={() => this.setState({ navCarbonFootprintDropdown: !this.state.navCarbonFootprintDropdown })}>
                <DropdownToggle nav caret>
                  Carbon Footprint
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Carbon Footprint</DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/building-overview">Building Overview</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/customer-report">Customer Report</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown nav isOpen={this.state.navRewardsDropdown} toggle={() => this.setState({ navRewardsDropdown: !this.state.navRewardsDropdown })}>
                <DropdownToggle nav caret>
                  Rewards
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Rewards</DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to='/reward'>Rewards</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/goal">Goal Setting</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
