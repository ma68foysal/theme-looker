"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createLicense } from "@/lib/actions/license-actions"

const formSchema = z.object({
  themeName: z.string().min(2, {
    message: "Theme name must be at least 2 characters.",
  }),
  shopDomain: z.string().min(3, {
    message: "Shop domain must be at least 3 characters.",
  }),
  licenseType: z.enum(["standard", "extended", "unlimited"]),
})

export default function NewLicensePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      themeName: "",
      shopDomain: "",
      licenseType: "standard",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await createLicense({
        themeName: values.themeName,
        shopDomain: values.shopDomain,
        licenseType: values.licenseType,
      })

      toast({
        title: "License created",
        description: "Your license has been created successfully.",
      })

      router.push("/dashboard/licenses")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your license.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New License</h1>
        <p className="text-muted-foreground">Create a new license for your Shopify theme</p>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>License Details</CardTitle>
            <CardDescription>Enter the details for your new theme license.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="themeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theme Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Premium Shopify Theme" {...field} />
                      </FormControl>
                      <FormDescription>The name of your Shopify theme.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shopDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop Domain</FormLabel>
                      <FormControl>
                        <Input placeholder="mystore.myshopify.com" {...field} />
                      </FormControl>
                      <FormDescription>The Shopify domain where this theme will be used.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licenseType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a license type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="extended">Extended</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The type of license determines usage rights and limitations.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating license..." : "Create License"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
