"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaMagnifyingGlass, FaArrowLeft } from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { searchUser } from "@/actions/user";
import Link from "next/link";

const HeaderSearch = () => {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setSearchActive((prev) => !prev)}
        variant={"secondary"}
        size={"icon"}
        className="shrink-0"
      >
        <FaMagnifyingGlass />
      </Button>
      {searchActive && <SearchComponent setSearchActive={setSearchActive} />}
    </div>
  );
};

type searchRes = {
  id: string;
  fullName: string;
  avater: string;
};

export default HeaderSearch;

export const SearchComponent = ({
  setSearchActive,
}: {
  setSearchActive: any;
}) => {
  const [name, setName] = useState("");
  const [nameDebounce] = useDebounce(name, 100);

  const [users, setUsers] = useState<searchRes[]>();

  useEffect(() => {
    const main = async () => {
      if (name.length === 0) {
        setUsers([]);
        return;
      }

      const usersRes = await searchUser({ name });
      if (usersRes.error) {
        setUsers([]);
        return;
      }
      setUsers(usersRes.users);
    };
    main();
    return () => {};
  }, [nameDebounce]);

  return (
    <div className="absolute left-0 top-0 z-30 flex flex-col gap-2 rounded-md border bg-card p-2 shadow-md">
      <div className="flex gap-1">
        <Button
          onClick={() => setSearchActive(false)}
          variant={"ghost"}
          size={"icon"}
          className="shrink-0"
        >
          <FaArrowLeft />
        </Button>
        <Input
          onChange={(e) => setName(e.target.value)}
          className="rounded-full md:min-w-56"
          placeholder="Name...."
        />
      </div>
      <Separator orientation="horizontal" />
      <SearchResults results={users} />
    </div>
  );
};

export const SearchResults = ({ results }: { results?: searchRes[] }) => {
  return (
    <div className="space-y-2">
      {results &&
        results.map((user) => <SearchResult key={user.id} user={user} />)}
    </div>
  );
};

export const SearchResult = ({ user }: { user: searchRes }) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex w-full gap-2 rounded-md p-2 hover:bg-secondary"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background">
        <FaMagnifyingGlass />
      </div>

      <p>{user.fullName}</p>

      <Avatar className="ml-auto rounded-md">
        <AvatarImage src={user.avater} />
      </Avatar>
    </Link>
  );
};
