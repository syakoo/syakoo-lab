import * as nextNavigation from "next/navigation";
import type { Mock } from "vitest";
import { vi } from "vitest";

vi.mock("next/navigation");
/**
 * `next/navigation` のモック化関数
 *
 * @example
 * ```ts
 * const mockedNavigation = mockNextNavigation()
 * mockedNavigation.useSearchParams.mockImplementation(
 *   () => new URLSearchParams('x=y'),
 * );
 * ```
 */
export const mockNextNavigation = () => {
  // 必要になり次第更新する
  (nextNavigation.useRouter as Mock).mockImplementation(() => ({
    push: vi.fn(),
  }));
  (nextNavigation.useSearchParams as Mock).mockImplementation(
    () => new URLSearchParams(),
  );
  (nextNavigation.usePathname as Mock).mockImplementation(
    () => "localhost:3000",
  );

  return {
    useRouter: nextNavigation.useRouter as Mock,
    useSearchParams: nextNavigation.useSearchParams as Mock,
    usePathname: nextNavigation.usePathname as Mock,
  };
};
