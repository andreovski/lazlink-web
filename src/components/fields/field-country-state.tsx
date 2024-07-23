import { useFormContext } from "react-hook-form";

import { statesOfBrazil } from "@/utils/states";

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function FieldCountryState({ name = "state" }: { name?: string }) {
  const form = useFormContext();

  if (!form) {
    throw new Error("FieldCountryState need to be used with FormProvider");
  }

  const defaultValue = form.watch(name);

  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-sm font-medium">
        Estado
      </Label>
      <Select
        defaultValue={defaultValue}
        onValueChange={(e) => form.setValue(name, e)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione um estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statesOfBrazil.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
