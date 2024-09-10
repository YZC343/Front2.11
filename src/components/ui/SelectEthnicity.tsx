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

export function Ethnicity() {
  return (
    <Select >
      <SelectTrigger style={{width:180}} className="w-[180px]">
        <SelectValue placeholder="Ethnicity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>White</SelectLabel>
          <SelectItem value="White British">White British</SelectItem>
          <SelectItem value="White Irish">White Irish</SelectItem>
          <SelectItem value="Other White Background">Other White Background</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asian</SelectLabel>
          <SelectItem value="Asian Indian">Asian Indian</SelectItem>
          <SelectItem value="Asian Pakistani">Asian Pakistani</SelectItem>
          <SelectItem value="Asian Bangladeshi">Asian Bangladeshi</SelectItem>
          <SelectItem value="Other Chinese">Other Chinese</SelectItem>
          <SelectItem value="Other Asian Background">Other Asian Background</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Black</SelectLabel>
          <SelectItem value="Black Carbbean">Black Carbbean</SelectItem>
          <SelectItem value="Black African">Black African</SelectItem>
          <SelectItem value="Other Black Background">Other Black Background</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Mixed</SelectLabel>
          <SelectItem value="Mixed White and Asian">Mixed White and Asian</SelectItem>
          <SelectItem value="Mixed White and Black African">Mixed White and Black African</SelectItem>
          <SelectItem value="Mixed White and Black Caribbean">Mixed White and Black Caribbean</SelectItem>
          <SelectItem value="Other Mixed Background">Other Mixed Background</SelectItem>
        </SelectGroup>
       
      </SelectContent>
    </Select>
  )
}



