import { CurrencyConverter, Header } from "@/components";



export default async function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-4xl pt-24 pb-10">

        <CurrencyConverter /> 
      </main>
    </div>
  )
}
