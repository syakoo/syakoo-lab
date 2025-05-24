export type AsyncStateIdle = {
  status: "idle";
  error?: undefined;
  data?: undefined;
};
export type AsyncStateLoading<Data> = {
  status: "loading";
  error?: unknown;
  data?: Data;
};
export type AsyncStateSuccess<Data> = {
  status: "success";
  error?: undefined;
  data: Data;
};
export type AsyncStateError = {
  status: "error";
  error: unknown;
  data?: undefined;
};
