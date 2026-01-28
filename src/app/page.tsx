import { CurrencyConverter, Header } from "@/components";
//api used
//*** https://currencyfreaks.com/#documentation ***
export default async function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-4xl pt-24 pb-10 px-4 sm:px-6">
        <CurrencyConverter />
      </main>
    </div>
  );
}
