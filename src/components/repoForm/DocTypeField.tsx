// form-fields/DocTypeField.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { type Control } from "react-hook-form"
import { DOC_TYPES } from '@/lib/constants'
import { DocTypeRadio } from '../dashboard/DocTypeRadio'
import { type RepoFormValues } from '@/hooks/useRepoForm'

interface DocTypeFieldProps {
  control: Control<RepoFormValues>
  disabled: boolean
}

export const DocTypeField = ({ control, disabled }: DocTypeFieldProps) => {
  return (
    <FormField
      control={control}
      name="docType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-gray-900 text-sm font-semibold mb-2 block'>
            Documentation Type
          </FormLabel>
          <FormControl>
            <div className="flex flex-col gap-3">
              {DOC_TYPES.map((docType) => (
                <DocTypeRadio
                  key={docType.value}
                  docType={docType}
                  isSelected={field.value === docType.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}