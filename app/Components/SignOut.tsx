import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import supabase from 'utils/supabase'

interface SignOutProps {
  onSignOut?: () => void; // Optional callback to update parent/global state
}

export default function SignOut({ onSignOut }: SignOutProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error.message)
    } else {
      onSignOut?.()
      close()
    }
  }

  return (
    <>
      <button
        onClick={open}
        className="text-black font-light py-1 underline   w-full text-left"
      >
        Đăng xuất
      </button>

      <Dialog open={isOpen} as="div" className="relative  z-20" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen backdrop-blur-lg overflow-y-auto bg-black/30">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              className="w-full max-w-md rounded-xl bg-black/30  text-white p-6 shadow-xl"
            >
              <DialogTitle as="h3" className="text-lg font-semibold">
                Sign Out Confirmation
              </DialogTitle>
              <p className="mt-2 text-sm ">
                Are you sure you want to sign out of your account?
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={close}
                  className="px-4 py-2 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-300 duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500/20 text-white rounded-md hover:bg-red-600/50 duration-300"
                >
                  Sign Out
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}