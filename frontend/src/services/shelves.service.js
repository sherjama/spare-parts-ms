import axiosInstance from "./axiosInstance";

class Shelves {
  shelveRoute;

  constructor() {
    this.shelveRoute = "/shelf";
  }

  async createShelve(shelfName) {
    try {
      return await axiosInstance.post(`${this.shelveRoute}/create-shelf`, {
        shelfName,
      });
    } catch (error) {
      console.log("createShelve :", error);
      throw error;
    }
  }

  async updateShelveName({ oldShelfName, newShelfName }) {
    try {
      return await axiosInstance.patch(
        `${this.shelveRoute}/update-shelf-name`,
        {
          oldShelfName,
          newShelfName,
        }
      );
    } catch (error) {
      console.log("updateShelveName :", error);
      throw error;
    }
  }

  async deleteShelve(shelfName) {
    try {
      return await axiosInstance.delete(`${this.shelveRoute}/delete-shelf`, {
        data: { shelfName },
      });
    } catch (error) {
      console.log("deleteShelve :", error);
      throw error;
    }
  }

  async listShelves() {
    try {
      return await axiosInstance.get(`${this.shelveRoute}/list-shelf`);
    } catch (error) {
      console.log("listShelves :", error);
      throw error;
    }
  }
}

export default new Shelves();
