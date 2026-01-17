// form-fields/RepoTokenField.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type Control } from "react-hook-form"
import { type RepoFormValues } from '@/hooks/useRepoForm'

interface RepoTokenFieldProps {
  control: Control<RepoFormValues>
  disabled: boolean
}

export const RepoTokenField = ({ control, disabled }: RepoTokenFieldProps) => {
  return (
    <FormField
      control={control}
      name="repoToken"
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-gray-600 text-sm font-medium'>
            Access Token
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="ghp_1xxxxxxxxxxxxxxx" 
              type="password"
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