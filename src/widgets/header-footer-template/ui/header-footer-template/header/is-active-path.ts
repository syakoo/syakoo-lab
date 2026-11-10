/**
 * ナビゲーションの href が現在のパスに該当するか
 *
 * Waku のルーターは path の末尾スラッシュを落とすため、href 側もそろえて比較する
 */
export const isActivePath = (
  pathname: string,
  href: string,
  exact: boolean,
): boolean => {
  const target = href.length > 1 ? href.replace(/\/$/, "") : href;
  if (exact || target === "/") {
    return pathname === target;
  }
  return pathname === target || pathname.startsWith(`${target}/`);
};
