import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IntegrationDocsPage() {
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
            <h1 className="text-3xl font-bold">Integration Documentation</h1>
            <p className="text-muted-foreground">Learn how to integrate ThemeLock with your e-commerce platform</p>
          </div>

          <Tabs defaultValue="shopify">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shopify">Shopify</TabsTrigger>
              <TabsTrigger value="woocommerce">WooCommerce</TabsTrigger>
              <TabsTrigger value="custom">Custom Platform</TabsTrigger>
            </TabsList>

            <TabsContent value="shopify" className="space-y-6 pt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  Integrating ThemeLock with Ecomprenia for Automatic License Generation
                </h2>
                <p>
                  To integrate ThemeLock with your Shopify store, you need to create a connection between your
                  Ecomprenia website and the ThemeLock system to automatically generate license keys when customers
                  purchase a theme.
                </p>

                <h3 className="text-xl font-bold mt-6">Integration Steps with Ecomprenia.com</h3>
                <p>Follow these steps to integrate ThemeLock with your Ecomprenia Shopify store:</p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">1. Set up a Shopify webhook in your Ecomprenia store:</h4>
                    <ol className="ml-6 list-decimal space-y-2">
                      <li>Go to your Shopify admin dashboard</li>
                      <li>Navigate to Settings &gt; Notifications &gt; Webhooks</li>
                      <li>Create a new webhook for "Order creation"</li>
                      <li>
                        Set the URL to point to your ThemeLock webhook endpoint (e.g.,
                        https://yourdomain.com/api/shopify-webhook)
                      </li>
                      <li>Make sure to save the webhook secret for verification</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">2. Configure environment variables:</h4>
                    <ol className="ml-6 list-decimal space-y-2">
                      <li>
                        Set <code className="bg-muted px-1 py-0.5 rounded">LICENSE_API_SECRET</code> - a secure key for
                        internal API communication
                      </li>
                      <li>
                        Set <code className="bg-muted px-1 py-0.5 rounded">SHOPIFY_WEBHOOK_SECRET</code> - from your
                        Shopify webhook configuration
                      </li>
                      <li>
                        Set <code className="bg-muted px-1 py-0.5 rounded">LICENSE_API_ENDPOINT</code> - the URL to your
                        license creation API
                      </li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">3. Test the integration:</h4>
                    <ol className="ml-6 list-decimal space-y-2">
                      <li>Create a test order in your Shopify store</li>
                      <li>Check that the license is generated and stored in your database</li>
                      <li>Verify that the email is sent to the customer with the license key</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">4. Add product metadata in Shopify:</h4>
                    <ol className="ml-6 list-decimal space-y-2">
                      <li>For each theme product, add metadata to identify it as a theme</li>
                      <li>Use product tags, product type, or metafields to specify license type</li>
                    </ol>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold">How the Integration Works</h3>
                  <p className="mt-2">This integration will automatically:</p>
                  <ol className="ml-6 list-decimal space-y-2 mt-2">
                    <li>Capture theme purchases from your Ecomprenia website</li>
                    <li>Generate unique license keys with the ECOMPRIA prefix</li>
                    <li>Store them in your ThemeLock database</li>
                    <li>Email the license keys to customers</li>
                    <li>Allow customers to use these keys during the registration/onboarding process</li>
                  </ol>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold">Additional Considerations</h3>
                  <ol className="ml-6 list-decimal space-y-2 mt-2">
                    <li>
                      <strong>Email Templates:</strong> Create professional email templates for license key delivery
                    </li>
                    <li>
                      <strong>Error Handling:</strong> Implement robust error handling and notifications if license
                      generation fails
                    </li>
                    <li>
                      <strong>Logging:</strong> Add comprehensive logging to track license creation and usage
                    </li>
                    <li>
                      <strong>Admin Notifications:</strong> Send notifications to admins when new licenses are created
                    </li>
                    <li>
                      <strong>Order Management:</strong> Add a section in your ThemeLock admin panel to view licenses by
                      order number
                    </li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="woocommerce" className="space-y-6 pt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Integrating ThemeLock with WooCommerce</h2>
                <p>
                  To integrate ThemeLock with your WooCommerce store, you need to use WooCommerce hooks to automatically
                  generate license keys when customers purchase a theme.
                </p>

                <h3 className="text-xl font-bold mt-6">Integration Steps</h3>
                <p>Follow these steps to integrate ThemeLock with your WooCommerce store:</p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">1. Create a custom WooCommerce plugin:</h4>
                    <p>Create a new plugin file in your WordPress installation:</p>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`<?php
/**
 * Plugin Name: ThemeLock Integration for WooCommerce
 * Description: Integrates ThemeLock licensing system with WooCommerce
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class ThemeLock_WooCommerce_Integration {
    
    public function __construct() {
        // Hook into WooCommerce order completion
        add_action('woocommerce_order_status_completed', array($this, 'generate_license_keys'), 10, 1);
    }
    
    public function generate_license_keys($order_id) {
        $order = wc_get_order($order_id);
        
        // Check if order exists
        if (!$order) {
            return;
        }
        
        // Get customer details
        $customer_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
        $customer_email = $order->get_billing_email();
        
        $licenses = array();
        
        // Loop through order items
        foreach ($order->get_items() as $item_id => $item) {
            $product = $item->get_product();
            
            // Check if this is a theme product
            if ($product && $this->is_theme_product($product)) {
                $theme_name = $product->get_name();
                $license_type = $this->get_license_type($product);
                
                // Call ThemeLock API to generate license
                $license_key = $this->call_themelock_api($theme_name, $license_type, $customer_name, $customer_email, $order_id);
                
                if ($license_key) {
                    $licenses[] = array(
                        'theme_name' => $theme_name,
                        'license_key' => $license_key,
                        'license_type' => $license_type
                    );
                }
            }
        }
        
        // If licenses were generated, store them with the order
        if (!empty($licenses)) {
            update_post_meta($order_id, '_themelock_licenses', $licenses);
        }
    }
    
    private function is_theme_product($product) {
        // Check if product is a theme based on category, tag, or custom field
        $is_theme = false;
        
        // Example: Check product category
        $terms = get_the_terms($product->get_id(), 'product_cat');
        if ($terms && !is_wp_error($terms)) {
            foreach ($terms as $term) {
                if ($term->slug === 'themes' || $term->slug === 'wordpress-themes') {
                    $is_theme = true;
                    break;
                }
            }
        }
        
        // You can also check custom fields
        $theme_product = get_post_meta($product->get_id(), '_is_theme', true);
        if ($theme_product === 'yes') {
            $is_theme = true;
        }
        
        return $is_theme;
    }
    
    private function get_license_type($product) {
        // Get license type from product meta
        $license_type = get_post_meta($product->get_id(), '_license_type', true);
        
        // Default to standard if not set
        if (empty($license_type)) {
            $license_type = 'standard';
        }
        
        return $license_type;
    }
    
    private function call_themelock_api($theme_name, $license_type, $customer_name, $customer_email, $order_id) {
        // ThemeLock API endpoint
        $api_url = 'https://yourdomain.com/api/create-license';
        
        // API secret key (store this securely)
        $api_secret = get_option('themelock_api_secret');
        
        // Prepare request data
        $data = array(
            'customerName' => $customer_name,
            'customerEmail' => $customer_email,
            'themeName' => $theme_name,
            'licenseType' => $license_type,
            'orderNumber' => $order_id,
            'secretKey' => $api_secret
        );
        
        // Make API request
        $response = wp_remote_post($api_url, array(
            'body' => json_encode($data),
            'headers' => array('Content-Type' => 'application/json'),
            'timeout' => 45
        ));
        
        if (is_wp_error($response)) {
            // Log error
            error_log('ThemeLock API Error: ' . $response->get_error_message());
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $result = json_decode($body, true);
        
        if (isset($result['success']) && $result['success'] && isset($result['licenseKey'])) {
            return $result['licenseKey'];
        }
        
        // Log error
        error_log('ThemeLock API Error: ' . (isset($result['error']) ? $result['error'] : 'Unknown error'));
        return false;
    }
}

// Initialize the integration
new ThemeLock_WooCommerce_Integration();`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">2. Configure the plugin settings:</h4>
                    <ol className="ml-6 list-decimal space-y-2">
                      <li>Add your ThemeLock API secret key in WordPress settings</li>
                      <li>Mark your theme products with appropriate categories or custom fields</li>
                      <li>Add license type metadata to your products</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">3. Add license information to order emails:</h4>
                    <p>Add this code to your theme's functions.php or your custom plugin:</p>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`<?php
// Add license keys to WooCommerce order completed email
add_action('woocommerce_email_order_details', 'add_license_keys_to_email', 10, 4);

function add_license_keys_to_email($order, $sent_to_admin, $plain_text, $email) {
    // Only add to customer completed order email
    if ($email->id != 'customer_completed_order') {
        return;
    }
    
    $order_id = $order->get_id();
    $licenses = get_post_meta($order_id, '_themelock_licenses', true);
    
    if (empty($licenses)) {
        return;
    }
    
    if ($plain_text) {
        echo "\\n\\n";
        echo "==========\\n";
        echo "LICENSE KEYS\\n";
        echo "==========\\n\\n";
        
        foreach ($licenses as $license) {
            echo $license['theme_name'] . "\\n";
            echo "License Type: " . ucfirst($license['license_type']) . "\\n";
            echo "License Key: " . $license['license_key'] . "\\n\\n";
        }
        
        echo "Please keep these license keys safe for future reference.\\n";
        echo "You can register your license at: https://yourdomain.com/register\\n";
    } else {
        ?>
        <h2>License Keys</h2>
        <table class="td" cellspacing="0" cellpadding="6" style="width: 100%; margin-bottom: 20px;">
            <thead>
                <tr>
                    <th>Theme</th>
                    <th>License Type</th>
                    <th>License Key</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($licenses as $license) : ?>
                <tr>
                    <td><?php echo esc_html($license['theme_name']); ?></td>
                    <td><?php echo esc_html(ucfirst($license['license_type'])); ?></td>
                    <td><code><?php echo esc_html($license['license_key']); ?></code></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <p>Please keep these license keys safe for future reference.</p>
        <p>You can register your license at: <a href="https://yourdomain.com/register">https://yourdomain.com/register</a></p>
        <?php
    }
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">4. Add license keys to customer account area:</h4>
                    <p>Add this code to display license keys in the customer's account:</p>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`<?php
// Add endpoint for licenses
add_action('init', 'add_licenses_endpoint');
function add_licenses_endpoint() {
    add_rewrite_endpoint('licenses', EP_ROOT | EP_PAGES);
}

// Add new menu item
add_filter('woocommerce_account_menu_items', 'add_licenses_menu_item');
function add_licenses_menu_item($items) {
    $items['licenses'] = 'My Licenses';
    return $items;
}

// Add content to the new tab
add_action('woocommerce_account_licenses_endpoint', 'licenses_content');
function licenses_content() {
    $customer_orders = wc_get_orders(array(
        'customer' => get_current_user_id(),
        'limit' => -1,
    ));
    
    $all_licenses = array();
    
    foreach ($customer_orders as $order) {
        $licenses = get_post_meta($order->get_id(), '_themelock_licenses', true);
        if (!empty($licenses)) {
            foreach ($licenses as $license) {
                $license['order_id'] = $order->get_id();
                $license['order_date'] = $order->get_date_created()->date('Y-m-d H:i:s');
                $all_licenses[] = $license;
            }
        }
    }
    
    if (empty($all_licenses)) {
        echo '<p>You don\'t have any licenses yet.</p>';
        return;
    }
    
    ?>
    <h2>My Theme Licenses</h2>
    <table class="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
        <thead>
            <tr>
                <th>Theme</th>
                <th>License Type</th>
                <th>License Key</th>
                <th>Order</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($all_licenses as $license) : ?>
            <tr>
                <td><?php echo esc_html($license['theme_name']); ?></td>
                <td><?php echo esc_html(ucfirst($license['license_type'])); ?></td>
                <td><code><?php echo esc_html($license['license_key']); ?></code></td>
                <td>
                    <a href="<?php echo esc_url(wc_get_endpoint_url('view-order', $license['order_id'])); ?>">
                        #<?php echo esc_html($license['order_id']); ?>
                    </a>
                </td>
                <td>
                    <a href="https://yourdomain.com/register?license=<?php echo esc_attr($license['license_key']); ?>" class="button">
                        Register
                    </a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php
}

// Flush rewrite rules on plugin activation
register_activation_hook(__FILE__, 'flush_rewrite_rules');`}</code>
                    </pre>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold">Testing the Integration</h3>
                  <ol className="ml-6 list-decimal space-y-2 mt-2">
                    <li>Create a test product in WooCommerce and mark it as a theme</li>
                    <li>Place a test order and complete it</li>
                    <li>Verify that license keys are generated and stored with the order</li>
                    <li>Check that license keys appear in the order completion email</li>
                    <li>Verify that license keys appear in the customer's account area</li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6 pt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Integrating ThemeLock with a Custom Platform</h2>
                <p>
                  If you're using a custom e-commerce platform or selling themes through your own website, you can still
                  integrate with ThemeLock using our API.
                </p>

                <h3 className="text-xl font-bold mt-6">API Integration</h3>
                <p>ThemeLock provides a simple REST API for generating license keys and validating them:</p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">1. License Generation API:</h4>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`POST https://yourdomain.com/api/create-license

// Request Body
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "themeName": "Premium Theme",
  "licenseType": "standard",
  "orderNumber": "1001",
  "secretKey": "your_api_secret_key"
}

// Response
{
  "success": true,
  "licenseKey": "ECOMPRIA-ABCD-1234-EFGH",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "themeName": "Premium Theme",
  "licenseType": "standard",
  "orderNumber": "1001",
  "createdAt": "2023-08-15T14:30:00.000Z",
  "expiresAt": "2024-08-15T14:30:00.000Z"
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">2. License Validation API:</h4>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`POST https://yourdomain.com/api/validate

// Request Body
{
  "licenseKey": "ECOMPRIA-ABCD-1234-EFGH",
  "shopDomain": "mystore.com"
}

// Response (Success)
{
  "valid": true,
  "license": {
    "themeName": "Premium Theme",
    "shopDomain": "mystore.com",
    "licenseType": "standard"
  },
  "expiresAt": "2024-08-15T14:30:00.000Z"
}

// Response (Error)
{
  "valid": false,
  "message": "License key is invalid or has expired"
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">3. Implementation Example (Node.js):</h4>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`// Example Node.js implementation
const axios = require('axios');

async function generateLicenseKey(order) {
  try {
    const response = await axios.post('https://yourdomain.com/api/create-license', {
      customerName: \`\${order.customer.firstName} \${order.customer.lastName}\`,
      customerEmail: order.customer.email,
      themeName: order.items[0].name,
      licenseType: order.items[0].licenseType || 'standard',
      orderNumber: order.orderNumber,
      secretKey: process.env.THEMELOCK_API_SECRET
    });

    if (response.data.success) {
      // Store license key with order
      await storeOrderLicense(order.id, response.data.licenseKey);
      
      // Send email to customer
      await sendLicenseEmail(
        order.customer.email,
        order.customer.firstName,
        response.data.licenseKey,
        order.items[0].name
      );
      
      return response.data.licenseKey;
    } else {
      throw new Error('Failed to generate license key');
    }
  } catch (error) {
    console.error('License generation error:', error);
    // Implement error handling and notifications
    throw error;
  }
}

// Hook this function into your order processing workflow
// For example, call it when an order is completed`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">4. Implementation Example (PHP):</h4>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`<?php
// Example PHP implementation
function generate_license_key($order) {
    $api_url = 'https://yourdomain.com/api/create-license';
    $api_secret = getenv('THEMELOCK_API_SECRET');
    
    $data = array(
        'customerName' => $order['customer']['firstName'] . ' ' . $order['customer']['lastName'],
        'customerEmail' => $order['customer']['email'],
        'themeName' => $order['items'][0]['name'],
        'licenseType' => $order['items'][0]['licenseType'] ?? 'standard',
        'orderNumber' => $order['orderNumber'],
        'secretKey' => $api_secret
    );
    
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\\r\\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );
    
    $context = stream_context_create($options);
    $result = file_get_contents($api_url, false, $context);
    
    if ($result === FALSE) {
        // Handle error
        error_log('Failed to generate license key');
        return false;
    }
    
    $response = json_decode($result, true);
    
    if (isset($response['success']) && $response['success']) {
        // Store license key with order
        store_order_license($order['id'], $response['licenseKey']);
        
        // Send email to customer
        send_license_email(
            $order['customer']['email'],
            $order['customer']['firstName'],
            $response['licenseKey'],
            $order['items'][0]['name']
        );
        
        return $response['licenseKey'];
    } else {
        error_log('License API error: ' . ($response['error'] ?? 'Unknown error'));
        return false;
    }
}

// Hook this function into your order processing workflow
// For example, call it when an order is completed`}</code>
                    </pre>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold">Security Considerations</h3>
                  <ol className="ml-6 list-decimal space-y-2 mt-2">
                    <li>
                      <strong>API Secret:</strong> Keep your API secret key secure and never expose it in client-side
                      code
                    </li>
                    <li>
                      <strong>HTTPS:</strong> Always use HTTPS for API requests
                    </li>
                    <li>
                      <strong>Rate Limiting:</strong> Implement rate limiting to prevent abuse
                    </li>
                    <li>
                      <strong>Error Handling:</strong> Implement robust error handling and logging
                    </li>
                    <li>
                      <strong>Validation:</strong> Validate all input data before sending it to the API
                    </li>
                  </ol>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold">Email Templates</h3>
                  <p>When sending license keys to customers, use a professional email template that includes:</p>
                  <ol className="ml-6 list-decimal space-y-2 mt-2">
                    <li>Your company branding</li>
                    <li>Order details</li>
                    <li>License key(s) in a clear, easy-to-copy format</li>
                    <li>Instructions for registering the license</li>
                    <li>Link to your documentation</li>
                    <li>Support contact information</li>
                  </ol>
                </div>
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
