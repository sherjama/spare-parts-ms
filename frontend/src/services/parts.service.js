import axios from "axios";

class Parts {
  partsRoute;

  constructor() {
    this.partsRoute = "/api/v1/parts";
  }

  async buyParts({ vendorName, vendorBillNo, date, parts }) {
    try {
      return await axios.post(`${this.partsRoute}/buy-part`, {
        vendorBillNo,
        vendorName,
        date,
        parts,
      });
    } catch (error) {
      console.log("Buy parts :", error);
    }
  }

  async createPart({ partNumber, partName, shelfName, MRP, Qty }) {
    try {
      return await axios.post(`${this.partsRoute}/create-part`, {
        partNumber,
        partName,
        shelfName,
        MRP,
        Qty,
      });
    } catch (error) {
      console.log("createPart :", error);
      return error;
    }
  }

  async updatePart({ partNumber, partName, shelf, MRP }) {
    try {
      return await axios.patch(`${this.partsRoute}/update-part-details`, {
        partNumber,
        partName,
        shelf,
        MRP,
      });
    } catch (error) {
      console.log("updatePart :", error);
      return error;
    }
  }

  async addQuantity({ partNumber, Qty }) {
    try {
      return await axios.patch(`${this.partsRoute}/add-Qty`, {
        partNumber,
        Qty,
      });
    } catch (error) {
      console.log("addQuantity :", error);
      return error;
    }
  }

  async deletePart(partNumber) {
    try {
      return await axios.delete(`${this.partsRoute}/delete-part`, {
        partNumber,
      });
    } catch (error) {
      console.log("deletePart :", error);
      return error;
    }
  }

  async getAllParts(userId) {
    console.log("service : ", userId);

    try {
      return await axios.get(`${this.partsRoute}/get-parts`, {
        params: { userId },
      });
    } catch (error) {
      console.log("getAllParts :", error);
      return error;
    }
  }

  async getShelfParts(shelfName) {
    try {
      return await axios.get(`${this.partsRoute}/get-shelf-parts`, {
        params: { shelfName },
      });
    } catch (error) {
      console.log("getShelfParts :", error);
      return error;
    }
  }
}

const partsService = new Parts();

export default partsService;
