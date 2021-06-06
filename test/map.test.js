import { Map } from "../src/index";
import React from "react";
import { shallow, mount, render } from "enzyme";
import LeafData from "../src/LeafData";
import Property from "../src/Property";

describe("A suite", function () {
  it("should add node properly", function () {
    const wrapper = mount(<Map />);
    expect(wrapper.find(".Leaf").length).toBe(1);
    wrapper.find('[id="0-menu-right"]').simulate("click");
    expect(wrapper.find(".Leaf").length).toBe(2);
  });

  it("should edit value properly", function () {
    const wrapper = mount(<Map />);
    wrapper
      .find(".Leaf")
      .find(".text")
      .simulate("change", { target: { value: "foo" } });
    expect(wrapper.find(".Leaf").at(0).text()).toEqual(
      expect.stringContaining("foo")
    );
  });

  it("should edit value properly to an existing map", function () {
    let data0 = new LeafData(0, "first level:\n=sum()", []);
    let data1 = new LeafData(1, "second level:\n=count()", []);
    let data2 = new LeafData(2, "third level:\n#10.5", []);
    let data3 = new LeafData(3, "fourth level:\n#20.5", []);
    let data4 = new LeafData(4, "fifth level:\n#30.5", []);
    data0.children.push(data1);
    data1.children.push(data2);
    data2.children.push(data3);
    data3.children.push(data4);
    let prop = new Property();

    const wrapper = mount(
      <Map initialState={{ root: data0, property: prop }} />
    );
    wrapper
      .find(".Leaf")
      .at(0)
      .find(".text")
      .simulate("change", { target: { value: "foo" } });
    expect(wrapper.find(".Leaf").at(0).text()).toEqual(
      expect.stringContaining("foo")
    );
    expect(wrapper.find(".Leaf").at(1).text()).toEqual(
      expect.stringContaining("second")
    );
  });
});
