"use client";

import { useRouter } from "waku";

export const usePathname = (): string => useRouter().path;

export const useSearchParams = (): URLSearchParams =>
  new URLSearchParams(useRouter().query);
