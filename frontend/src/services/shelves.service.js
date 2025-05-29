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
      throw error;
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
      throw error;
    }
  }

  async deleteShelve(shelfName) {
    try {
      return await axios.delete(`${this.shelveRoute}/delete-shelf`, {
        shelfName,
      });
    } catch (error) {
      console.log("deleteShelve :", error);
      throw error;
    }
  }

  async listShelves() {
    try {
      return await axios.get(`${this.shelveRoute}/list-shelf`);
    } catch (error) {
      throw error;
    }
  }
}

export const shelvesService = new Shelves();
