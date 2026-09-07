"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  INQUIRY_REASONS,
  REASON_LABELS,
  emptyInquiryForm,
  inquiryFormSchema,
  toInquiryPayload,
  type InquiryFormValues,
  type InquiryReason,
} from "@/lib/inquiry-schema";
import { FormSuccess } from "./form-success";
import { VenueFields } from "./venue-fields";

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({
  defaultReason = "general",
}: {
  defaultReason?: InquiryReason;
}) {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: emptyInquiryForm(defaultReason),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const reason = useWatch({ control, name: "reason" });
  const isSubmitting = status === "submitting";

  async function onSubmit(values: InquiryFormValues) {
    setStatus("submitting");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toInquiryPayload(values)),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      const result: { ok?: boolean } = await response.json();
      if (!result.ok) throw new Error("Request rejected");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <FormSuccess
        onReset={() => {
          reset(emptyInquiryForm(defaultReason));
          setStatus("idle");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Controller
        control={control}
        name="reason"
        render={({ field }) => (
          <Field className="sm:max-w-xs">
            <FieldLabel htmlFor="reason">What&apos;s this about?</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="reason">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INQUIRY_REASONS.map((value) => (
                  <SelectItem key={value} value={value}>
                    {REASON_LABELS[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Your name</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <FieldError id="email-error" errors={[errors.email]} />
        </Field>
      </div>

      <Field className="sm:max-w-xs" data-invalid={!!errors.phone}>
        <FieldLabel htmlFor="phone">
          Phone <span className="font-normal text-muted">(optional)</span>
        </FieldLabel>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          {...register("phone")}
        />
        <FieldError id="phone-error" errors={[errors.phone]} />
      </Field>

      {reason === "venue" && <VenueFields form={form} />}

      <Field data-invalid={!!errors.message}>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error" errors={[errors.message]} />
      </Field>

      {/*
        Honeypot. Hidden from people and taken out of the tab order; anything
        that fills it in is a bot, and the API drops the submission silently.
      */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/40 p-4 text-sm text-destructive"
        >
          <TriangleAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          <p>
            That didn&apos;t go through. Please try again — if it keeps failing,
            email us directly.
          </p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
