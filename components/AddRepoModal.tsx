"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import axios from "axios";

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
import { BASE_GITHUB_URL } from "@/constant/constant";
import TagForm from "@/components/TagForm";
import { watchRepository } from "@/lib/db/repo";
import { toast } from "@/components/ui/use-toast";

type AddRepositoryModalProps = {
  githubAuthToken: string | undefined;
  discordId: string | undefined;
};

export default function AddRepositoryModal({
  githubAuthToken,
  discordId,
}: AddRepositoryModalProps) {
  const { control, handleSubmit, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [repos, setRepos] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    if (!selectedRepo) {
      toast({
        title: "No repository selected.",
        description: "Please select a repository to watch.",
        variant: "destructive",
      });
      return;
    }

    if (!data.labels || data.labels.length === 0) {
      toast({
        title: "No labels selected.",
        description: "Please enter at least one label.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await watchRepository(data.labels, selectedRepo);
      if (result?.error) {
        toast({
          title: "Something Went Wrong",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: result?.message,
        });
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error starting to watch repository:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedSearch = debounce(async () => {
      if (query) {
        try {
          const response = await axios.get(
            `${BASE_GITHUB_URL}/search/repositories?q=${query}`,
            {
              headers: {
                Authorization: `token ${githubAuthToken}`,
              },
            }
          );
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
    <Credenza open={openModal} onOpenChange={setOpenModal}>
      <CredenzaTrigger asChild>
        <Button disabled={!discordId}>Watch New Repository</Button>
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
                  <PopoverTrigger disabled={loading} asChild>
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
              <TagForm
                disabled={loading}
                control={control}
                setValue={setValue}
                githubAuthToken={githubAuthToken}
                selectedRepo={selectedRepo}
              />
            </div>
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </CredenzaClose>
            <Button disabled={loading} type="submit">
              Start Watching
            </Button>
          </CredenzaFooter>
        </form>
      </CredenzaContent>
    </Credenza>
  );
}
