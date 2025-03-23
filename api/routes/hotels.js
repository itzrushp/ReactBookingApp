import express from "express";
import Hotel from "../models/Hotels.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/find/:id", verifyAdmin, deleteHotel);

// STATIC ROUTES - more specific routes come first!
router.get("/countByCity", countByCity);
router.get("/countByType",countByType); // (assuming countByType handler is correct)
router.get("/room/:id",getHotelRooms); // (assuming countByType handler is correct)

// GET ALL HOTELS
router.get("/", getHotels);

// GET HOTEL BY ID - always last
router.get("/:id", getHotel);

export default router;
