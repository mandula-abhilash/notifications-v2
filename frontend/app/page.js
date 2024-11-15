import NotificationList from '@/app/components/notifications/NotificationList';
import SubscriptionCard from '@/app/components/subscription/SubscriptionCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Notifications</h1>
            <NotificationList />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Subscription</h2>
            <SubscriptionCard />
          </div>
        </div>
      </main>
    </div>
  );
}