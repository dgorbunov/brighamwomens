import express, { Router } from "express";
const router: Router = express.Router();
import { getEdgesFromDB, getNodesFromDB } from "../../fileInput/file.ts";
//const prisma = new PrismaClient();

// Handles incoming map data files
router.post("/", async (req, res) => {
  const nodeString = await getNodesFromDB(); //get nodes string from db
  const edgeString = await getEdgesFromDB(); //get edges string from db
  const sendToFrontEnd: string[] = [edgeString, nodeString]; //send as 2d string array
  res.send(sendToFrontEnd);
});

export default router;