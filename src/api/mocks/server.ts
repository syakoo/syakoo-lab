import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express from "express";

import { supabaseUrl } from "@/api/supabase/_shared/config";

import { defaultHandlers } from "./msw";

/**
 * ローカル環境用のモックサーバー起動関数
 */
export const runServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(createMiddleware(...defaultHandlers));
  app.use((_req, res) => {
    res.status(404).json({
      error: "Mock not found",
    });
  });

  const { port } = new URL(supabaseUrl);
  app.listen(port);
};
