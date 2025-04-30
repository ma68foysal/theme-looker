"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createToken } from "@/lib/actions/token-actions"

const formSchema = z.object({
  licenseId: z.string().min(1, {
    message: "Please select a license.",
  }),
  expiresIn: z.enum(["30", "90", "365", "never"]),
})

export default function NewTokenPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Mock licenses - in a real app, these would be fetched from the API
  const licenses = [
    { id: "1", name: "Premium Theme - mystore.myshopify.com" },
    { id: "2", name: "Deluxe Theme - store2.myshopify.com" },
    { id: "3", name: "Basic Theme - store3.myshopify.com" },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseId: "",
      expiresIn: "90",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await createToken({
        licenseId: values.licenseId,
        expiresIn: values.expiresIn,
      })

      toast({
        title: "Token created",
        description: "Your authentication token has been created successfully.",
      })

      router.push("/dashboard/tokens")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your token.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Token</h1>
        <p className="text-muted-foreground">Create a new authentication token for your theme license</p>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Details</CardTitle>
            <CardDescription>Generate a new authentication token for your theme.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="licenseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a license" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {licenses.map((license) => (
                            <SelectItem key={license.id} value={license.id}>
                              {license.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>The license this token will be associated with.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiresIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expiration period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="never">Never expires</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How long this token will be valid for.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating token..." : "Create Token"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
