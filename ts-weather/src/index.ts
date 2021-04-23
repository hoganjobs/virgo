import commander from "commander";
import colors from "colors";
import axios from "axios";

const command = commander
  .version("0.1.0")
  .option("-c, --city [name]", "Add city name")
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
  command.outputHelp(colors.red);
  process.exit();
}

interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILive[];
}
interface ILive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const URL = "http://restapi.amap.com/v3/weather/weatherInfo"
const KEY = "4b6a1834397ade9cc36d9d8618992fce"

axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`).then(res => {
  console.log(res.data)
})