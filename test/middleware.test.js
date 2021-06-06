import { Map } from "../src/index";
import React from "react";
import { shallow, mount, render } from "enzyme";
import LeafData from "../src/LeafData";
import Property from "../src/Property";

const middleware = (store) => (next) => (action) => {
  next(action);
  // console.log("middleware called" + JSON.stringify(action))
  setTimeout(() => console.log("middleware call every 1 sec"), 1000);
};

describe("A suite", function () {
  jest.useFakeTimers();
  it("should execute middleware call", function () {
    const wrapper = mount(<Map middleware={middleware} />);
    wrapper
      .find(".Leaf")
      .find(".text")
      .simulate("change", { target: { value: "foo" } });
    expect(wrapper.find(".Leaf").at(0).text()).toEqual(
      expect.stringContaining("foo")
    );
    jest.runAllTimers();
  });
});
