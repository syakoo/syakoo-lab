/**
 * mermaid のよくある記法を評価できるように変更する関数
 */
export const markupMermaid = async (mdText: string) => {
  const pattern = /```mermaid\n([\s\S]*?)\n```/g;

  return mdText.replace(pattern, '<pre className="mermaid">{`$1`}</pre>');
};
