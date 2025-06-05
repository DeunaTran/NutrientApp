import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function SizeChart( {productName} : {productName: string}) {
  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <p
        onClick={open}
        
        className="text-sm font-light mt-4 mb-2 text-left text-gray-400 underline cursor-pointer"
        // className='cursor-pointer text-sm/6 font-thin text-white hover:text-gray-300 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-gray-300 data-open:text-gray-300'
      >
        Size Chart
      </p>

      <Dialog open={isOpen} as="div" className="relative  z-50 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-50 w-screen h-screen bg-black/30 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white py-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <img
              
              src= {productName.includes('Shorts') ?
                'https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//SizeChartShortTable.jpg'
                :
                'https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//SizeChartShirtTable.jpg'
              } 
              //  alt="Size Chart"
               className="w-full h-auto " />
              <div className="mt-4 px-6">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
