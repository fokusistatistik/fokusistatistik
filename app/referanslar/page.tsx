export default function Referanslar() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#860000] via-[#a50000] to-[#6b0000] text-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Referanslarımız
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                FOKUS İstatistik ile çalışan iş ortaklarımız ve başarı hikayelerimiz.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-12 shadow-lg">
                <div className="text-6xl mb-6">🚀</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Yakında Burada Olacak
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Referanslarımız ve başarı hikayelerimiz çok yakında bu sayfada yer alacak.
                  Müşterilerimizin deneyimlerini ve projelerimizin sonuçlarını sizlerle paylaşacağız.
                </p>
                <p className="text-sm text-gray-500 italic">
                  Şu anda müşterilerimizle çalışmalarımızı tamamlıyoruz.
                  <br />
                  İlk referanslarımız için bizi takip etmeye devam edin!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
