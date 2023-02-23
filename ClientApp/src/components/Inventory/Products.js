import React, { Component } from "react";
import {
  Badge,
  Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Collapse, Form, FormGroup, FormText, Input, InputGroup, InputGroupText, Label, Row
} from "reactstrap";
import deg1 from "../../assets/deg1.jpg";
import deg2 from "../../assets/deg2.jpg";
import deg3 from "../../assets/deg3.jpg";
import deg4 from "../../assets/deg4.jpg";
import det1 from "../../assets/det1.webp";
import det2 from "../../assets/det2.jpg";
import det3 from "../../assets/det3.jpg";
import det4 from "../../assets/det4.jpg";

export class Products extends Component {
  static displayName = Products.name;

  constructor(props) {
    super(props);

    this.onSearchTextChange = this.onSearchTextChange.bind(this);

    this.state = {
      // Whether API call is still waiting
      loading: true,

      // Whether form to add product is open
      addFormOpen: false,
    };

    this.images = [deg1, deg2, deg3, deg4, det1, det2, det3, det4];
  }

  componentDidMount() {
    this.populateProductData();
  }

  async populateProductData() {
    const response = await fetch("api/inventory");
    const data = await response.json();
    this.setState({ productData: data.products, loading: false });
    console.log(data);
  }

  onSearchTextChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  renderProductData() {
    return (
      <div>
        <h1>Product Management</h1>
        <div>
          {/* Add product form toggle button */}
          <div>
            <Button className="mb-3" color="primary" onClick={() => this.setState({ addFormOpen: !this.state.addFormOpen })}>
              Create New Product
            </Button>

            <Collapse className="mb-3" isOpen={this.state.addFormOpen}>
              <Card>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="name">
                        Product Name
                      </Label>
                      <Input id="name" name="text" placeholder="Enter product name..." />
                    </FormGroup>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="category">
                            Category
                          </Label>
                          <Input id="category" name="category" type="select" placeholder="with a placeholder">
                            <option>Choose a category...</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="manufacturer">
                            Manufacturer
                          </Label>
                          <Input id="manufacturer" name="manufacturer" type="select" placeholder="password placeholder">
                            <option>Choose a manufacturer...</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input id="description" name="description" type="textarea" placeholder="Enter a short description of the product..." />
                    </FormGroup>

                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="price">Price</Label>
                          <Input id="price" name="price" type="number" min={0} />
                        </FormGroup>
                      </Col>

                      <Col md={4}>
                        <FormGroup>
                          <Label for="weightGram">Weight (g)</Label>
                          <Input id="weightGram" name="weightGram" type="number" min={0} />
                        </FormGroup>
                      </Col>

                      <Col md={4}>
                        <FormGroup>
                          <Label for="stock">Stock</Label>
                          <Input id="stock" name="stock" type="number" min={0} placeholder="Optional" />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup row>
                      <Label
                        for="exampleFile"
                        sm={2}
                      >
                        Product Image
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="exampleFile"
                          name="file"
                          type="file"
                        />
                        <FormText>
                          Upload a clear image of the product. Supports JPEG or PNG.
                        </FormText>
                      </Col>
                    </FormGroup>

                    <Button color="success" type="submit">
                      Create
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          </div>

          {/* Search bar */}
          <div className="mb-3">
            <InputGroup>
              <InputGroupText>
                Search
              </InputGroupText>
              <Input onChange={this.onSearchTextChange} placeholder="Search by ID or name" />
            </InputGroup>
          </div>

          {/* Product Listing */}
          <Row sm={3} md={4}>
            {this.state.productData.map((data, key) => {
              return (
                <div key={key}>
                  <ProductCard
                    key={key}
                    name={data.name}
                    manufacturer={data.manufacturer}
                    category={data.category}
                    description={data.description}
                    image={this.images[key % this.images.length]}
                  />
                </div>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderProductData()
    );

    return (
      <div>
        {contents}
      </div>
    );
  }
}

const ProductCard = ({ name, manufacturer, category, description, image }) => {
  if (!name) return <div />;

  let badgeColour = "success";
  switch (category) {
    case "Detergent":
      badgeColour = "success";
      break;
    case "Degreaser":
      badgeColour = "warning";
      break;
    case "Acids":
      badgeColour = "danger";
      break;
    case "Abrasives":
      badgeColour = "secondary";
  }

  return (
    <div>
      <Card>
        <CardImg src={image} />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            {manufacturer}
          </CardSubtitle>
          <Badge color={badgeColour}>{category}</Badge>
          <CardText>{description}</CardText>
          <Button>View</Button>
        </CardBody>
      </Card>
      <br />
    </div>
  );
};