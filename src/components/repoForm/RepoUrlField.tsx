// components/form-fields/RepoUrlField.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type Control } from "react-hook-form"
import { type RepoFormValues } from '@/hooks/useRepoForm'

interface RepoUrlFieldProps {
  control: Control<RepoFormValues>
  disabled?: boolean
}

export const RepoUrlField = ({ control, disabled }: RepoUrlFieldProps) => {
  return (
    <FormField
      control={control}
      name="repoUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-600 text-sm font-medium">
            Repository URL
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="https://github.com/username/repo" 
              {...field} 
              className="h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}