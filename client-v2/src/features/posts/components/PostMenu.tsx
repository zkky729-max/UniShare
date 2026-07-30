import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostMenu({
  onEdit,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });


  function toggleMenu(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const menuWidth = 208;

    let left = rect.right - menuWidth;

    // منع خروج القائمة خارج الشاشة
    if (left < 10) {
      left = 10;
    }

    if (left + menuWidth > window.innerWidth) {
      left = window.innerWidth - menuWidth - 10;
    }

    setPosition({
      top: rect.bottom + 8,
      left,
    });

    setOpen((prev) => !prev);
  }


  return (
    <>
      <button
        onClick={toggleMenu}
        className="rounded-full p-2 transition hover:bg-gray-100"
      >
        <MoreHorizontal size={18} />
      </button>


      {open &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
            }}
            className="
              z-[99999]
              w-52
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-2xl
            "
          >

            <button
              onClick={() => {
                setOpen(false);
                onEdit?.();
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-left
                hover:bg-gray-100
              "
            >
              <Pencil size={18} />
              Edit Post
            </button>


            <button
              onClick={() => {
                setOpen(false);
                onDelete?.();
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-left
                text-red-600
                hover:bg-red-50
              "
            >
              <Trash2 size={18} />
              Delete Post
            </button>

          </div>,
          document.body
        )}
    </>
  );
}