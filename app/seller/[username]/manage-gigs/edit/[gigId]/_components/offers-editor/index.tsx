import { Id } from "@/convex/_generated/dataModel";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Tabs from '@radix-ui/react-tabs';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Clipboard, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ContentEditor } from "./content-editor";
import { useQuery } from "convex/react";


interface OffersEditorProps {
  gigId: Id<"gigs">;
}

export const OffersEditor = ({ gigId }: OffersEditorProps) => {

  const offers = useQuery(api.offers.get, { gigId: gigId });

  if (offers === undefined) return <div>Loading offers...</div>;

  const basicOffer = offers.find((offer) => offer.tier === "Basic");
  const standardOffer = offers.find((offer) => offer.tier === "Standard");
  const premiumOffer = offers.find((offer) => offer.tier === "Premium");
  return (
    <Tabs.Root defaultValue="Basic" className="w-1/2">
      <Tabs.List className="flex h-10 items-center justify-between rounded-md bg-muted p-1 text-muted-foreground">
        <Tabs.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-[10%] py-1.5 text-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary  data-[state=active]:text-white data-[state=inactive]:text-black data-[state=active]:shadow-sm" value="Basic" >Basic</Tabs.Trigger>
        <Tabs.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-[10%] py-1.5 text-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary  data-[state=active]:text-white data-[state=inactive]:text-black data-[state=active]:shadow-sm" value="Standard">Standard</Tabs.Trigger>
        <Tabs.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-[10%] py-1.5 text-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary  data-[state=active]:text-white data-[state=inactive]:text-black data-[state=active]:shadow-sm" value="Premium">Premium</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Basic">
        <ContentEditor gigId={gigId} offer={basicOffer} tier="Basic" />
      </Tabs.Content>
      <Tabs.Content value="Standard">
        <ContentEditor gigId={gigId} offer={standardOffer} tier="Standard" />
      </Tabs.Content>
      <Tabs.Content value="Premium">
        <ContentEditor gigId={gigId} offer={premiumOffer} tier="Premium" />
      </Tabs.Content>
    </Tabs.Root>
  );
};
