/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

import { ListItem } from "./list-item";
// import { Filter } from "lucide-react";
// import { TooltipProvider } from "./tooltip-provider";
type FilterGigsProps = {
  name: string;
  subcategories?: any[];
};

type Subcategory = {
  name: string;
};

export const FilterGig = ({
  categories,
}: {
  categories: FilterGigsProps[];
}) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter");

  const clearFilters = () => {
    router.push("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-dvh rounded-lg">
        <ScrollArea className="max-h-dvh">
          <DialogHeader className="sticky top-0 bg-black/80 p-10 mb-4 rounded-lg">
            <DialogTitle>Filter Categories</DialogTitle>
            <DialogDescription>
              Select the category you want to explore
            </DialogDescription>
            <DialogClose>
              <Button
                onClick={clearFilters}
                variant="ghost"
                className="mb-2"
                disabled={!filter}
              >
                Clear filters
              </Button>
            </DialogClose>
          </DialogHeader>
          {categories.map((category: FilterGigsProps, index: React.Key | null | undefined) => {
              return (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg text-black font-semibold mb-4">
                    {category.name}
                  </h3>
                  {getGroupedSubcategories(category.subcategories)}
                </div>
              );
            }
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

function getGroupedSubcategories(subcategories: Subcategory[] | any) {
  const groupedSubcategories = subcategories.reduce((acc: { [x: string]: any[]; }, subcategory: any) => {
    const key = getCategoryKey(subcategory);
    if (!acc[key]) acc[key] = [];
    acc[key].push(subcategory);
    return acc;
  }, {});

  return Object.keys(groupedSubcategories).map(
    (key: string, index: React.Key | null | undefined) => (
      <div key={index} className="space-y-1">
        {groupedSubcategories[key].map(
          (subcategory: any, subIndex: React.Key | null | undefined) => (
            <ListItem
              key={subIndex}
              title={subcategory.name}
              subcategory={subcategory}
            />
          )
        )}
      </div>
    )
  );
}

function getCategoryKey(subcategory: any) {
  // to have subcategories spaced in the modal used in reducer function
  return subcategory.location || "default";
}
