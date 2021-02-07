import React from "react";
import ReactDom from "react-dom";
import ChatFeed from "./ChatFeed";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<ChatFeed />, div);
});




