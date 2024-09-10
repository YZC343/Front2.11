import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectBMI() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="BMI" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Underweight">Underweight(&lt;18)</SelectItem>
          <SelectItem value="Normal">Normal(18-24.9)</SelectItem>
          <SelectItem value="Overweight">Overweight(25-29.9)</SelectItem>
          <SelectItem value="Obesity">Obesity(&gt;30)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
