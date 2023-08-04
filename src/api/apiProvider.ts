import { config } from "../config";

export const api = {
  get: function (url: string) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${config.token}`,
        },
        credentials: "include",
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  post: function (url: string, body: any) {
    return new Promise(async (resolve, reject) => {
      fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${config.token}`,
        },
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => {
          // if (!res.ok) {
          //   throw new Error("Network response was not ok");
          // }
          return res.json();
        })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },
};
