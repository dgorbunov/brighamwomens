import express, { Router } from "express";
const router: Router = express.Router();
import { PrismaClient } from "database";
const prisma = new PrismaClient();
import { Node } from "database";

router.post("/", async (req, res) => {
  const nodes: Node[] = req.body.nodes;
  try {
    for (let i = 0; i < nodes.length; i++) {
      const numEdges = await prisma.edge.findMany({
        where: {
          OR: [
            { startNodeID: nodes[i].nodeID },
            { endNodeID: nodes[i].nodeID },
          ],
        },
      });
      if (numEdges.length != 0) {
        await prisma.edge.deleteMany({
          where: {
            OR: [
              { startNodeID: nodes[i].nodeID },
              { endNodeID: nodes[i].nodeID },
            ],
          },
        });
      }
      const findNode = await prisma.node.findMany({
        where: {
          nodeID: nodes[i].nodeID,
        },
      });
      if (findNode.length != 0) {
        await prisma.node.delete({
          where: {
            nodeID: nodes[i].nodeID,
          },
        });
      }
    }
    res.json({
      message: "Node has been deleted!",
    });
  } catch (error) {
    console.error("Error deleting node! ", error);
    res.status(400).json({ message: "Error deleting node!" });
  }
});
export default router;