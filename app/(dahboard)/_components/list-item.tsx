import { Doc } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { Button } from "@/components/ui/button";

interface ListItemProps {
  title: string;
  subcategory: Doc<"subcategories">;
}

export const ListItem = ({ title, subcategory }: ListItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          filter: subcategory.name,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  return (
    <>
      <Button className="py-2 mx-1" onClick={handleClick}>
        {title}
      </Button>
    </>
  );
};
