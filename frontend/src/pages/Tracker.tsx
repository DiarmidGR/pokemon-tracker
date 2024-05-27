import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PokedexData from "@/data/pokedex_data.json";
import { useNavigate } from "react-router-dom";
import "./Tracker.css";

var sprites_path = "images/pokemon-sprites/";

var pokedexData = PokedexData;

//do some checks for local storage variables. set them to defaults if not already set
if (localStorage.getItem("showHidden") == null) {
  localStorage.setItem("showHidden", "false");
}

function Tracker(props: any) {
  const [search, setSearch] = useState("");
  const [showHidden, setShowHidden] = useState(
    localStorage.getItem("showHidden") == "true"
  );
  const [hideItem, setHideItem] = useState(false);
  const [numColumns, setNumColumns] = useState(
    localStorage.getItem("numColumns") == null
      ? 5
      : localStorage.getItem("numColumns")
  );
  const handleSliderChange = (e: any) => {
    localStorage.setItem("numColumns", e.target.value);
    const value = e.target.value;
    setNumColumns(value);
  };
  const columnStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${numColumns}, 120px)`,
  };
  const navigate = useNavigate();

  function handleClickItem(pokemonName: string) {
    var pokemonString = props.name + pokemonName;
    if (localStorage.getItem(pokemonString) == "false") {
      localStorage.setItem(pokemonString, "true");
    } else {
      localStorage.setItem(pokemonString, "false");
    }
  }

  return (
    <>
      <div className="utilities">
        <div className="back-button">
          <Button
            variant={"ghost"}
            size={"default"}
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </div>
        <div className="search-pokemon">
          <Input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Filter by pokemon name..."
            id="searchPokemon"
          />
        </div>
        <div className="textCenter">
          <Checkbox
            id="checkShowHidden"
            checked={showHidden}
            onCheckedChange={() => {
              console.log("Show Caught set to " + !showHidden);
              localStorage.setItem(
                "showHidden",
                showHidden == true ? "false" : "true"
              );
              setShowHidden(!showHidden);
            }}
          />
          <label htmlFor="checkShowHidden" className="labelShowHidden">
            Show Caught?
          </label>
          <input
            type="range"
            min={1}
            max={16}
            name="range-columns"
            value={numColumns?.toString()}
            onChange={(e) => {
              handleSliderChange(e);
            }}
          />
        </div>
      </div>
      <div className="scroll-pokemon">
        <div className="pokemon-cards" style={columnStyle}>
          {pokedexData[props.name as keyof typeof pokedexData]
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search); //
            })
            .map((item) => (
              <div
                className="pokemon-card"
                onClick={() => {
                  handleClickItem(item.name);
                  setHideItem(!hideItem);
                }}
                key={item.name}
                style={{
                  display:
                    !showHidden &&
                    localStorage.getItem(props.name + item.name) ==
                      ("false" || null)
                      ? "none"
                      : "block",
                  background:
                    localStorage.getItem(props.name + item.name) ==
                    ("false" || null)
                      ? "green"
                      : "none",
                }}
              >
                <span className="card-name">{item.name}</span>
                <br />
                <span>{item.number}</span>
                <img
                  className="pokemon-sprite"
                  src={
                    sprites_path +
                    item.name
                      .toString()
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace("♂", "f")
                      .replace("♀", "m")
                      .replace(".", "") +
                    ".png"
                  }
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Tracker;
