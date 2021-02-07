import { cleanup } from "@testing-library/react";
import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginForm from "./components/LoginForm/LoginForm";
import ChatFeed from "./components/ChatFeed/ChatFeed";

configure({ adapter: new Adapter() });

afterEach(cleanup);
it("renders App component", () => {
  const div = document.createElement("div");
  ReactDom.render(<App />, div);
  ReactDom.unmountComponentAtNode(div);
});

describe("<App />", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should render one <LoginForm /> component if not authenticated", () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
  it("should not render <ChatFeed /> component if not authenticated", () => {
    expect(wrapper.find(ChatFeed)).toHaveLength(0);
  });
});
