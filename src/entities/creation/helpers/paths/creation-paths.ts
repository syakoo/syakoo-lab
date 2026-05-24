const creationBase = "/creations";

export const creationPaths = {
  list: () => `${creationBase}` as const,
  detail: (id: string) => `${creationBase}/${id}` as const,
};
