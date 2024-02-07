"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId"); 

  useEffect(() => {
    
    console.log({debouncedValue})

 
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            title: debouncedValue,
          },
        },
        { skipEmptyString: true, skipNull: this }
      );
      router.push(url);
  }, [debouncedValue, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate"
        placeholder="Search for a course"
      />
    </div>
  );
};