import logo from "./logo.svg";
import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import HomePage from "./pages/HomePage";
import { FlightDataProvider } from "./contexts/flightDataContext";

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <HomePage />
    </Suspense>
  );
}

export default App;
