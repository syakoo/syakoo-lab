import * as nextNavigation from "next/navigation";

jest.mock("next/navigation");
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
  (nextNavigation.useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
  }));
  (nextNavigation.useSearchParams as jest.Mock).mockImplementation(
    () => new URLSearchParams(),
  );
  (nextNavigation.usePathname as jest.Mock).mockImplementation(
    () => "localhost:3000",
  );

  return {
    useRouter: nextNavigation.useRouter as jest.Mock,
    useSearchParams: nextNavigation.useSearchParams as jest.Mock,
    usePathname: nextNavigation.usePathname as jest.Mock,
  };
};
