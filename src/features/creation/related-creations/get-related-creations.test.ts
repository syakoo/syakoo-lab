import type { CreationType } from "@/entities/creation/models/creation";

import { getRelatedCreations } from "./get-related-creations";

describe("getRelatedCreations", () => {
  const baseCreation = {
    id: "1",
    type: "illust" as const,
    tags: ["tag1", "tag2"],
    published: "2024-01-01",
  };

  const creations = [
    baseCreation,
    {
      id: "2",
      type: "illust" as CreationType,
      tags: ["tag1", "tag3"],
      published: "2024-01-02",
    },
    {
      id: "3",
      type: "webapp" as CreationType,
      tags: ["tag1", "tag2"],
      published: "2024-01-03",
    },
    {
      id: "4",
      type: "webapp" as CreationType,
      tags: ["tag4"],
      published: "2024-01-04",
    },
  ];

  test("現在の創作物は除外される", () => {
    const result = getRelatedCreations(baseCreation, creations);

    expect(result).not.toContainEqual(baseCreation);
    expect(result.map((c) => c.id)).not.toContain("1");
  });

  test("関連度の高い順にソートされる", () => {
    const result = getRelatedCreations(baseCreation, creations);

    // id:3 - タグ2つ一致(4点) + タイプ不一致(0点) = 4点
    // id:2 - タグ1つ一致(2点) + タイプ一致(1点) = 3点
    // id:4 - タグ0つ一致(0点) + タイプ不一致(0点) = 0点
    expect(result.map((c) => c.id)).toEqual(["3", "2", "4"]);
  });

  test("関連度が同じ場合は公開日の新しい順にソートされる", () => {
    const sameScoreCreations = [
      {
        id: "2",
        type: "illust" as CreationType,
        tags: ["tag3"],
        published: "2024-01-02",
      },
      {
        id: "3",
        type: "illust" as CreationType,
        tags: ["tag4"],
        published: "2024-01-03",
      },
    ];

    const result = getRelatedCreations(baseCreation, sameScoreCreations);

    // どちらもスコアは1点（タイプ一致のみ）なので、公開日でソート
    expect(result.map((c) => c.id)).toEqual(["3", "2"]);
  });

  test("最大10件まで取得される", () => {
    const manyCreations = Array.from({ length: 15 }, (_, i) => ({
      id: String(i + 2),
      type: "illust" as CreationType,
      tags: ["tag1"],
      published: `2024-01-${String(i + 2).padStart(2, "0")}`,
    }));

    const result = getRelatedCreations(baseCreation, manyCreations);

    expect(result).toHaveLength(10);
  });
});
