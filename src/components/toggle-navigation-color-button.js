import { useContext } from "react";
import HeaderContext from "@/contexts/header-context";

function ToggleNavigationColorButton() {
  const { color, toggleColor } = useContext(HeaderContext);
  return (
    <button onClick={() => toggleColor(!color)}>Toggle Navigation Color</button>
  );
}

export default ToggleNavigationColorButton;
