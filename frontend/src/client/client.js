import axios from "axios";

class AxiosClient {
  static baseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: AxiosClient.baseUrl,
      maxContentLength: Infinity,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "",
      },
    });
  }

  setHeaders(headers) {
    this.axiosInstance.defaults.headers.common = {
      ...this.axiosInstance.defaults.headers.common,
      ...headers,
    };
  }

  async get(url, config) {
    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post(url, config) {
    const response = await this.axiosInstance.post(url, config);
    return response.data;
  }

  async patch(url, payload, config) {
    return await this.axiosInstance.patch(url, payload, config);
  }

  async delete(url, config) {
    return await this.axiosInstance.delete(url, config);
  }
}

export default AxiosClient;
