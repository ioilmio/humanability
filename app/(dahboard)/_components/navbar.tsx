"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Darkmode } from "@/components/darkmode";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterGig } from "./filter-gigs"
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Loading } from "@/components/auth/loading";
import { useQuery } from "convex/react";
import { Heart, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "./tooltip-provider";
import ConnectStripe from "./connect-stripe";

const Navbar = () => {
  const categories = useQuery(api.categories.get);
  const currentUser = useQuery(api.users.getCurrentUser);
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  const router = useRouter();

  if (categories === undefined) {
    return <Loading />;
  }

  const onClickInbox = () => {
    router.push("/inbox");
  };

  return (
    <>
      <Separator />
      <div className="flex items-center gap-x-4 p-5 bg-white text-black">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={25}
            height={25}
            className="w-6 h-6 object-cover rounded-md cursor-pointer md:w-8 md:h-8"
          />
        </Link>
      <div className="lg:hidden flex justify-center mb-2">
      </div>
        <div className="hidden lg:flex lg:flex-1">
          <SearchInput />
        </div>
        <FilterGig categories={categories}/>

        {currentUser && (
          <>
            <TooltipProvider text="Favorites">
              <Button
                asChild
                variant={favorites ? "secondary" : "ghost"}
                size="lg"
                className="p-4"
              >
                <Link
                  href={{
                    pathname: "/",
                    query: favorites ? {} : { favorites: true },
                  }}
                  className="p-0"
                >
                  <Heart className={favorites ? "fill-black" : ""} />
                </Link>
              </Button>
            </TooltipProvider>

            <TooltipProvider text="Inbox">
              <Button onClick={onClickInbox} variant={"ghost"}>
                <MessageCircle />
              </Button>
            </TooltipProvider>

            <Button
              onClick={() =>
                router.push(`/seller/${currentUser.username}/manage-gigs`)
              }
            >
              Switch To Selling
            </Button>
            {!currentUser.stripeAccountSetupComplete && <ConnectStripe />}
            <UserButton />
          </>
        )}
        {!currentUser && (
          <>
            <Button variant="default" asChild>
              <SignUpButton mode="modal" />
            </Button>
            <Button variant="ghost" asChild>
              <SignInButton mode="modal" />
            </Button>
          </>
        )}
        <Darkmode></Darkmode>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
