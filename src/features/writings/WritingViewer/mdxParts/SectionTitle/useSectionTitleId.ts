import { useEffect, useRef, useState } from "react";

export const useSectionTitleId = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [sectionId, setSectionId] = useState("");

  useEffect(() => {
    if (!sectionId && titleRef.current) {
      const sectionTitle = titleRef.current.innerText;
      const id = encodeURI(sectionTitle);

      setSectionId(id);
    }
  }, [sectionId]);

  return { titleRef, sectionId };
};
