import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express from "express";

import { withAPIBasePath } from "@/api/_shared/config";
import { defaultHandlers as favArtsDefaultHandlers } from "@/api/fav/arts/_mocks/msw";

export const defaultHandlers = [...favArtsDefaultHandlers];

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

  const { port } = new URL(withAPIBasePath(""));
  app.listen(port);
};
