import Header from './header'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div>Sign Up Form</div>
      </div>
    </main>
  )
}
