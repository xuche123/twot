import Sidebar from './Sidebar/Sidebar'
import Followbar from './Followbar'

type Props = {
  children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <div className='h-screen bg-black'>
      <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
        <div className='grid grid-cols-4 h-full'>
          <Sidebar />
          <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-500'>
          {children}
          </div>
          <Followbar />
        </div>
      </div>
    </div>
  )
}