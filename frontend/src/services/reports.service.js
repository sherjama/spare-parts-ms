import axios from "axios";

class Reports {
  reportsRouter;
  constructor() {
    this.reportsRouter = "/api/v1/reports";
  }

  async getPurchaseBill() {
    try {
      return await axios.get(`${this.reportsRouter}/purchase-bill`);
    } catch (error) {
      console.log("getPurchaseBill :", error);
      throw error;
    }
  }

  async getSellBill() {
    try {
      return await axios.get(`${this.reportsRouter}/sell-bill`);
    } catch (error) {
      console.log("getSellBill :", error);
      throw error;
    }
  }

  async getTotalSells() {
    try {
      const total = await axios.get(`${this.reportsRouter}/get-seles-total`);
      if (total) return total?.data?.data;
    } catch (error) {
      console.log("getTotalSells :", error);
      throw error;
    }
  }

  async getTotalPurchase() {
    try {
      const total = await axios.get(`${this.reportsRouter}/get-purchse-total`);
      if (total) return total?.data?.data;
    } catch (error) {
      console.log("getTotalPurchase :", error);
      throw error;
    }
  }

  async getMostSoldParts() {
    try {
      const parts = await axios.get(
        `${this.reportsRouter}/get-most-sold-parts`
      );
      if (parts) return parts?.data?.data;
    } catch (error) {
      console.log("getMostSoldParts :", error);
      throw error;
    }
  }
}

const reportsService = new Reports();
export default reportsService;
