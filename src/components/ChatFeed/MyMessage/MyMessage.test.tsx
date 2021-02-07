import React from "react";
import ReactDom from "react-dom";
import MyMessage from "./MyMessage";


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<MyMessage message={{text: 'Simple Test Message', attachments: [{file: undefined}]}} />, div);
});
