'use client';

import { useState, useEffect } from 'react';
import { getCurrentSubscription, upgradeToPro, cancelSubscription } from '@/app/lib/api/subscription';
import { Crown, CheckCircle } from 'lucide-react';

export default function SubscriptionCard() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchSubscription = async () => {
    try {
      const data = await getCurrentSubscription();
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const handleUpgrade = async () => {
    setProcessing(true);
    try {
      await upgradeToPro();
      await fetchSubscription();
    } catch (error) {
      console.error('Error upgrading subscription:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    setProcessing(true);
    try {
      await cancelSubscription();
      await fetchSubscription();
    } catch (error) {
      console.error('Error canceling subscription:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading subscription details...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <Crown className={`w-6 h-6 ${subscription?.tier === 'pro' ? 'text-yellow-500' : 'text-gray-400'}`} />
        <h2 className="text-xl font-semibold">
          {subscription?.tier === 'pro' ? 'Pro Subscription' : 'Basic Plan'}
        </h2>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>Access to basic features</span>
        </div>
        {subscription?.tier === 'pro' && (
          <>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Priority support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Advanced analytics</span>
            </div>
          </>
        )}
      </div>

      {subscription?.tier === 'pro' ? (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Your subscription will expire on{' '}
            {new Date(subscription.expiryDate).toLocaleDateString()}
          </p>
          <button
            onClick={handleCancel}
            disabled={processing}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Cancel Subscription'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleUpgrade}
          disabled={processing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {processing ? 'Processing...' : 'Upgrade to Pro'}
        </button>
      )}
    </div>
  );
}