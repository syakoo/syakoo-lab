export class JSDOM {
  public window: {
    document: {
      body: {
        textContent: string;
      };
      getElementsByTagName: (tagName: string) => {
        getAttribute: (name: string) => string | null;
      }[];
    };
  };

  constructor() {
    // Mock DOM elements
    const mockElement = {
      getAttribute: (name: string) => {
        if (name === "property" || name === "name") return "og:title";
        if (name === "content") return "Mock Title";
        if (name === "rel") return "icon";
        if (name === "href") return "https://example.com/favicon.ico";
        return null;
      },
    };

    const mockMetaElements = [mockElement];
    const mockLinkElements = [mockElement];

    const mockDocument = {
      body: {
        textContent: "Mock Text Content",
      },
      getElementsByTagName: (tagName: string) => {
        if (tagName === "meta") return mockMetaElements;
        if (tagName === "link") return mockLinkElements;
        return [];
      },
    };

    this.window = {
      document: mockDocument,
    };
  }
}
