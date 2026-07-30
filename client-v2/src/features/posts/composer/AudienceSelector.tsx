import type { AudienceType } from "../types/post";


interface AudienceSelectorProps {
  value: AudienceType;

  onChange: (
    value: AudienceType
  ) => void;
}



export default function AudienceSelector({
  value,
  onChange,
}: AudienceSelectorProps) {


  return (
    <div className="space-y-2">

      <label
        className="
          text-sm
          font-semibold
          text-gray-700
        "
      >
        من يستطيع رؤية المنشور؟
      </label>


      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value as AudienceType
          )
        }
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          p-3
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      >

        <option value="public">
          🌍 الجميع
        </option>


        <option value="faculty">
          🏛 الكلية
        </option>


        <option value="specialty">
          📚 التخصص
        </option>


        <option value="level">
          🎓 المستوى
        </option>


        <option value="module">
          📖 المقياس
        </option>

      </select>

    </div>
  );
}