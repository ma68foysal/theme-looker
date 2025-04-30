import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-6 w-6" />
            <span>ThemeLock</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium hover:underline">
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Documentation</h1>
            <p className="text-muted-foreground">Learn how to integrate ThemeLock with your Shopify themes</p>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p>
                  ThemeLock is a secure licensing system for Shopify themes. It allows theme developers to protect their
                  intellectual property by ensuring that only authorized users can use their themes.
                </p>
                <h3 className="text-xl font-bold">How It Works</h3>
                <ol className="ml-6 list-decimal space-y-2">
                  <li>
                    <strong>License Creation:</strong> When a customer purchases your theme, you create a license in the
                    ThemeLock dashboard.
                  </li>
                  <li>
                    <strong>Token Generation:</strong> Generate authentication tokens for each license. These tokens are
                    used to validate the theme.
                  </li>
                  <li>
                    <strong>Theme Integration:</strong> Integrate the ThemeLock validation code into your theme.
                  </li>
                  <li>
                    <strong>Validation:</strong> Your theme will validate the token with the ThemeLock API to ensure
                    it's being used by an authorized user.
                  </li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6 pt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Integration Guide</h2>
                <p>Follow these steps to integrate ThemeLock with your Shopify theme:</p>

                <h3 className="text-xl font-bold">Step 1: Add License Field to Theme Settings</h3>
                <p>Add a field in your theme's settings_schema.json to accept the authentication token:</p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`{
  "name": "License",
  "settings": [
    {
      "type": "text",
      "id": "license_token",
      "label": "License Token",
      "info": "Enter your ThemeLock authentication token"
    }
  ]
}`}</code>
                </pre>

                <h3 className="text-xl font-bold">Step 2: Add Validation Code</h3>
                <p>Add the following JavaScript code to your theme to validate the token:</p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`// In your theme.js file
document.addEventListener('DOMContentLoaded', function() {
  const validateLicense = async () => {
    const token = {{ settings.license_token | json }};
    const shopDomain = Shopify.shop;
    
    if (!token) {
      // Handle missing token
      console.error('License token is missing');
      // Optionally disable features or show a warning
      return;
    }
    
    try {
      const response = await fetch('https://api.themelock.com/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, shopDomain }),
      });
      
      const data = await response.json();
      
      if (!data.valid) {
        // Handle invalid license
        console.error('License validation failed:', data.message);
        // Disable premium features or show a warning
      }
    } catch (error) {
      console.error('License validation error:', error);
    }
  };
  
  validateLicense();
});`}</code>
                </pre>

                <h3 className="text-xl font-bold">Step 3: Implement Feature Restrictions</h3>
                <p>Based on the validation result, you can restrict certain features of your theme:</p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`// Example of feature restriction
if (licenseIsValid) {
  // Enable premium features
  enablePremiumFeatures();
} else {
  // Disable premium features
  disablePremiumFeatures();
  
  // Optionally show a warning
  showLicenseWarning();
}`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-6 pt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">API Reference</h2>
                <p>ThemeLock provides a simple API for validating authentication tokens.</p>

                <h3 className="text-xl font-bold">Validate Token</h3>
                <p>
                  <strong>Endpoint:</strong> <code>POST https://api.themelock.com/validate</code>
                </p>
                <p>
                  <strong>Request Body:</strong>
                </p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`{
  "token": "tk_1a2b3c4d5e6f7g8h9i0j",
  "shopDomain": "mystore.myshopify.com"
}`}</code>
                </pre>

                <p>
                  <strong>Response (Success):</strong>
                </p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`{
  "valid": true,
  "license": {
    "themeName": "Premium Theme",
    "shopDomain": "mystore.myshopify.com",
    "licenseType": "standard"
  },
  "expiresAt": "2024-06-15T00:00:00.000Z"
}`}</code>
                </pre>

                <p>
                  <strong>Response (Error):</strong>
                </p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`{
  "valid": false,
  "message": "Token has expired"
}`}</code>
                </pre>

                <h3 className="text-xl font-bold">Rate Limits</h3>
                <p>
                  The API is rate-limited to 100 requests per hour per IP address. If you exceed this limit, you'll
                  receive a 429 Too Many Requests response.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6 pt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Example Implementations</h2>

                <h3 className="text-xl font-bold">Basic Implementation</h3>
                <p>This example shows a basic implementation of ThemeLock in a Shopify theme:</p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`// theme.js
