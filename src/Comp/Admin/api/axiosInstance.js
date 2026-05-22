import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cattlemanagement.runasp.net",
});


// XML → JS converter function
const xmlToJson = (xmlString) => {

  const parser = new DOMParser();

  const xml = parser.parseFromString(xmlString, "text/xml");

  const convertNode = (node) => {

    // Text node
    if (node.children.length === 0) {
      return node.textContent;
    }

    let obj = {};

    [...node.children].forEach((child) => {

      const name = child.nodeName;

      const value = convertNode(child);

      // same tag multiple time hoy
      if (obj[name]) {

        if (!Array.isArray(obj[name])) {
          obj[name] = [obj[name]];
        }

        obj[name].push(value);

      } else {
        obj[name] = value;
      }
    });

    return obj;
  };

  return convertNode(xml.documentElement);
};



// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {

    // XML check
    if (typeof response.data === "string") {

      try {

        response.data = xmlToJson(response.data);

      } catch (error) {
        console.log("XML Parse Error", error);
      }
    }

    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;