// /api/modules/user.js
import request from "@/utils/request";

export function getList() {
  return request({
    url: "/forum/list",
    method: "get",
  });
}