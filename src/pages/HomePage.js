import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import { Link as ReactScrollLink } from "react-scroll";
import * as THREE from "three";
import Button from "../components/button";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Plane, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { MeshBasicMaterial } from "three";
import DestinationMap from "../components/destinationMap";
import FlightCard from "../components/flightCard";
import AwardDiv from "../components/awardDiv";
import SiteFooter from "../components/siteFooter";
import FlightTrackerPanel from "../components/flightTrackerPanel";
import AllPageNavbar from "../components/navbar";
import PageTemplate from "./pageTemplate";
import { Navigate } from "react-router";

var texture;
var planeTexture;
var gltf;
var centerbox;
var center;

function Airplane() {
  texture = useLoader(THREE.TextureLoader, "/assets/planeUnwrap.jpg");
  planeTexture = new THREE.MeshBasicMaterial({ map: texture });
  texture.flipY = false;
  // console.log(airplaneGltf)
  gltf = useGLTF("/assets/plane.glb");
  centerbox = new THREE.Box3().setFromObject(gltf.scene);
  center = centerbox.getCenter(new THREE.Vector3());

  gltf.scene.position.x += gltf.scene.position.x - center.x;
  gltf.scene.position.y += gltf.scene.position.y - center.y;
  gltf.scene.position.z += gltf.scene.position.z - center.z;
  gltf.scene.rotation.y = -Math.PI / 5;
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.traverse((c) => {
    c.material = planeTexture;
  });
  console.log(gltf.scene);
  return (
    <Canvas
      camera={{
        position: [3, 7, 40],
        rotation: [0, -Math.PI / 30, 0],
      }}
    >
      <ambientLight intensity={3} />
      <primitive object={gltf.scene} map={texture} map-flipY={false} />
    </Canvas>
  );
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
    };
    this.navigateToFlightBooking = this.navigateToFlightBooking.bind(this);
  }

  navigateToFlightBooking() {
    this.setState({
      navigate: true,
    });
  }

  render() {
    return (
      <PageTemplate>
        <div class="container">
          <div class="d-flex row">
            <div
              class="d-flex col-6 align-items-center"
              style={{ padding: 20, height: "90vh" }}
            >
              <div class="d-flex row justify-content-center">
                <h1 style={{ fontSize: 60 }}>
                  Looking
                  <br />
                  for a<br />
                  short <br />
                  getaway?
                </h1>
                <h4>We fly to 2 destinations. Daily.</h4>
                <div class="d-flex p-2 justify-content-start">
                  <div class="d-flex m-1">
                    {this.state.navigate ? (
                      <Navigate to="/bookflights" />
                    ) : (
                      <Button onClick={this.navigateToFlightBooking}>
                        Book Flights
                      </Button>
                    )}
                  </div>
                  <div class="d-flex m-1">
                    <Button>
                      <ReactScrollLink to="checkflightstatus">
                        Check Flight Status
                      </ReactScrollLink>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">{Airplane()}</div>
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",
            width: "100vw",
            overflowX: "hidden",
          }}
        >
          <div class="d-flex flex-column p-5">
            <div class="d-flex flex-column align-items-center justify-content-center">
              <h2>Our 2 Destinations</h2>

              <h4>Falkland Islands and Rio Grande, Argentina</h4>
            </div>

            <div class="d-flex flex-row justify-content-start">
              <div style={{ border: "2px solid white" }} class="flex-fill">
                <DestinationMap />
              </div>
              <div class="d-flex flex-column p-2">
                <FlightCard />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ background: "white", width: "100vw", overflowX: "hidden" }}
        >
          <div class="d-flex flex-column p-5">
            <div class="d-flex flex-row justify-content-center">
              <AwardDiv
                title="Top 200 Regional Airlines 2021"
                content="Hummingbird Air Transit ranked 145th in the World."
              />
              <AwardDiv
                title="AirRatingCentro's top 10 Regional Airlines 2020"
                content="Fans voted HAT as 7th in the region."
              />
              <AwardDiv
                title="Latin America's top 30 Low-cost Airlines 2021"
                content="3rd Year streak of being the top 30 low-cost carriers in the region."
              />
            </div>

            <div
              id="checkflightstatus"
              class="m-2 p-5 d-flex flex-column justify-content-center align-items-center"
            >
              <h4>Check Flight Status</h4>
              <div class="m-2 d-flex justify-content-center align-items-center">
                <FlightTrackerPanel />
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}
