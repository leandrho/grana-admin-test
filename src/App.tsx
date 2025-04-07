import { Login } from './components/Login';


function App() {

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24 bg-gray-200 gap-8">
        <h1 className="text-3xl font-bold text-amber-800">Grana Admin</h1>
        <Login />
      </main>
    </>
  )
}

export default App
