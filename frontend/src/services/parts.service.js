import axiosInstance from "./axiosInstance";

class Parts {
  partsRoute;
  apiBaseURL;

  constructor() {
    this.partsRoute = "/parts";
    this.apiBaseURL = import.meta.env.VITE_API_URL;
  }

  async buyParts(payload) {
    try {
      return await axiosInstance.post(`${this.partsRoute}/buy-part`, payload);
    } catch (error) {
      console.log("Buy parts :", error);
      throw error;
    }
  }

  async sellParts(payload) {
    try {
      return await axiosInstance.post(`${this.partsRoute}/sell-part`, payload);
    } catch (error) {
      console.log("Sell parts :", error);
      throw error;
    }
  }

  async getPurchaseBill(billNo) {
    try {
      const response = await axiosInstance.get(
        `${this.partsRoute}/purchase-receipt`,
        {
          params: { billNo },
        }
      );

      const blob = new Blob([response.data], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.log("Get purchase bill error:", error);
      throw error;
    }
  }

  async getSellBill(billNo) {
    try {
      const response = await axiosInstance.get(
        `${this.partsRoute}/sell-receipt`,
        {
          params: { billNo },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.log("Get sell bill error:", error);
      throw error;
    }
  }

  async createPart(data) {
    try {
      return await axiosInstance.post(`${this.partsRoute}/create-part`, data);
    } catch (error) {
      console.log("createPart :", error);
      return error;
    }
  }

  async updatePart(data) {
    try {
      return await axiosInstance.patch(
        `${this.partsRoute}/update-part-details`,
        data
      );
    } catch (error) {
      console.log("updatePart :", error);
      return error;
    }
  }

  async addQuantity(data) {
    try {
      return await axiosInstance.patch(`${this.partsRoute}/add-Qty`, data);
    } catch (error) {
      console.log("addQuantity :", error);
      return error;
    }
  }

  async deletePart(partNumber) {
    try {
      return await axiosInstance.delete(`${this.partsRoute}/delete-part`, {
        data: { partNumber }, // important for DELETE!
      });
    } catch (error) {
      console.log("deletePart :", error);
      return error;
    }
  }

  async getAllParts(userId) {
    try {
      return await axiosInstance.get(`${this.partsRoute}/get-parts`, {
        params: { userId },
      });
    } catch (error) {
      console.log("getAllParts :", error);
      return error;
    }
  }

  async getShelfParts(shelfName) {
    try {
      return await axiosInstance.get(`${this.partsRoute}/get-shelf-parts`, {
        params: { shelfName },
      });
    } catch (error) {
      console.log("getShelfParts :", error);
      return error;
    }
  }
}

export default new Parts();
