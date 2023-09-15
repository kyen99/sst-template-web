import Header from './header'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className='flex flex-1 flex-col'>
      <Header />
      <div className='flex flex-1 flex-col justify-center items-center w-full'>
        <div>Pilot Registration Form</div>
      </div>
    </main>
  )
}
