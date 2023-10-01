"use client"
import { Upload } from 'lucide-react'
import { ChangeEvent, FC } from 'react'
import toast from 'react-hot-toast'
import ToastError from './ToastError'
import { useRouter } from 'next/navigation'

interface UploadButtonProps {
  
}

const UploadButton: FC<UploadButtonProps> = ({}) => {
  const router = useRouter()

  const handleUpload = async (event:ChangeEvent<HTMLInputElement>) => {
    const input:any = event.target
    const file:File = input.files[0]
    // check file type is csv
    if (!file.type.includes('csv')) {
      toast.error("File type must be csv.")
      input.value = null
      return
    }
    // upload file
    toast.promise(
      postFileUpload(file), {
        loading: 'Uploading...',
        success: data => {
          // Error handling
          if (data.error) {
            throw data;
          }
          if (data.data == 0) { 
            throw { error: { message: "No data found in file." } };
          }
          // Success handling
          router.refresh()
          return "Everything went good";
        },
        error: (e:any) => {
          return (<ToastError error={e.error} />);
        },
      }
    )
    // remove file from input
    input.value = null
  }

  const postFileUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  return (
    <label role='uploadButton' className="flex rounded-md bg-slate-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 cursor-pointer" htmlFor="uploadBtn">
      <Upload className="mr-1 h-5 w-5"/>
      Upload CSV
      <input
        id='uploadBtn'
        type="file"
        className='hidden'
        role='uploadInput'
        onChange={(e) => handleUpload(e)}
      />
    </label>
  )
}

export default UploadButton