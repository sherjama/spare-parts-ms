import axios from "axios";

class Shelves {
  shelveRoute;

  constructor() {
    this.shelveRoute = "/api/v1/shelf";
  }

  async createShelve({ shelfName }) {
    try {
      return await axios.post(`${this.shelveRoute}/create-shelf`, {
        shelfName,
      });
    } catch (error) {
      console.log("createShelve :", error);
      return error;
    }
  }

  async updateShelveName({ oldShelfName, newShelfName }) {
    try {
      return await axios.patch(`${this.shelveRoute}/update-shelf-name`, {
        oldShelfName,
        newShelfName,
      });
    } catch (error) {
      console.log("updateShelveName :", error);
      return error;
    }
  }

  async deleteShelve(shelfName) {
    try {
      return await axios.delete(`${this.deleteShelve}/delete-shelf`, {
        shelfName,
      });
    } catch (error) {
      console.log("deleteShelve :", error);
      return error;
    }
  }
}

export const shelvesService = new Shelves();
