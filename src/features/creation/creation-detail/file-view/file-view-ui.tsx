"use client";

import type { FC, PropsWithChildren } from "react";
import { useState } from "react";

import { Icon } from "@/shared/design-system/icons/icon";
import { Text } from "@/shared/design-system/ui/text/text";

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
        className="flex w-full cursor-pointer items-center gap-25 p-50 text-text-secondary hover:text-text-primary"
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
        <div className="whitespace-pre-wrap break-all rounded-50 border border-palette-gray-200 p-100">
          {children}
        </div>
      ) : null}
    </div>
  );
};
