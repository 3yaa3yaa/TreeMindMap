import PreviewList from "../src/PreviewList";
import LeafData from "../src/LeafData";
import React from "react";
import { shallow, mount, render } from "enzyme";

describe("A suite", function () {
  it("should display items properly", function () {
    let data0 = new LeafData(0, "data0", []);
    let data1 = new LeafData(1, "data1", []);
    let data2 = new LeafData(2, "data2", []);
    let data3 = new LeafData(3, "data3", []);
    let data4 = new LeafData(4, "data4", []);
    let data5 = new LeafData(5, "data5", []);
    let data6 = new LeafData(6, "data6", []);
    let data7 = new LeafData(7, "data7", []);

    data0.children.push(data1);
    data1.children.push(data3);
    data0.children.push(data2);
    data2.children.push(data4);
    data4.children.push(data7);
    data4.children.push(data5);
    data5.children.push(data6);

    const wrapper = mount(<PreviewList leafdata={data0} />);
    //console.log(wrapper.debug());
    expect(wrapper.find(".description").at(0).text()).toBe("data0");
    expect(wrapper.find(".description").at(1).text()).toBe("data1");
    expect(wrapper.find(".description").at(2).text()).toBe("data3");
    expect(wrapper.find(".description").at(3).text()).toBe("data2");
    expect(wrapper.find(".description").at(4).text()).toBe("data4");
    expect(wrapper.find(".description").at(5).text()).toBe("data7");
    expect(wrapper.find(".description").at(6).text()).toBe("data5");
    expect(wrapper.find(".description").at(7).text()).toBe("data6");
  });

  it("should calculate numbers properly", function () {
    const sel = (id) => `[testkey="${id}"]`;
    let data0 = new LeafData(0, "first level:\n=sum()", []);
    let data1 = new LeafData(1, "second level:\n=count()", []);
    let data2 = new LeafData(2, "third level:\n#10.5", []);
    let data3 = new LeafData(3, "fourth level:\n#20.5", []);
    let data4 = new LeafData(4, "fifth level:\n#30.5", []);

    data0.children.push(data1);
    data1.children.push(data2);
    data2.children.push(data3);
    data3.children.push(data4);

    const wrapper = mount(<PreviewList leafdata={data0} />);
    //console.log(wrapper.debug());
    expect(wrapper.find(sel("val-0-0")).at(0).text()).toEqual(
      expect.stringContaining("first level")
    );
    expect(wrapper.find(sel("val-0-1")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-1-0")).at(0).text()).toEqual(
      expect.stringContaining("second level")
    );
    expect(wrapper.find(sel("val-1-1")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-2-0")).at(0).text()).toEqual(
      expect.stringContaining("third level")
    );
    expect(wrapper.find(sel("val-2-1")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-3-0")).at(0).text()).toEqual(
      expect.stringContaining("fourth level")
    );
    expect(wrapper.find(sel("val-3-1")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-4-0")).at(0).text()).toEqual(
      expect.stringContaining("fifth level")
    );
    expect(wrapper.find(sel("val-4-1")).at(0).text()).toEqual("");
  });

  it("should recognize label exists properly", function () {
    let data0 = new LeafData(0, "first level", []);
    let data1 = new LeafData(1, "second level", []);
    let data2 = new LeafData(2, "third level:\n#label1", []);
    let data3 = new LeafData(3, "fourth level:\n#label2", []);
    let data4 = new LeafData(4, "fifth level:\n#label3", []);

    data0.children.push(data1);
    data1.children.push(data2);
    data2.children.push(data3);
    data3.children.push(data4);

    const sel = (id) => `[testkey="${id}"]`;
    const wrapper = mount(<PreviewList leafdata={data0} />);
    //console.log(wrapper.debug());
    expect(wrapper.find(sel("val-0-0")).at(0).text()).toEqual(
      expect.stringContaining("first level")
    );
    expect(wrapper.find(sel("val-0-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-0-2")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-0-3")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-0-4")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-1-0")).at(0).text()).toEqual(
      expect.stringContaining("second level")
    );
    expect(wrapper.find(sel("val-1-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-1-2")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-1-3")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-1-4")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-2-0")).at(0).text()).toEqual(
      expect.stringContaining("third level")
    );
    expect(wrapper.find(sel("val-2-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-2-2")).at(0).text()).toEqual("\u2705");
    expect(wrapper.find(sel("val-2-3")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-2-4")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-3-0")).at(0).text()).toEqual(
      expect.stringContaining("fourth level")
    );
    expect(wrapper.find(sel("val-3-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-3-2")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-3-3")).at(0).text()).toEqual("\u2705");
    expect(wrapper.find(sel("val-3-4")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-4-0")).at(0).text()).toEqual(
      expect.stringContaining("fifth level")
    );
    expect(wrapper.find(sel("val-4-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-4-2")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-4-3")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-4-4")).at(0).text()).toEqual("\u2705");
  });

  it("should calculate label values properly", function () {
    let data0 = new LeafData(0, "first level:\n=sum(label)", []);
    let data1 = new LeafData(1, "second level:\n=count(label)", []);
    let data2 = new LeafData(2, "third level:\n#label:10.5", []);
    let data3 = new LeafData(3, "fourth level:\n#label:20.5", []);
    let data4 = new LeafData(4, "fifth level:\n#label:30.5", []);

    data0.children.push(data1);
    data1.children.push(data2);
    data2.children.push(data3);
    data3.children.push(data4);

    const sel = (id) => `[testkey="${id}"]`;
    const wrapper = mount(<PreviewList leafdata={data0} />);
    //console.log(wrapper.debug());
    expect(wrapper.find(sel("val-0-0")).at(0).text()).toEqual(
      expect.stringContaining("first level")
    );
    expect(wrapper.find(sel("val-0-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-0-2")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-1-0")).at(0).text()).toEqual(
      expect.stringContaining("second level")
    );
    expect(wrapper.find(sel("val-1-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-1-2")).at(0).text()).toEqual("");

    expect(wrapper.find(sel("val-2-0")).at(0).text()).toEqual(
      expect.stringContaining("third level")
    );
    expect(wrapper.find(sel("val-2-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-2-2")).at(0).text()).toEqual("10.5");

    expect(wrapper.find(sel("val-3-0")).at(0).text()).toEqual(
      expect.stringContaining("fourth level")
    );
    expect(wrapper.find(sel("val-3-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-3-2")).at(0).text()).toEqual("20.5");

    expect(wrapper.find(sel("val-4-0")).at(0).text()).toEqual(
      expect.stringContaining("fifth level")
    );
    expect(wrapper.find(sel("val-4-1")).at(0).text()).toEqual("");
    expect(wrapper.find(sel("val-4-2")).at(0).text()).toEqual("30.5");
  });
});
