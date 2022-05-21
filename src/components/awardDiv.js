import { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
} from "shards-react";

export default class AwardDiv extends Component {
  render() {
    return (
      <div class="m-2">
        <Card style={{ height: "40vh", maxWidth: "300px", borderRadius: 0 }}>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <p>{this.props.content}</p>
          </CardBody>
          <CardFooter
            style={{
              borderRadius: 0,
              background:
                "linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",
            }}
          ></CardFooter>
        </Card>
      </div>
    );
  }
}
