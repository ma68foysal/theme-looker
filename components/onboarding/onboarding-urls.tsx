"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { updateOnboardingStep, whitelistUrls } from "@/lib/actions/user-actions"
import { useToast } from "@/hooks/use-toast"

const urlRegex = /^https:\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/

const formSchema = z.object({
  mainUrl: z.string().min(1, "Main URL is required").regex(urlRegex, "Must be a valid HTTPS URL"),
  secondaryUrl: z.string().regex(urlRegex, "Must be a valid HTTPS URL").or(z.literal("")),
  shopifyUrl: z
    .string()
    .regex(
      /^https:\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.myshopify\.com(?:\/[^\s]*)?$/,
      "Must be a valid Shopify URL",
    )
    .or(z.literal("")),
})

export function OnboardingUrls() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainUrl: "",
      secondaryUrl: "",
      shopifyUrl: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const result = await whitelistUrls({
        mainUrl: values.mainUrl,
        secondaryUrl: values.secondaryUrl,
        shopifyUrl: values.shopifyUrl,
      })

      if (result.success) {
        await updateOnboardingStep(4) // Move to step 4
        router.push("/onboarding/complete")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to whitelist URLs. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to whitelist URLs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <OnboardingProgress currentStep={3} />

      <Card className="border-none shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Whitelist your URLs</CardTitle>
          <CardDescription>Add the URLs where your theme will be used</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="mainUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourdomain.com" {...field} />
                    </FormControl>
                    <FormDescription>Your primary website URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://staging.yourdomain.com" {...field} />
                    </FormControl>
                    <FormDescription>For development or staging environments</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shopifyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shopify URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://your-store.myshopify.com" {...field} />
                    </FormControl>
                    <FormDescription>Your Shopify store URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save URLs"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
