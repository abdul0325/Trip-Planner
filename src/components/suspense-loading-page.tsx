import { Loader2 } from 'lucide-react'
import React from 'react'

const SuspenseLoadingPage = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <Loader2 className='size-16 animate-spin'/>
    </div>
  )
}

export default SuspenseLoadingPage