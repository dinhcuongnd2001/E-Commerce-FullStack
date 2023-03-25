import { useState, useCallback, useRef } from "react";
import "./App.css";
import axios from "axios";
import { debounce } from "lodash";
import StreetRouter from "./router/streetRouter";
import Login from "./pages/Login";

function App() {
  return (
    <div className="w-full h-full">
      <StreetRouter></StreetRouter>
    </div>
  );
}

export default App;
