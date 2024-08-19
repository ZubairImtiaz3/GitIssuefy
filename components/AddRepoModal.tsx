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
import { watchRepository, updateRepositoryLabels } from "@/lib/db/repo";
import { toast } from "@/components/ui/use-toast";
import { WatchedRepo } from "@/components/tables/repository-table/watch-repo-table";

type AddRepositoryModalProps = {
  githubAuthToken?: string | undefined;
  guildStatus?: boolean;
  repoData?: WatchedRepo;
  propTrigger?: boolean;
  setPropTrigger?: (value: boolean) => void;
};

export default function AddRepositoryModal({
  githubAuthToken,
  guildStatus,
  repoData,
  propTrigger,
  setPropTrigger,
}: AddRepositoryModalProps) {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(propTrigger || false);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(
    repoData ? repoData.watched_repo : null
  );
  const [repos, setRepos] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasLabels, setHasLabels] = useState(false);

  const labels = watch("labels");

  const onSubmit = async (data: any) => {
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
      const [owner, repo] = selectedRepo!.split("/");

      // Check if labels exists in repository
      const isValidLabel = async (labelText: string) => {
        try {
          await axios.get(
            `${BASE_GITHUB_URL}/repos/${owner}/${repo}/labels/${encodeURIComponent(
              labelText
            )}`,
            {
              headers: {
                Authorization: `token ${githubAuthToken}`,
              },
            }
          );
          return true;
        } catch {
          return false;
        }
      };

      // Validate each label using its text property
      const invalidLabels: string[] = [];
      const uniqueLabels = new Set();

      for (const label of data.labels) {
        const labelTexts = label.text
          .split(",")
          .map((text: string) => text.trim());

        for (const labelText of labelTexts) {
          if (!uniqueLabels.has(labelText)) {
            uniqueLabels.add(labelText);
            const valid = await isValidLabel(labelText);
            if (!valid) {
              invalidLabels.push(labelText);
            }
          }
        }
      }

      if (invalidLabels.length > 0) {
        toast({
          title: "Invalid Labels",
          description: `The following labels are not available: ${invalidLabels.join(
            ", "
          )} in ${selectedRepo}`,
          variant: "destructive",
        });
        return;
      }

      const result = repoData
        ? await updateRepositoryLabels(repoData.$id, data.labels)
        : await watchRepository(data.labels, selectedRepo!);

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
        if (setPropTrigger) {
          setPropTrigger(false);
        }
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
  }, [query, githubAuthToken, selectedRepo]);

  useEffect(() => {
    // Set hasLabels to true if there are labels present, false otherwise
    setHasLabels(labels && labels.length > 0);
  }, [labels]);

  return (
    <Credenza
      open={repoData ? propTrigger : openModal}
      onOpenChange={(open) => {
        setOpenModal(open);
        if (setPropTrigger) {
          setPropTrigger(open);
        }
      }}
    >
      {!repoData && (
        <CredenzaTrigger asChild>
          <Button disabled={!guildStatus}>Watch New Repository</Button>
        </CredenzaTrigger>
      )}

      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            {repoData ? "Update Repository" : "Add New Repository"}
          </CredenzaTitle>
          <CredenzaDescription>
            {repoData
              ? "Update the repository labels."
              : "Select a repository and add labels of interest to start watching its issues."}
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
                    <Button
                      disabled={!!repoData}
                      variant="outline"
                      className="w-full justify-start"
                    >
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
                selectedRepo={selectedRepo}
                initialTags={repoData?.labels.map((label, index) => ({
                  id: index.toString(),
                  text: label,
                }))}
              />
            </div>
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </CredenzaClose>
            <Button disabled={loading || !hasLabels} type="submit">
              {repoData ? "Update" : "Start Watching"}
            </Button>
          </CredenzaFooter>
        </form>
      </CredenzaContent>
    </Credenza>
  );
}
