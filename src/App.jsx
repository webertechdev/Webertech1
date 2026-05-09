function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          WeberTech Solutions KE
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-blue-200">
          Digital Business Ecosystem
        </p>
        <p className="text-lg mb-10 text-slate-300">
          Bundles API | Movies | Bikes & Cars | Loans | Web Design | Blog
        </p>
        <a 
          href="https://wa.me/254722508904" 
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full text-xl font-bold inline-block shadow-lg"
        >
          WhatsApp: 0722 508 904
        </a>
      </div>
    </div>
  )
}
export default App