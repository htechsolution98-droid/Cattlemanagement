import axios from "axios";

// ===================== XML → JSON CONVERTER =====================
const xmlToJson = (xmlString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/xml");

  if (xml.getElementsByTagName("parsererror").length > 0) {
    throw new Error("Invalid XML");
  }

  const convertNode = (node) => {
    if (!node.children || node.children.length === 0) {
      return node.textContent?.trim() || "";
    }

    const obj = {};

    Array.from(node.children).forEach((child) => {
      const name = child.nodeName;
      const value = convertNode(child);

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

// ===================== HTML → JSON CONVERTER =====================
const htmlToJson = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Table rows માંથી ડેટા એક્સટ્રેક્ટ કરો
  const rows = Array.from(doc.querySelectorAll("table tbody tr"));

  if (rows.length > 0) {
    const headers = Array.from(
      doc.querySelectorAll("table thead th")
    ).map((th) => th.textContent.trim());

    const jsonData = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      const obj = {};
      cells.forEach((cell, i) => {
        const key = headers[i] || `col_${i}`;
        obj[key] = cell.textContent.trim();
      });
      return obj;
    });

    console.log("HTML → JSON (Table):", jsonData);
    return jsonData;
  }

  // જો ટેબલ ન હોય તો ટાઇટલ અને બોડી ટેક્સ્ટ રિટર્ન કરો
  const title = doc.querySelector("title")?.textContent || "";
  const bodyText = doc.querySelector("body")?.textContent?.trim() || "";

  console.log("HTML Page Title:", title);

  return {
    isHtmlResponse: true,
    htmlTitle: title,
    htmlBody: bodyText.substring(0, 500), // વધારે મોટો ડેટા કન્સોલ બગાડે નહીં એટલે 500 કેરેક્ટર
  };
};

// ===================== AXIOS INSTANCE CREATION =====================
const axiosInstance = axios.create({
  // ⚠️ ધ્યાન આપો: અહીં 'YOUR_BACKEND_URL_HERE' કાઢીને તમારો સાચો બેકએન્ડ API URL લખવો જ પડશે!
  // જેમ કે: baseURL: 'http://localhost:5000/api' અથવા તમારો ડોમેઈન URL.
  baseURL: 'https://cattlemanagement.runasp.net', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json', 
    'Accept': 'application/json',      
        "X-Requested-With": "XMLHttpRequest",
 
  },
});

// ===================== REQUEST INTERCEPTOR =====================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Do not append old Authorization token to Auth routes (like Login)
    const isAuthRoute = config.url?.includes("/Auth/");
    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // ✅ FormData detected: remove Content-Type so browser auto-sets it WITH boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      console.log("📎 FormData detected → Content-Type removed (browser will set boundary)");
    }

    console.log("🚀 REQUEST URL =>", config.url);
    console.log("📦 REQUEST DATA =>", config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===================== RESPONSE INTERCEPTOR =====================
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("📥 RAW RESPONSE =>", response);

    if (typeof response.data === "string") {
      const data = response.data.trim();
      const isLoginRequest = response.config?.url?.includes("/Auth/Login");

      // ======= SESSION EXPIRED CHECK =======
      if (
        !isLoginRequest &&
        (data.includes("<title>Admin Login") ||
          data.includes("<title>Login") ||
          data.includes("Cattle Management System - Login"))
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLogin");
        alert("Session Expired. Please Login Again.");
        window.location.href = "/";
        return Promise.reject(new Error("SESSION EXPIRED"));
      }

      // ======= JSON STRING TO OBJECT =======
      // જો સર્વર JSON ડેટાને સ્ટ્રિંગ તરીકે મોકલે, તો તેને ઓબ્જેક્ટમાં ફેરવો
      if (data.startsWith("{") || data.startsWith("[")) {
        try {
          response.data = JSON.parse(data);
          console.log("⚙️ PARSED JSON STRING SUCCESS:", response.data);
        } catch (e) {
          console.log("JSON Parse Error:", e);
        }
      }
      // ======= HTML → JSON =======
      else if (data.startsWith("<!DOCTYPE") || data.startsWith("<html")) {
        console.log("🌐 HTML RESPONSE DETECTED =>", response.config?.url);
        try {
          response.data = htmlToJson(data);
        } catch (err) {
          console.log("HTML Parse Error:", err);
          response.data = { isHtmlResponse: true, raw: data.substring(0, 500) };
        }
      }
      // ======= XML → JSON =======
      else if (
        data.startsWith("<?xml") ||
        data.startsWith("<ArrayOf") ||
        (data.startsWith("<") && !data.startsWith("<!"))
      ) {
        try {
          response.data = xmlToJson(data);
          console.log("📊 XML → JSON SUCCESS:", response.data);
        } catch (error) {
          console.log("XML Parse Error:", error);
        }
      }
    }

    return response;
  },

  // ===================== ERROR INTERCEPTOR =====================
  (error) => {
    console.error("❌ AXIOS ERROR =>", error);

    if (error.response) {
      console.log("🔴 ERROR STATUS =>", error.response.status);
      const rawData = error.response.data;

      if (typeof rawData === "string") {
        const trimmed = rawData.trim();

        if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
          try {
            const parsed = htmlToJson(trimmed);
            console.log("🧩 ERROR HTML → JSON:", parsed);
            error.response.data = parsed;
          } catch (e) {
            console.log("ERROR HTML Parse failed:", e);
          }
        } else if (trimmed.startsWith("<")) {
          try {
            const parsed = xmlToJson(trimmed);
            console.log("🧩 ERROR XML → JSON:", parsed);
            error.response.data = parsed;
          } catch (e) {
            console.log("ERROR XML Parse failed:", e);
          }
        } else if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
          try {
            error.response.data = JSON.parse(trimmed);
          } catch (e) {
            console.log("ERROR JSON String Parse failed:", e);
          }
        } else {
          console.log("⚠️ ERROR DATA (STRING):", trimmed || "(empty)");
        }
      } else {
        console.log("📊 ERROR DATA (JSON):", error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

// વચમાં જે એક્સપોર્ટ હતો તે કાઢી નાખ્યો છે, હવે છેલ્લે માત્ર એક જ વાર પ્રોપર એક્સપોર્ટ થશે.
export default axiosInstance;