import LeafData from "./LeafData";
import Property from "./Property";
import sha256 from "crypto-js/sha256";

export default class Deserializer {
  constructor(text) {
    this.text = text;
    this.data = this.convertInitialData(this.text);
  }

  convertInitialData(givenData) {
    if (givenData == null) {
      return null;
    } else {
      let parsedData =
        typeof givenData == "string" ? JSON.parse(givenData) : givenData;
      let root;
      let property;
      if ("root" in parsedData) {
        root = this.convertToLeafData(parsedData.root);
      } else {
        root = new LeafData();
      }
      if ("property" in parsedData) {
        property = this.convertToProperty(parsedData.property);
      } else {
        property = new Property();
      }
      property.initialTreeHash = sha256(JSON.stringify(root)).toString();

      return { root: root, property: property };
    }
  }

  convertToLeafData(data) {
    let out = new LeafData(
      data.id,
      data.description,
      [],
      data.imgs,
      data.color
    );

    for (let child of data.children) {
      out.children.push(this.convertToLeafData(child));
    }
    return out;
  }

  convertToProperty(data) {
    return Property.getNewObject(data);
  }
}
