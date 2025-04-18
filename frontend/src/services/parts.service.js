import axios from "axios";

class Parts {
  partsRoute;

  constructor() {
    this.partsRoute = "/api/v1/parts";
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
    }
  }

  async deletePart(partNumber) {
    try {
      return await axios.delete(`${this.partsRoute}/delete-part`, {
        partNumber,
      });
    } catch (error) {
      console.log("deletePart :", error);
    }
  }

  async getAllParts(userId) {
    try {
      return await axios.get(`${this.partsRoute}/get-parts`, {
        userId,
      });
    } catch (error) {
      console.log("getAllParts :", error);
    }
  }

  async getShelfParts(shelfName) {
    try {
      return await axios.get(`${this.partsRoute}/get-shelf-parts`, {
        shelfName,
      });
    } catch (error) {
      console.log("getShelfParts :", error);
    }
  }
}

export const partsService = new Parts();
