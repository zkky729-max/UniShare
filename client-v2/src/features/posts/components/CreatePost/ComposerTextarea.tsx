import { useEffect, useRef } from "react";

interface ComposerTextareaProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function ComposerTextarea({
  value,
  onChange,
  maxLength = 2000,
}: ComposerTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    const height = Math.min(
      textarea.scrollHeight,
      240
    );

    textarea.style.height = `${height}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > 240
        ? "auto"
        : "hidden";
  }, [value]);

  const progress =
    Math.min(
      (value.length / maxLength) * 100,
      100
    );

  const counterColor =
    value.length >= maxLength
      ? "text-red-600"
      : value.length >= maxLength * 0.9
      ? "text-orange-500"
      : "text-gray-500";

  return (
    <div className="space-y-2">

      <textarea
        ref={textareaRef}
        placeholder="بماذا تفكر؟"
        value={value}
        maxLength={maxLength}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          resize-none
          rounded-xl
          border
          p-4
          focus:ring-2
          focus:ring-blue-500
          transition-all
          duration-200
        "
        style={{
          minHeight: "120px",
          maxHeight: "240px",
        }}
      />

      <div className="flex items-center justify-end gap-2">

        <svg
          width="28"
          height="28"
          viewBox="0 0 36 36"
          className={counterColor}
        >
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="3"
          />

          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${progress} 100`}
            transform="rotate(-90 18 18)"
          />
        </svg>


        <span
          className={`
            text-sm
            font-medium
            transition-colors
            duration-200
            ${counterColor}
          `}
        >
          {value.length} / {maxLength} حرف
        </span>

      </div>

    </div>
  );
}