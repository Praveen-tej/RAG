import { useState } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import { useNavigate } from 'react-router-dom'
import { uploadFile } from '../api'

function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) return
    await uploadFile(file)
    navigate('/chat')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md">

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-1">Upload Document</h1>
        <p className="text-gray-400 text-sm mb-8">Upload a PDF to start asking questions</p>

        {/* Drop Zone */}
        <label className="border-2 border-dashed border-white/20 hover:border-violet-500 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors mb-6">
          <div className="text-4xl mb-3">📄</div>
          <p className="text-white font-medium mb-1">
            {file ? file.name : 'Drop your PDF here'}
          </p>
          <p className="text-gray-500 text-sm">or click to browse</p>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

        </label>

        {/* Upload Button */}
        <button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer "
          onClick={handleUpload}>
          Upload & Process
        </button>

      </div>
    </div>
  )
}

export default UploadPage