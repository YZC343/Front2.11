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

export function SelectSex() {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
      <SelectValue placeholder="Sex" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
