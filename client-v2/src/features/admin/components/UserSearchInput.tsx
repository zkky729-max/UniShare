interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function UserSearchInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="ابحث بالاسم أو اسم المستخدم أو الكلية..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}