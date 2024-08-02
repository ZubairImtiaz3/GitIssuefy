"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import axios from "axios";

import { Tag, TagInput } from "emblor";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { REPOSITORIES_URL } from "@/constant/constant";

type AddRepositoryModalProps = {
  githubAuthToken: string | undefined;
};

function TagForm({ control, setValue }: any) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => (
        <TagInput
          styleClasses={{
            input: "shadow-none",
            tag: {
              body: "pl-2",
            },
            inlineTagsContainer: "ml-1",
          }}
          {...field}
          placeholder="Enter your labels of interest"
          tags={tags}
          className="sm:min-w-[450px]"
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
          setTags={(newTags) => {
            setTags(newTags);
            setValue("tags", newTags as [Tag, ...Tag[]]);
          }}
          textCase={"lowercase"}
        />
      )}
    />
  );
}

export default function AddRepositoryModal({
  githubAuthToken,
}: AddRepositoryModalProps) {
  const { control, handleSubmit, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [repos, setRepos] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  const onSubmit = (data: any) => {
    console.log("Data", data);
  };

  useEffect(() => {
    const debouncedSearch = debounce(async () => {
      if (query) {
        try {
          const response = await axios.get(`${REPOSITORIES_URL}?q=${query}`, {
            headers: {
              Authorization: `token ${githubAuthToken}`,
            },
          });
          setRepos(response.data.items.map((item: any) => item.full_name));
        } catch (error) {
          console.error("Error fetching repositories:", error);
        }
      } else {
        setRepos([]);
      }
    }, 300);

    debouncedSearch();

    return debouncedSearch.cancel;
  }, [query, repos, githubAuthToken]);

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button>Watch New Repository</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Add New Repository</CredenzaTitle>
          <CredenzaDescription>
            Select a repository and add labels of interest to start watching its
            issues.
          </CredenzaDescription>
        </CredenzaHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CredenzaBody>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="repository" className="text-right">
                  Repository
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {selectedRepo ? (
                        <>{selectedRepo}</>
                      ) : (
                        <>Select a repository</>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        value={query}
                        onValueChange={setQuery}
                        placeholder="Search repository..."
                      />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {repos.map((repo) => (
                            <CommandItem
                              key={repo}
                              value={repo}
                              onSelect={(value) => {
                                setSelectedRepo(value);
                                setOpen(false);
                              }}
                            >
                              {repo}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="Issue Labels" className="text-left">
                  Issue Labels
                </Label>
                <TagForm control={control} setValue={setValue} />
              </div>
            </div>
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button variant="outline">Cancel</Button>
            </CredenzaClose>
            <Button type="submit">Start Watching</Button>
          </CredenzaFooter>
        </form>
      </CredenzaContent>
    </Credenza>
  );
}
