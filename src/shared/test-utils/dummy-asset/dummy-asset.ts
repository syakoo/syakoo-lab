import { random } from "../random/random";

/** Local placeholders for stories/mocks (`public/img/dummy/`, `staticDirs`). */
export type DummyImage = {
  src: string;
  width: number;
  height: number;
};

const dummyImage = (width: number, height: number): DummyImage => ({
  src: `/img/dummy/dummy-${width}x${height}.png`,
  width,
  height,
});

export const dummyImages = {
  "50x50": dummyImage(50, 50),
  "100x100": dummyImage(100, 100),
  "200x200": dummyImage(200, 200),
  "300x300": dummyImage(300, 300),
  "600x600": dummyImage(600, 600),
  "150x200": dummyImage(150, 200),
  "400x300": dummyImage(400, 300),
  "300x400": dummyImage(300, 400),
  "800x400": dummyImage(800, 400),
  "400x800": dummyImage(400, 800),
} as const;

const allDummyImages = Object.values(dummyImages);

const squareDummyImages = allDummyImages.filter(
  ({ width, height }) => width === height,
);

/** Local page for iframe embeds. */
export const dummyEmbedSrc = "/assets/dummy/dummy-embed.html";

export const pickDummyImage = (): DummyImage => random.pickOne(allDummyImages);

export const pickSquareDummyImage = (): DummyImage =>
  random.pickOne(squareDummyImages);
