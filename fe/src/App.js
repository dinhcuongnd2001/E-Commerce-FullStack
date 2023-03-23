import { useState, useCallback, useRef } from "react";
import "./App.css";
import axios from "axios";
import { debounce } from "lodash";
import Login from "./pages/Login";

function App() {
  // const [visible, setVisible] = useState(false);
  // const [keyword, setKeyword] = useState("");
  // const [dropdownOptions, setDropdownOptions] = useState([]);
  // function openDropdown() {
  //   setVisible(true);
  // }

  // function fetchDropdownOptions(key) {
  //   console.log("called");
  //   axios
  //     .get(`https://6320b80e82f8687273a64e83.mockapi.io/api/products`)
  //     .then((res) => setDropdownOptions(res.data));
  // }

  // const debounceDropDown = useCallback(
  //   debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
  //   []
  // );

  // function handleInputOnchange(e) {
  //   const { value } = e.target;
  //   console.log(value, 123);
  //   setKeyword(value);
  //   debounceDropDown(value);
  // }
  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default App;
