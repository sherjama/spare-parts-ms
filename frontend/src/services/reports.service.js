import axiosInstance from "./axiosInstance";

class Reports {
  reportsRouter;

  constructor() {
    this.reportsRouter = "/reports";
  }

  async getPurchaseBill() {
    try {
      return await axiosInstance.get(`${this.reportsRouter}/purchase-bill`);
    } catch (error) {
      console.log("getPurchaseBill :", error);
      throw error;
    }
  }

  async getSellBill() {
    try {
      return await axiosInstance.get(`${this.reportsRouter}/sell-bill`);
    } catch (error) {
      console.log("getSellBill :", error);
      throw error;
    }
  }

  async getTotalSells() {
    try {
      const total = await axiosInstance.get(
        `${this.reportsRouter}/get-seles-total`
      );
      return total?.data?.data;
    } catch (error) {
      console.log("getTotalSells :", error);
      throw error;
    }
  }

  async getTotalPurchase() {
    try {
      const total = await axiosInstance.get(
        `${this.reportsRouter}/get-purchse-total`
      );
      return total?.data?.data;
    } catch (error) {
      console.log("getTotalPurchase :", error);
      throw error;
    }
  }

  async getMostSoldParts() {
    try {
      const parts = await axiosInstance.get(
        `${this.reportsRouter}/get-most-sold-parts`
      );
      return parts?.data?.data;
    } catch (error) {
      console.log("getMostSoldParts :", error);
      throw error;
    }
  }
}

export default new Reports();