class ThemeLock {
  constructor() {
    this.token = {{ settings.license_token | json }};
    this.shopDomain = Shopify.shop;
    this.validated = false;
    this.premiumFeatures = document.querySelectorAll('.premium-feature');
    
    this.init();
  }
  
  async init() {
    if (!this.token) {
      this.disablePremiumFeatures();
      this.showLicenseWarning();
      return;
    }
    
    try {
      const isValid = await this.validateLicense();
      
      if (isValid) {
        this.validated = true;
      } else {
        this.disablePremiumFeatures();
        this.showLicenseWarning();
      }
    } catch (error) {
      console.error('License validation error:', error);
    }
  }
  
  async validateLicense() {
    const response = await fetch('https://api.themelock.com/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.token,
        shopDomain: this.shopDomain
      }),
    });
    
    const data = await response.json();
    return data.valid;
  }
  
  disablePremiumFeatures() {
    this.premiumFeatures.forEach(feature => {
      feature.style.display = 'none';
    });
  }
  
  showLicenseWarning() {
    const warning = document.createElement('div');
    warning.className = 'license-warning';
    warning.innerHTML = \`
      <p>This theme requires a valid license. Please purchase a license or enter your license token in the theme settings.</p>
    \`;
    
    document.body.appendChild(warning);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  new ThemeLock();
});`}</code>
                </pre>

                <h3 className="text-xl font-bold">Advanced Implementation with Offline Fallback</h3>
                <p>This example includes an offline fallback mechanism:</p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`// theme.js with offline fallback
class ThemeLockAdvanced {
  constructor() {
    this.token = {{ settings.license_token | json }};
    this.shopDomain = Shopify.shop;
    this.storageKey = 'themelock_validation';
    this.validated = false;
    this.premiumFeatures = document.querySelectorAll('.premium-feature');
    
    this.init();
  }
  
  async init() {
    if (!this.token) {
      this.disablePremiumFeatures();
      this.showLicenseWarning();
      return;
    }
    
    // Check for cached validation
    const cachedValidation = this.getCachedValidation();
    if (cachedValidation) {
      if (cachedValidation.valid && new Date(cachedValidation.expiresAt) > new Date()) {
        this.validated = true;
        return;
      }
    }
    
    try {
      const validationResult = await this.validateLicense();
      
      if (validationResult.valid) {
        this.validated = true;
        this.cacheValidation(validationResult);
      } else {
        this.disablePremiumFeatures();
        this.showLicenseWarning(validationResult.message);
      }
    } catch (error) {
      console.error('License validation error:', error);
      
      // If offline, use cached validation as fallback
      if (cachedValidation) {
        this.validated = cachedValidation.valid;
        if (!this.validated) {
          this.disablePremiumFeatures();
          this.showLicenseWarning('Offline validation failed');
        }
      } else {
        this.disablePremiumFeatures();
        this.showLicenseWarning('Unable to validate license (offline)');
      }
    }
  }
  
  async validateLicense() {
    const response = await fetch('https://api.themelock.com/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.token,
        shopDomain: this.shopDomain
      }),
    });
    
    return await response.json();
  }
  
  cacheValidation(validationResult) {
    localStorage.setItem(this.storageKey, JSON.stringify({
      valid: validationResult.valid,
      expiresAt: validationResult.expiresAt,
      timestamp: new Date().toISOString()
    }));
  }
  
  getCachedValidation() {
    const cached = localStorage.getItem(this.storageKey);
    if (!cached) return null;
    
    try {
      return JSON.parse(cached);
    } catch (e) {
      return null;
    }
  }
  
  disablePremiumFeatures() {
    this.premiumFeatures.forEach(feature => {
      feature.style.display = 'none';
    });
  }
  
  showLicenseWarning(message = 'Invalid license') {
    const warning = document.createElement('div');
    warning.className = 'license-warning';
    warning.innerHTML = \`
      <p>License validation failed: \${message}</p>
      <p>Please purchase a license or enter your valid license token in the theme settings.</p>
    \`;
    
    document.body.appendChild(warning);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  new ThemeLockAdvanced();
});`}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>ThemeLock</span>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            © {new Date().getFullYear()} ThemeLock. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
