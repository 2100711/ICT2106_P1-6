import React, { Component } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export class Stock extends Component {
  static displayName = Stock.name;

  constructor(props) {
    super(props);
    this.onOpenModalClick = this.onOpenModalClick.bind(this);
    this.onCloseModalClick = this.onCloseModalClick.bind(this);
    this.onSaveStockClick = this.onSaveStockClick.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onCategoryFilterDropDownClick = this.onCategoryFilterDropDownClick.bind(this);
    this.onBrandFilterDropDownClick = this.onBrandFilterDropDownClick.bind(this);

    this.state = {
      // Whether API call is still waiting
      loading: true,
      // Whether modal to update stock is open
      modal: false,
      modalProductId: 0,
      modalCurrentStock: 0,
      // Current search string
      search: "",
      categoryFilter: "",
      brandFilter: "",

      // Filter dropdown
      dropdownCategoryOpen: false,
      dropdownBrandOpen: false,
    };
  }

  componentDidMount() {
    this.populateInventoryData();
  }

  async populateInventoryData() {
    const res = await fetch('/api/inventory');
    const data = await res.json();
    this.setState({ inventory: data.products, loading: false });
    console.log(data);
  }

  onOpenModalClick(e, productId, currentStock) {
    this.setState({
      modal: true,
      modalProductId: productId,
      modalCurrentStock: currentStock
    });
  }

  onCloseModalClick(e) {
    this.setState({
      modal: false
    });
  }

  onSaveStockClick(e) {
    let newStock = document.getElementById("modelInputNewStock").value;

    // Make the API request to update stock
    fetch(`api/inventory/stock/${this.state.modalProductId}?quantity=${newStock}`, { method: 'PUT' })
      .then(res => {
        console.log(res);
        this.onCloseModalClick(null);
        this.populateInventoryData();
      })
      .catch(err => console.log(err))
  }

  onSearchTextChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  onCategoryFilterDropDownClick(e) {
    this.setState({
      categoryFilter: e.target.textContent
    });
  }

  onBrandFilterDropDownClick(e) {
    this.setState({
      brandFilter: e.target.textContent
    });
  }

  renderInventory() {
    return (
      <div>
        <h1>Inventory</h1>

        {/* Search bar */}
        <div>
          <InputGroup>
            <InputGroupText>
              Search
            </InputGroupText>
            <Input onChange={this.onSearchTextChange} placeholder="Search by ID or name"/>

            <Dropdown isOpen={this.state.dropdownCategoryOpen} toggle={() => this.setState({ dropdownCategoryOpen: !this.state.dropdownCategoryOpen })} direction="down">
              <DropdownToggle caret color={this.state.categoryFilter ? 'danger' : 'secondary'}>{this.state.categoryFilter ? `Category: ${this.state.categoryFilter}` : "Filter By Category"}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Category Filter</DropdownItem>
                {[...new Set(this.state.inventory.map(i => i.category))]
                  .map((item, key) => <DropdownItem key={key} onClick={this.onCategoryFilterDropDownClick}>{item}</DropdownItem>)
                }
                <DropdownItem divider></DropdownItem>
                <DropdownItem onClick={() => this.setState({ categoryFilter: "" })}>Clear Filter</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={this.state.dropdownBrandOpen} toggle={() => this.setState({ dropdownBrandOpen: !this.state.dropdownBrandOpen })} direction="down">
              <DropdownToggle caret color={this.state.brandFilter ? 'danger' : 'secondary'}>{this.state.brandFilter ? `Brand: ${this.state.brandFilter}` : "Filter By Brand"}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Brand Filter</DropdownItem>
                {[...new Set(this.state.inventory.map(i => i.brand))]
                  .map((item, key) => <DropdownItem key={key} onClick={this.onBrandFilterDropDownClick}>{item}</DropdownItem>)
                }
                <DropdownItem divider></DropdownItem>
                <DropdownItem onClick={() => this.setState({ brandFilter: "" })}>Clear Filter</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </InputGroup>
        </div>

        {/* Inventory record table */}
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.inventory
                .filter(v => this.state.categoryFilter === "" ? true : v.category === this.state.categoryFilter)
                .filter(v => this.state.brandFilter === "" ? true : v.brand === this.state.brandFilter)
                .filter(v => v.name.includes(this.state.search) || v.id.toString() === this.state.search)
                .map((item, key) => (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>{item.stock}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => this.onOpenModalClick(e, item.id, item.stock)}>
                        Edit Stock
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* modal */}
        <div>
          <Modal isOpen={this.state.modal}>
            <ModalHeader>Manage Stock</ModalHeader>
            <ModalBody>
              <Input id="modelInputNewStock" type="number" min="0" defaultValue={this.state.modalCurrentStock} placeholder="Enter amount"></Input>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSaveStockClick}>Save</Button>
              <Button color="secondary" onClick={this.onCloseModalClick}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderInventory();

    return (
      <div>
        {contents}
      </div>
    );
  }
}