import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ label, error, className, ...inputProps }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Input {...inputProps} />
      {error && <p className="text-sm text-accent-500">{error}</p>}
    </div>
  );
};

export default FormField;