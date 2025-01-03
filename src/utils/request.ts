import axios from "axios";
import cogoToast from '@successtar/cogo-toast';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


// ==============GET REQUEST=================================
export const GetRequest = async (url: string, token?: string) => {
  try {
    const res = await axios.get(BASE_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    if (error?.response?.data?.status_code === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    // cogoToast.error(error?.response?.data?.message);
    return error;
  }
};

// ==========POST REQUEST=====================
export const PostRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.post(BASE_URL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    cogoToast.error(error?.response?.data?.message);
    
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    if (error?.response?.data?.status_code === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    return error;
  }
};

// ==========PATCH REQUEST=====================
export const PatchRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.patch(BASE_URL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    cogoToast.error(error?.response?.data?.message);
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    if (error?.response?.data?.status_code === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return error;
  }
};

// ==========PUT REQUEST=====================
export const PutRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.put(BASE_URL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    cogoToast.error(error?.response?.data?.message);
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    if (error?.response?.data?.status_code === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return error;
  }
};

