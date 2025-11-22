export default getErrorMessage = (err) => {
  if (!err) return "Something went wrong";

  if (err.response?.data?.message) return err.response.data.message;

  if (typeof err.response?.data === "string") return err.response.data;

  if (err.response?.data?.error) return err.response.data.error;

  if (err.message === "Network Error") return "Cannot connect to server";

  return err.message || "Unexpected error occurred";
};
