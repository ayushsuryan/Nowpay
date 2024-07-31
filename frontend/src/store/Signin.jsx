import { atom } from "recoil";

export const userCrentials = atom({
  key: "userCrentials",
  default: { username: "", password: "" },
});
