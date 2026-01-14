import type { StoryFn, Meta, StoryObj } from "@storybook/nextjs";

import { Figure } from "@/features/writings/writing-detail/mdx/figure/figure-with-caption";

import {
  Geometry,
  GCircle,
  GLine,
  GPlane,
  GPoint,
  GText,
} from "./geometry-exports";

const meta = {
  component: Geometry,
  args: {
    domain: {
      x: [0, 500],
      y: [0, 300],
    },
  },
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Geometry>;

export default meta;

type Story = StoryObj<typeof Geometry>;

export const Points: Story = {
  args: {
    children: (
      <>
        <GPoint x={10} y={10} />
        <GPoint r={5} x={30} y={10} />
        <GPoint r={6} x={52} y={10} />
        <GPoint r={7} x={76} y={10} />
        <GPoint r={8} x={102} y={10} />
        <GPoint r={9} x={130} y={10} />
        <GPoint r={10} x={162} y={10} />
        <GPoint color="primary" id="p1" x={10} y={50} />
        <GPoint color="secondary" r={5} x={30} y={50} />
        <GPoint color="info" r={6} x={52} y={50} />
        <GPoint color="success" r={7} x={76} y={50} />
        <GPoint color="error" r={8} x={102} y={50} />
        <GPoint color="textSecondary" r={9} x={130} y={50} />
        <GPoint color="textTertiary" r={10} x={162} y={50} />
      </>
    ),
  },
};

export const Lines: Story = {
  args: {
    children: (
      <>
        <GLine
          points={[
            [10, 10],
            [90, 10],
          ]}
        />
        <GLine
          points={[
            [10, 30],
            [90, 30],
          ]}
          strokeWidth={2}
        />
        <GLine
          points={[
            [10, 50],
            [90, 50],
          ]}
          strokeWidth={4}
        />
        <GLine
          points={[
            [10, 70],
            [90, 70],
          ]}
          strokeWidth={6}
        />
        <GLine
          points={[
            [10, 90],
            [90, 90],
          ]}
          strokeWidth={8}
        />

        <GLine
          color="primary"
          points={[
            [110, 10],
            [190, 10],
          ]}
        />
        <GLine
          color="secondary"
          points={[
            [110, 30],
            [190, 30],
          ]}
        />
        <GLine
          color="info"
          points={[
            [110, 50],
            [190, 50],
          ]}
        />
        <GLine
          color="success"
          points={[
            [110, 70],
            [190, 70],
          ]}
        />
        <GLine
          color="error"
          points={[
            [110, 90],
            [190, 90],
          ]}
        />
        <GLine points={["p1", "p2"]} />
        <GLine extend={[-10, 10]} points={["p2", "p3"]} />
        <GLine extend={20} points={["p3", "p1"]} />
        <GPoint color="primary" id="p1" x={330} y={50} />
        <GPoint color="primary" id="p2" x={360} y={100} />
        <GPoint color="primary" id="p3" x={300} y={100} />
      </>
    ),
  },
};

export const Planes: Story = {
  args: {
    children: (
      <>
        <GPlane
          color="primary"
          opacity={0.5}
          points={[
            [10, 10],
            [200, 10],
            [250, 100],
            [50, 100],
          ]}
        />
        <GPlane color="secondary" opacity={0.5} points={["p1", "p2", "p3"]} />
        <GPlane color="secondary" opacity={0.5} points={["p1", "p2", "p3"]} />
        <GPoint color="primary" id="p1" x={330} y={50} />
        <GPoint color="primary" id="p2" x={360} y={100} />
        <GPoint color="primary" id="p3" x={300} y={100} />
      </>
    ),
  },
};

export const Circles: Story = {
  args: {
    children: (
      <>
        <GCircle r={45} x={50} y={50} />
        <GCircle r={45} width={4} x={150} y={50} />
        <GCircle r={45} width={6} x={250} y={50} />
        <GCircle color="primary" r={45} x={50} y={150} />
        <GCircle color="secondary" r={45} x={150} y={150} />
        <GCircle color="info" r={45} x={250} y={150} />
        <GCircle points={["p1", "p2", "p3"]} />
        <GCircle color="success" points={["p1", "p3", "p4"]} />
        <GPoint color="primary" id="p1" x={380} y={50} />
        <GPoint color="primary" id="p2" x={410} y={100} />
        <GPoint color="primary" id="p3" x={350} y={100} />
        <GPoint color="primary" id="p4" x={360} y={130} />
      </>
    ),
  },
};

export const Texts: Story = {
  args: {
    children: (
      <>
        <GText width={300} x={0} y={0}>
          こいつの正体は,
          <code>foreignObject</code>
        </GText>
        <GText x={20} y={100}>
          (20, 100)
        </GText>
        <GText color="primary" x={50} y={50}>
          (50, 50)
        </GText>
      </>
    ),
  },
};

export const FanoPlane: StoryFn = () => {
  return (
    <Figure>
      <Geometry domain={{ x: [0, 500], y: [0, 300] }}>
        <GLine points={["p1", "p2"]} />
        <GLine points={["p2", "p3"]} />
        <GLine points={["p3", "p1"]} />
        <GLine points={["p1", "p5"]} />
        <GLine points={["p2", "p6"]} />
        <GLine points={["p3", "p7"]} />
        <GCircle points={["p5", "p6", "p7"]} />
        <GPoint id="p1" r={10} x={250} y={10} />
        <GPoint id="p2" r={10} x={100} y={290} />
        <GPoint id="p3" r={10} x={400} y={290} />
        <GPoint id="p4" r={10} x={250} y={200} />
        <GPoint id="p5" r={10} x={250} y={290} />
        <GPoint id="p6" r={10} x={326} y={155} />
        <GPoint id="p7" r={10} x={174} y={155} />
      </Geometry>
      <Figure.Caption>Fano Plane</Figure.Caption>
    </Figure>
  );
};
