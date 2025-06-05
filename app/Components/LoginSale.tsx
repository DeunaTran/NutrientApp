import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type {FC} from 'react'

type CookiesProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  setAuthOpen: (open: boolean) => void
}

const LoginSale: FC<CookiesProps> = ({ isOpen, setIsOpen, setAuthOpen }) => {
  return (
    <div className='fixed  rounded-lg  md:w-48 backdrop-blur-3xl bottom-0 left-0 right-0 z-20 bg-gray-300 font-light text-xs text-black m-4  shadow-2xl'>

      {isOpen && <div className='flex flex-col items-center justify-center px-7 '>
         <button
            onClick={() => 
            {
                setAuthOpen(true)
                setIsOpen(false)
            }

            }
          className=' w-full cursor-pointer text-black px-4 py-2 font-semibold transition-colors'>
            Sale 10%
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

export default LoginSale
