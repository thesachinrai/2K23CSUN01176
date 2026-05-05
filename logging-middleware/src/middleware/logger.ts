import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type BackendPackage = "cache" | "controller" | "cron_job" | "db" | "domain" | "handler" | "repository" | "route" | "service";
type FrontendPackage = "api" | "component" | "hook" | "page" | "state" | "style";
type CommonPackage = "auth" | "config" | "middleware" | "utils";
type Package = BackendPackage | FrontendPackage | CommonPackage;

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

const LOG_API_URL = process.env.LOG_API_URL!;

export async function Log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void> {
  try {
    const payload: LogPayload = {
      stack,
      level,
      package: pkg,
      message,
    };
    
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    console.log("LOG RESPONSE:", data);
  } catch (error) {
    console.error("LOGGER ERROR:", error);
  }
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  Log("backend", "info", "middleware", `${req.method} ${req.originalUrl} route accessed`).catch(console.error);
  next();
};