import './menu-button.css'
import { useNavigate } from "react-router-dom";

function MenuButton(props: any) {
  const navigate = useNavigate();
  const name = "/" + props.image;
  return (
    <div>
      <div className="box" onClick={() => {navigate(name)}}>
        <img className="thumb" src={"images/menu-thumbs/" + props.image + ".png"}/>
      </div>
    </div>
  )
}

export default MenuButton
