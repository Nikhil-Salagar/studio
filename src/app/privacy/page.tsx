import { PageHeader } from '@/components/page-header';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <PageHeader
        title="Privacy Policy"
        description="Your privacy is important to us. Here's how we handle your data."
        icon={Shield}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Privacy Policy for NS Agri AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/80 leading-relaxed">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

          <p>
            NS Agri AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </p>

          <h2 className="font-headline text-2xl pt-4">1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Service includes:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Service.</li>
            <li><strong>Farm Data:</strong> Information you provide related to your farm, such as soil type, location, crop types, and other agricultural data required for the app's features to function.</li>
            <li><strong>Usage Data:</strong> We may automatically collect information about your device and how you use the application, such as your IP address, browser type, and pages visited.</li>
          </ul>

          <h2 className="font-headline text-2xl pt-4">2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Create and manage your account.</li>
            <li>Provide you with AI-powered agricultural advice and recommendations.</li>
            <li>Communicate with you about your account or our services.</li>
            <li>Improve our application and develop new features.</li>
            <li>Monitor and analyze usage and trends to improve your experience.</li>
          </ul>

          <h2 className="font-headline text-2xl pt-4">3. Advertising and Google AdSense</h2>
          <p>
            We use Google AdSense to display third-party advertisements on our application. Google AdSense may use cookies or unique device identifiers, in combination with their own data, to show you ads based on your visit to our site and other sites on the Internet.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Ads Settings</a>.</li>
          </ul>
          <p>
            For more information on how Google collects and uses data, please see the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Privacy Policy</a>.
          </p>
          
          <h2 className="font-headline text-2xl pt-4">4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
          
          <h2 className="font-headline text-2xl pt-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:support@nsagriai.com" className="text-primary underline">support@nsagriai.com</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
