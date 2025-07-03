'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Check, Clock, Mail, Sparkles } from 'lucide-react';

export default function CelebrityWelcome() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 10 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard/celebrity');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to CelebNetwork!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your celebrity account has been created successfully
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
            What happens next?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email Verification</p>
                <p className="text-xs text-gray-600">Check your email and click the verification link</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Profile Review</p>
                <p className="text-xs text-gray-600">Our team will review your profile for verification (24-48 hours)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Go Live!</p>
                <p className="text-xs text-gray-600">Start connecting with fans and earning money</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-blue-800 text-sm space-y-2">
            <p className="font-medium">💡 Pro Tips:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Complete your profile with high-quality photos</li>
              <li>Add verification documents to speed up approval</li>
              <li>Set competitive pricing for your services</li>
              <li>Engage with fans regularly to build your following</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/dashboard/celebrity"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center block"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/auth/celebrity/login"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center block"
          >
            Sign In Later
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact our{' '}
            <Link href="/support" className="text-purple-600 hover:text-purple-500 font-medium">
              support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}