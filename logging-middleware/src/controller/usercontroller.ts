import { Request, Response } from "express";
import { Log } from "../middleware/logger";
import { createUserService } from "../services/userservice";
import {
  successResponse,
  errorResponse,
} from "../utils/response";

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {

    await Log(
      "backend",
      "info",
      "controller",
      "Create User API called"
    );

    const { name, email } = req.body;

    if (!name || !email) {

      await Log(
        "backend",
        "warn",
        "handler",
        "Validation failed: name or email missing"
      );

      return res.status(400).json(
        errorResponse("Name and Email are required")
      );
    }

    const user = await createUserService({
      name,
      email,
    });

    await Log(
      "backend",
      "info",
      "service",
      `User created successfully with id ${user.id}`
    );

    return res.status(201).json(
      successResponse(user, "User created successfully")
    );

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Create User API failed"
    );

    return res.status(500).json(
      errorResponse("Internal Server Error")
    );
  }
};