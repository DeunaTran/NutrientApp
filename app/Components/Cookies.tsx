import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type {FC} from 'react'

type CookiesProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const Cookies: FC<CookiesProps> = ({ isOpen, setIsOpen }) => {
  const close = () => setIsOpen(false)

  return (
    <div className='fixed backdrop-blur-3xl bottom-0 left-0 right-0 z-50 bg-white font-light text-xs text-black m-4  shadow-lg'>

      {isOpen && <div className='flex flex-col items-center justify-center p-4'>
        <p>This website uses cokkies to ensure you get the best experience on our website </p>
        <p className='underline cursor-pointer'>Privacy Policy</p>
        <button
            onClick={close}
          className='bg-black w-full cursor-pointer text-white px-4 py-2 font-semibold mt-2  transition-colors'>
            ACCEPT
          </button>
         <button
          onClick={close}

          className='bg-white w-full cursor-pointer text-black border px-4 py-2 font-semibold mt-2  transition-colors'>
            PREFERENCES
          </button>
        <div
          className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer absolute -top-4 -right-4 select-none"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          x
        </div>
        
        
      </div>}

    </div>
  )
}

export default Cookies
