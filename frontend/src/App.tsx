import "./App.css";
import MenuButton from "@/components/menu-button";
import { Route, Routes } from "react-router-dom";
import Tracker from "@/pages/Tracker";
import { ThemeProvider } from "@/components/theme-provider";
import PokedexData from "@/data/pokedex_data.json";

var pokedexData = PokedexData;

export default function App() {
  return (
    <div>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Menu />} />
          {Object.keys(pokedexData).map((key) => {
            return (
              <Route
                path={"/" + key}
                element={<Tracker name={key} />}
                key={key}
              />
            );
          })}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

function Menu() {
  return (
    <div className="menu">
      {Object.keys(pokedexData).map((key) => {
        return <MenuButton image={key} key={key} />;
      })}
    </div>
  );
}
