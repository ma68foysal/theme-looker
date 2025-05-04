import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <ShieldCheck className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Oops! 😕</CardTitle>
            <CardDescription className="text-red-500 font-medium">Error Code: TTS-001</CardDescription>
          </CardHeader>
          <CardContent className="text-center px-6">
            <p className="mb-4">It looks like you are using an unauthorized version of our theme.</p>
            <div className="bg-muted p-4 rounded-lg mb-6 text-left">
              <p className="text-sm font-medium mb-2">To resolve this issue:</p>
              <ol className="text-sm space-y-2 list-decimal pl-4">
                <li>Purchase a valid license from our website</li>
                <li>Register an account using your license key</li>
                <li>Download the authorized theme file with your token</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" asChild>
              <Link href="https://ecompria.com">Purchase a License</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">Login to Your Account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
