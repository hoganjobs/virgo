// /mock/modules/user.js
const userList = {
  url: "/forum/list",
  type: "get",
  response: {
    code: 200,
    data: {
      total: 100,
      "rows|10": [
        {
          id: "@id",
          title: "@ctitle(1, 100)",
          date: "@date(yyyy-MM-dd HH:mm)",
        },
      ],
    },
  },
};

module.exports = [userList];