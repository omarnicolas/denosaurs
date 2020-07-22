import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getDenosaurs,
  getDenosaur,
  addDenosaur,
  updateDenosaur,
  deleteDenosaur,
} from "./controllers/denosaurs.ts";

const router = new Router();

router.get("/api/v1/denosaurs", getDenosaurs)
  .get("/api/v1/denosaurs/:id", getDenosaur)
  .post("/api/v1/denosaurs", addDenosaur)
  .put("/api/v1/denosaurs/:id", updateDenosaur)
  .delete("/api/v1/denosaurs/:id", deleteDenosaur);

export default router;
