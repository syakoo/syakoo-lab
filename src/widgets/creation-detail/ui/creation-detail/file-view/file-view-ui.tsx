"use client";

import type { FC, PropsWithChildren } from "react";
import { useState } from "react";

import { Icon } from "../../../../../shared/design-system/icons/icon";
import { Text } from "../../../../../shared/design-system/ui/text/text";

type Props = PropsWithChildren<{
  fileName: string;
}>;

export const FileViewUI: FC<Props> = ({ children, fileName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        className="text-text-secondary hover:text-text-primary flex w-full cursor-pointer items-center gap-25 p-50"
        onClick={handleToggle}
        type="button"
      >
        <div
          className={`flex items-center transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        >
          <Icon height={16} name="chevron-right" width={16} />
        </div>
        <Text size="75">{fileName}</Text>
      </button>
      {isOpen ? (
        <div className="rounded-50 border-palette-gray-700 border p-100 break-all whitespace-pre-wrap">
          {children}
        </div>
      ) : null}
    </div>
  );
};
