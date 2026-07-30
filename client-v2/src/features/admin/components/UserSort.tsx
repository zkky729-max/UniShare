import type { UserSort } from "../types/admin";


interface Props {
  value: UserSort;

  onChange: (
    value: UserSort
  ) => void;
}


const sortOptions: Array<{
  value: UserSort;
  label: string;
}> = [
  {
    value: "newest",
    label: "الأحدث تسجيلًا",
  },
  {
    value: "oldest",
    label: "الأقدم تسجيلًا",
  },
  {
    value: "name",
    label: "الاسم",
  },
  {
    value: "role",
    label: "الدور",
  },
];


export default function UserSort({
  value,
  onChange,
}: Props) {

  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value as UserSort
        )
      }
      className="
        rounded-xl
        border
        bg-white
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >

      {sortOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}

    </select>
  );
}