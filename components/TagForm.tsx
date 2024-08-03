import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import axios from "axios";
import { BASE_GITHUB_URL } from "@/constant/constant";
import { Tag, TagInput } from "emblor";
import { Label } from "@/components/ui/label";

type TagFormProps = {
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  selectedRepo: string | null;
  githubAuthToken: string | undefined;
};

function TagForm({
  control,
  setValue,
  selectedRepo,
  githubAuthToken,
}: TagFormProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const handleTagAdd = async (newTagName: string) => {
    if (!selectedRepo) return;

    try {
      const [owner, repo] = selectedRepo.split("/");
      await axios.get(
        `${BASE_GITHUB_URL}/repos/${owner}/${repo}/labels/${newTagName}`,
        {
          headers: {
            Authorization: `token ${githubAuthToken}`,
          },
        }
      );
      // Tag exists, Do Nothing
    } catch (error) {
      // Remove  Invalid Tag
      setTags((prevTags) => prevTags.filter((tag) => tag.text !== newTagName)); //Todo: Notify User & FIx Duplicate Incorrect In Submission
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Label htmlFor="Issue Labels" className="text-left">
          Issue Labels
        </Label>

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
              placeholder="Enter your labels of interest"
              tags={tags}
              setTags={(newTags) => {
                setTags(newTags);
                field.onChange(newTags);
                setValue("labels", newTags as [Tag, ...Tag[]]);
              }}
              className="sm:min-w-[450px]"
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
              onTagAdd={handleTagAdd}
              textCase={"lowercase"}
              disabled={!selectedRepo}
              {...field}
            />
          )}
        />
      </div>
    </>
  );
}

export default TagForm;
