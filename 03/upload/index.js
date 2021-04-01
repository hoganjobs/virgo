// Stream pipe
request.pipe(fis);
response.end();

// Buffer connect
request.on("data", (data) => {
  chunk.push(data);
  size += data.length;
  console.log("data:", data, size);
});
request.on("end", () => {
  console.log("end...");
  const buffer = Buffer.concat(chunk, size);
  size = 0;
  fs.writeFileSync(outputFile, buffer);
  response.end();
});

// 流事件写⼊入
// request.on("data", (data) => {
//   console.log("data:", data);
//   fis.write(data);
// });
// request.on("end", () => {
//   fis.end();
//   response.end();
// });
