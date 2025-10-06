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
}

const reportsService = new Reports();
export default reportsService;
