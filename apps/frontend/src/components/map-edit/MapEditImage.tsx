import lowerLevel2 from "../../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapStyling } from "../../common/StylingCommon.ts";
import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../../routes/MapEdit.tsx";
import { Node } from "database";
import ZoomControls from "../map/ZoomControls.tsx";

export type EdgeCoordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const MapEditImage = (props: {
  startEdgeNodeID: string | undefined;
  activeFloor: number;
  onNodeClick: (nodeID: string) => void;
  onMapClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}) => {
  const [edgeCoords, setEdgeCoords] = useState<EdgeCoordinates[]>([]);
  const tempNodes = useContext(MapContext).nodes;

  const selectedNodeID = useContext(MapContext).selectedNodeID;
  const setSelectedNodeID = useContext(MapContext).setSelectedNodeID;
  const selectedAction = useContext(MapContext).selectedAction;

  const [flickeringNode, setFlickeringNode] = useState<string | null>(null);
  //const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  //console.log(tempNodes);
  // const [nodeColors, setNodeColors] = useState<Map<string, string>>(new Map());
  // const [nodeRadii, setNodeRadii] = useState(new Map());
  // eslint-disable-next-line prefer-const
  let [nodes, setNodes] = useState<Map<string, Node>>(new Map<string, Node>());
  const edges = useContext(MapContext).edges;
  const [draggablePosition, setDraggablePosition] = useState({
    x: 0,
    y: 0,
    active: false,
    offset: { x: 0, y: 0 },
  });

  useEffect(() => {
    setNodes(tempNodes);
  }, [tempNodes]);

  useEffect(() => {
    const tempCoords: EdgeCoordinates[] = [];
    for (let i = 0; i < edges.length; i++) {
      const startNode = nodes.get(edges[i].startNodeID);
      const endNode = nodes.get(edges[i].endNodeID);

      if (startNode && endNode) {
        tempCoords.push({
          startX: startNode.xcoord,
          startY: startNode.ycoord,
          endX: endNode.xcoord,
          endY: endNode.ycoord,
        });
      }
    }

    setEdgeCoords(tempCoords);
  }, [edges, nodes]);

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

  // This stops the map event handler from being called
  // Separates node clicks from map clicks
  function nodeClicked(
    event: React.MouseEvent<SVGCircleElement>,
    nodeID: string,
  ) {
    event.stopPropagation();
    props.onNodeClick(nodeID);
    setSelectedNodeID(nodeID);

    if (flickeringNode === nodeID) {
      setFlickeringNode(null);
    } else {
      setFlickeringNode(nodeID);
    }
  }
  // function handleMouseEnter(nodeID: string) {
  //   setNodeRadii((prevRadii) =>
  //     new Map(prevRadii).set(nodeID, MapStyling.nodeRadius * 1.8),
  //   );
  //   setNodeColors((prevColors) => new Map(prevColors).set(nodeID, "red"));
  // }
  //
  // function handleMouseLeave(nodeID: string) {
  //   setNodeRadii((prevRadii) =>
  //     new Map(prevRadii).set(nodeID, MapStyling.nodeRadius),
  //   );
  //   setNodeColors((prevColors) =>
  //     new Map(prevColors).set(nodeID, MapStyling.nodeColor),
  //   ); // Reset color on mouse leave
  // }
  function handlePointerDown(
    e: React.PointerEvent<SVGCircleElement>,
    nodeID: string,
  ) {
    const el = e.currentTarget;
    const bbox = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - bbox.left;
    const yOffset = e.clientY - bbox.top;

    setDraggablePosition({
      ...draggablePosition,
      x: nodes.get(nodeID)!.xcoord,
      y: nodes.get(nodeID)!.ycoord,
      active: true,
      offset: {
        x: xOffset,
        y: yOffset,
      },
    });
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(
    e: React.PointerEvent<SVGCircleElement>,
    nodeID: string,
  ) {
    const bbox = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    if (draggablePosition.active && selectedAction.toString() == "MoveNode") {
      const updatedNode: Node = nodes.get(nodeID)!;
      updatedNode.xcoord = Math.round(
        updatedNode.xcoord + (x - draggablePosition.offset.x),
      );
      updatedNode.ycoord = Math.round(
        updatedNode.ycoord + (y - draggablePosition.offset.y),
      );
      setNodes(() => (nodes = new Map(nodes.set(nodeID, updatedNode))));
    }
  }

  return (
    //onClick={props.onMapClick}
    <div
      className={`z-0 relative ${selectedAction.toString() == "CreateNode" ? "cursor-copy" : ""} ${selectedAction.toString() == "MoveNode" ? "cursor-move" : ""}`}
    >
      {/*  White Fade */}
      <div
        className={"z-10"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "12%", // Adjust the width of the overlay as needed
          height: "100%",
          background:
            "linear-gradient(to left, rgba(234,234,234,0) 0%, rgba(234,234,234,1) 100%)",
          pointerEvents: "none", // Ensures the overlay doesn't intercept mouse events
        }}
      ></div>
      <div>
        <TransformWrapper
          initialScale={1}
          doubleClick={{ disabled: true }}
          panning={{
            velocityDisabled: true,
            disabled: draggablePosition.active,
          }}
        >
          <div className="absolute bottom-[31%] right-[1.5%] z-10">
            <ZoomControls />
          </div>
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%", paddingLeft: "3%" }}
            contentStyle={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 5000 3400"
              height="100vh"
              onPointerUp={() => {
                setDraggablePosition({ ...draggablePosition, active: false });
              }}
              onClick={props.onMapClick}
            >
              <image href={map} />
              {edgeCoords.map((edge, index) => (
                <line
                  key={index}
                  className="edge"
                  x1={edge.startX}
                  x2={edge.endX}
                  y1={edge.startY}
                  y2={edge.endY}
                  stroke={MapStyling.edgeColor}
                  strokeWidth={MapStyling.edgeWidth}
                />
              ))}
              {Array.from(nodes.values()).map((node) => (
                <circle
                  key={node.nodeID}
                  className={`node ${flickeringNode === node.nodeID ? "flickering" : ""}`}
                  r={MapStyling.nodeRadius}
                  cx={node.xcoord}
                  cy={node.ycoord}
                  onPointerDown={(e) => handlePointerDown(e, node.nodeID)}
                  onPointerMove={(e) => handlePointerMove(e, node.nodeID)}
                  fill={
                    selectedNodeID == node.nodeID
                      ? MapStyling.edgeColor
                      : MapStyling.nodeColor
                  }
                  onClick={(e) => nodeClicked(e, node.nodeID)}
                  style={{ cursor: "pointer" }}
                />
              ))}
              //This is rendering the line between the cursor and startNode
              {props.startEdgeNodeID && (
                <line
                  x1={nodes.get(props.startEdgeNodeID)!.xcoord}
                  y1={nodes.get(props.startEdgeNodeID)!.ycoord}
                  x2={draggablePosition.x}
                  y2={draggablePosition.y}
                  stroke="red"
                  strokeWidth="2"
                />
              )}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default MapEditImage;