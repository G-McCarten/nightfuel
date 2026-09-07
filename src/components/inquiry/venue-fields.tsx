"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PREFERRED_MODELS,
  PREFERRED_MODEL_LABELS,
  ROLES,
  ROLE_LABELS,
  VENUE_TYPES,
  VENUE_TYPE_LABELS,
  type InquiryFormValues,
} from "@/lib/inquiry-schema";

/** Only rendered when the reason is "venue"; the fields stay registered either way. */
export function VenueFields({
  form,
}: {
  form: UseFormReturn<InquiryFormValues>;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <FieldSet className="gap-5 rounded-xl border border-hairline p-5">
      <FieldLegend className="text-base">About your venue</FieldLegend>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={!!errors.venueName}>
          <FieldLabel htmlFor="venueName">Venue name</FieldLabel>
          <Input
            id="venueName"
            aria-invalid={!!errors.venueName}
            aria-describedby={errors.venueName ? "venueName-error" : undefined}
            {...register("venueName")}
          />
          <FieldError id="venueName-error" errors={[errors.venueName]} />
        </Field>

        <Field data-invalid={!!errors.city}>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input
            id="city"
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            {...register("city")}
          />
          <FieldError id="city-error" errors={[errors.city]} />
        </Field>

        <Controller
          control={control}
          name="venueType"
          render={({ field }) => (
            <Field data-invalid={!!errors.venueType}>
              <FieldLabel htmlFor="venueType">Venue type</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="venueType"
                  aria-invalid={!!errors.venueType}
                  aria-describedby={
                    errors.venueType ? "venueType-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  {VENUE_TYPES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {VENUE_TYPE_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="venueType-error" errors={[errors.venueType]} />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Field data-invalid={!!errors.role}>
              <FieldLabel htmlFor="role">Your role</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="role"
                  aria-invalid={!!errors.role}
                  aria-describedby={errors.role ? "role-error" : undefined}
                >
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {ROLE_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="role-error" errors={[errors.role]} />
            </Field>
          )}
        />
      </div>

      <Controller
        control={control}
        name="preferredModel"
        render={({ field }) => (
          <FieldSet
            data-invalid={!!errors.preferredModel}
            aria-describedby={
              errors.preferredModel ? "preferredModel-error" : undefined
            }
          >
            <FieldLegend variant="label">
              Which model interests you?
            </FieldLegend>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="gap-3"
            >
              {PREFERRED_MODELS.map((value) => (
                <div key={value} className="flex items-center gap-2">
                  <RadioGroupItem value={value} id={`model-${value}`} />
                  <FieldLabel
                    htmlFor={`model-${value}`}
                    className="font-normal"
                  >
                    {PREFERRED_MODEL_LABELS[value]}
                  </FieldLabel>
                </div>
              ))}
            </RadioGroup>
            <FieldError
              id="preferredModel-error"
              errors={[errors.preferredModel]}
            />
          </FieldSet>
        )}
      />
    </FieldSet>
  );
}
