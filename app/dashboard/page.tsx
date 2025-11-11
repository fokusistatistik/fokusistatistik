'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  LogOut,
  Settings,
  CreditCard,
  BarChart3,
  MessageSquare,
  Bell,
  ChevronRight,
  TrendingUp,
  Users,
  Clock,
  Star,
  Sparkles,
} from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeAssistants, setActiveAssistants] = useState(0);
  const [totalUsage, setTotalUsage] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris');
    }
  }, [status, router]);

  useEffect(() => {
    // Simulated stats - replace with real API calls
    setActiveAssistants(3);
    setTotalUsage(156);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#860000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: 'Yönetici Asistanı',
      icon: '👔',
      color: 'from-blue-500 to-blue-600',
      usage: 45,
      status: 'active',
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: 'Müşteri Hizmetleri',
      icon: '💬',
      color: 'from-green-500 to-green-600',
      usage: 89,
      status: 'active',
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: 'Veri Analisti',
      icon: '📊',
      color: 'from-purple-500 to-purple-600',
      usage: 22,
      status: 'active',
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: 'Pazarlama & Lead',
      icon: '🎯',
      color: 'from-orange-500 to-orange-600',
      usage: 0,
      status: 'inactive',
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: 'Finans & Fatura',
      icon: '💰',
      color: 'from-emerald-500 to-emerald-600',
      usage: 0,
      status: 'inactive',
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: 'İnsan Kaynakları',
      icon: '👥',
      color: 'from-indigo-500 to-indigo-600',
      usage: 0,
      status: 'inactive',
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: 'İçerik Tasarımı',
      icon: '🎨',
      color: 'from-pink-500 to-pink-600',
      usage: 0,
      status: 'inactive',
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: 'Sosyal Medya',
      icon: '📱',
      color: 'from-cyan-500 to-cyan-600',
      usage: 0,
      status: 'inactive',
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: 'Joker Asistan',
      icon: '🃏',
      color: 'from-red-500 to-red-600',
      usage: 0,
      status: 'inactive',
    },
  ];

  const recentActivity = [
    {
      assistant: 'FOKUS216',
      action: 'Müşteri talebi yanıtlandı',
      time: '5 dakika önce',
      icon: '💬',
    },
    {
      assistant: 'FOKUS001',
      action: 'Haftalık rapor oluşturuldu',
      time: '2 saat önce',
      icon: '👔',
    },
    {
      assistant: 'FOKUS314',
      action: 'Veri analizi tamamlandı',
      time: '4 saat önce',
      icon: '📊',
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#860000] rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-800">FOKUS</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-[#860000] transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-gray-800">{session?.user?.name}</p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>

                <div className="relative group">
                  <button className="w-10 h-10 rounded-full bg-[#860000] flex items-center justify-center text-white font-bold">
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 hidden group-hover:block">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Ayarlar
                    </Link>
                    <Link
                      href="/dashboard/billing"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Faturalama
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#860000] to-[#6b0000] rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hoş geldiniz, {session?.user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-white/90">
                Bugün iş süreçlerinizi optimize etmek için hangi asistanı kullanmak istersiniz?
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#ffc107]" />
                <p className="text-2xl font-bold">{totalUsage}</p>
                <p className="text-sm text-white/80">Toplam Kullanım</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{activeAssistants}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Aktif Asistanlar</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 rounded-lg p-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">+45%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Verimlilik Artışı</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{totalUsage}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Toplam Görüşme</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 rounded-lg p-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">12 gün</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Kalan Deneme</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assistants List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Sanal Asistanlarınız</h2>
                <Link
                  href="/sanalasistanlar"
                  className="text-[#860000] text-sm font-semibold hover:underline"
                >
                  Tümünü Gör
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assistants.map((assistant) => (
                  <Link
                    key={assistant.code}
                    href={`/dashboard/assistant/${assistant.code}`}
                    className={`rounded-xl overflow-hidden border-2 transition group hover:shadow-lg ${
                      assistant.status === 'active'
                        ? 'border-[#860000] bg-gradient-to-br from-gray-50 to-white'
                        : 'border-gray-200 bg-gray-50 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className={`bg-gradient-to-r ${assistant.color} p-4 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl">{assistant.icon}</div>
                        {assistant.status === 'active' && (
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                            Aktif
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{assistant.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{assistant.title}</p>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{assistant.usage} kullanım</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#860000] group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Hızlı İşlemler</h3>

              <div className="space-y-3">
                <Link
                  href="/dashboard/upgrade"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-[#860000] to-[#6b0000] text-white rounded-lg hover:shadow-lg transition group"
                >
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">Premium&apos;a Geç</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  href="/dashboard/analytics"
                  className="flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition group"
                >
                  <div className="flex items-center space-x-3 text-gray-700">
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-semibold">Analitikler</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  href="/dashboard/support"
                  className="flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition group"
                >
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-semibold">Destek</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Son Aktiviteler</h3>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{activity.assistant}</p>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard/activity"
                className="block text-center text-[#860000] text-sm font-semibold hover:underline mt-4"
              >
                Tüm Aktiviteleri Gör
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
