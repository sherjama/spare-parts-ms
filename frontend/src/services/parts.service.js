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
      throw error;
    }
  }
  async sellParts({
    address,
    customerName,
    date,
    mobileNumber,
    discount,
    other,
    parts,
  }) {
    try {
      return await axios.post(`${this.partsRoute}/sell-part`, {
        address,
        customerName,
        date,
        mobileNumber,
        discount,
        other,
        parts,
      });
    } catch (error) {
      console.log("Sell parts :", error);
      throw error;
    }
  }

  async getPurchaseBill(billNo) {
    try {
      const receiptUrl = `${
        this.partsRoute
      }/purchase-receipt?billNo=${encodeURIComponent(billNo)}`;
      window.open(receiptUrl, "_blank");
    } catch (error) {
      console.log("Get purchase bill: ", error);
      throw error;
    }
  }

  async getSellBill(billNo) {
    try {
      const receiptUrl = `${
        this.partsRoute
      }/sell-receipt?billNo=${encodeURIComponent(billNo)}`;
      window.open(receiptUrl, "_blank");
    } catch (error) {
      console.log("Get sell bill: ", error);
      throw error;
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

  async updatePart({ partNumber, partName, shelf, Price }) {
    try {
      return await axios.patch(`${this.partsRoute}/update-part-details`, {
        partNumber,
        partName,
        shelf,
        Price,
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
