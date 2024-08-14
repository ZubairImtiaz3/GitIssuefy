import React, { useState, useEffect } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import { Tag, TagInput } from "emblor";
import { Label } from "@/components/ui/label";

type TagFormProps = {
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  selectedRepo: string | null;
  disabled: boolean;
  initialTags?: Tag[];
};

function TagForm({
  control,
  setValue,
  selectedRepo,
  disabled,
  initialTags = [],
}: TagFormProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

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
              textCase={"lowercase"}
              disabled={!selectedRepo || disabled}
              {...field}
            />
          )}
        />
      </div>
    </>
  );
}

export default TagForm;
