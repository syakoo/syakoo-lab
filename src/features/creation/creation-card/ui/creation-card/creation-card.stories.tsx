import type { Meta, StoryFn } from "@storybook/nextjs";

import {
  generateDummyCreationGame,
  generateDummyCreationIllust,
  generateDummyCreationWebapp,
} from "../../../../../entities/creation";

import { CreationCard } from "./creation-card";

const meta = {
  component: CreationCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreationCard>;

export default meta;

// StoryFn (not module-scope args) so generateDummy* runs after PRNG reseed.
export const Illust: StoryFn<typeof CreationCard> = () => {
  const { type, title, illust } = generateDummyCreationIllust();
  return <CreationCard type={type} title={title} illust={illust} />;
};

export const Game: StoryFn<typeof CreationCard> = () => {
  const { type, title, logo } = generateDummyCreationGame();
  return <CreationCard type={type} title={title} logo={logo} />;
};

export const WebApp: StoryFn<typeof CreationCard> = () => {
  const { type, title, logo } = generateDummyCreationWebapp();
  return <CreationCard type={type} title={title} logo={logo} />;
};
