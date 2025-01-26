import  Z  from "@ptt/zz"

export const client = new Z("https://railway.bulletinboard.techtrain.dev", {
  method: "POST",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
})


