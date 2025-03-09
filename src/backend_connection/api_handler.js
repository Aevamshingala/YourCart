import axios from "axios";

export async function apiData({ url, data = {} }) {
  try {
    let response = {};
    const api = axios.create({ baseURL: "http://localhost:3000/api/v1/user" });
    await api
      .post(`${url}`, data)
      .then(
        (res) =>
          (response = {
            data: res.data,
            message: res.data.message,
            statusCode: res.data.statusCode,
          })
      )
      .catch((res) => {
        response = {
          error: res.response.data.message,
          success: res.response.data.success,
        };
      });
    return response;
  } catch (error) {
    return null;
  }
}

// console.log(
//   await apiData({
//     url: "/login",
//     data: {
//       userName: "aevam",
//       email: "aevam@gmail.com",
//       password: "123789",
//     },
//   })
// );
