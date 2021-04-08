module.exports = {
  "get /": async (ctx) => {
    ctx.body = "⾸首⻚页";
  },
  "get /detail": (ctx) => {
    ctx.body = "详情⻚页⾯面";
  },
};
