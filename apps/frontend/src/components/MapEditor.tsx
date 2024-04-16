import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Map.css";
import { Node } from "database";
import { EdgeCoordinates } from "../routes/MapEdit.tsx";
import MapZoomButtons from "./MapZoomButtons.tsx";

function MapEditor(props: {
  activeFloor: number;
  nodes: Node[];
  edges: EdgeCoordinates[];
  onNodeClick: (node: Node) => void;
}) {
  // Determines which map to load depending on floor prop.
  let map;
  switch (props.activeFloor) {
    case -2:
      map = lowerLevel2;
      break;
    case -1:
      map = lowerLevel1;
      break;
    case 1:
      map = firstFloor;
      break;
    case 2:
      map = secondFloor;
      break;
    case 3:
      map = thirdFloor;
      break;
  }

  return (
    <div>
      <TransformWrapper>
        <MapZoomButtons />
        <TransformComponent>
          <svg
            viewBox="0 0 5000 3400"
            width="auto"
            height="98vh"
            className="rounded-xl"
          >
            <image href={map} />
            {props.edges.map((edge, index) => (
              <line
                key={index}
                x1={edge.startX}
                x2={edge.endX}
                y1={edge.startY}
                y2={edge.endY}
                stroke="#D4B547"
                strokeWidth="6"
              />
            ))}
            {props.nodes.map((node, index) => (
              <circle
                key={index}
                r="15"
                cx={node.xcoord}
                cy={node.ycoord}
                fill="#012D5A"
                onClick={() => props.onNodeClick(node)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default MapEditor;
