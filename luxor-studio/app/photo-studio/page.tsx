'use client'

import { useState, useCallback } from 'react'
import UploadZone from '@/components/upload-zone'
import StatusBadge from '@/components/status-badge'
import { PhotoJob } from '@/lib/types'

export default function PhotoStudio() {
  const [photos, setPhotos] = useState<PhotoJob[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpload = useCallback(async (files: FileList) => {
    const newPhotos: PhotoJob[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      originalName: file.name,
      status: 'pending',
      originalUrl: URL.createObjectURL(file),
    }))

    setPhotos(prev => [...newPhotos, ...prev])

    // Auto-start processing for all new photos
    for (const photo of newPhotos) {
      await processPhoto(photo, files[newPhotos.indexOf(photo)])
    }
  }, [])

  const processPhoto = async (photo: PhotoJob, file: File) => {
    setPhotos(prev => 
      prev.map(p => p.id === photo.id ? { ...p, status: 'processing' } : p)
    )

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('removeBg', 'true')

      const response = await fetch('/api/photo-process', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Processing failed')

      const data = await response.json()

      setPhotos(prev => 
        prev.map(p => 
          p.id === photo.id 
            ? { ...p, status: 'done', processedUrl: data.processedUrl }
            : p
        )
      )
    } catch (error) {
      setPhotos(prev => 
        prev.map(p => 
          p.id === photo.id 
            ? { ...p, status: 'error', error: 'Processing failed' }
            : p
        )
      )
    }
  }

  const handleProcess = async (photo: PhotoJob) => {
    // Re-process photo
    setPhotos(prev => 
      prev.map(p => p.id === photo.id ? { ...p, status: 'processing', error: undefined } : p)
    )
    // Would need to re-upload the file or fetch from server
  }

  const handleDownload = (photo: PhotoJob) => {
    if (!photo.processedUrl) return
    
    const link = document.createElement('a')
    link.href = photo.processedUrl
    link.download = `processed_${photo.originalName}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: PhotoJob['status']) => {
    switch (status) {
      case 'done': return 'bg-accent-secondary'
      case 'processing': return 'bg-accent-warning'
      case 'error': return 'bg-accent'
      default: return 'bg-text-tertiary'
    }
  }

  return (
    <div className="h-full flex flex-col p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold mb-2">Photo Studio</h1>
        <p className="text-text-secondary font-body">Remove backgrounds, enhance, and prepare product photos for marketplace listings.</p>
      </div>

      <div className="mb-8">
        <UploadZone onUpload={handleUpload} isProcessing={isProcessing} />
      </div>

      {photos.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-secondary uppercase">Progress</span>
              <div className="w-64 h-1 bg-bg-tertiary">
                <div 
                  className="h-full bg-accent-secondary transition-all duration-300"
                  style={{ width: `${((photos.filter(p => p.status === 'done').length) / photos.length) * 100}%` }}
                ></div>
              </div>
              <span className="font-mono text-xs text-text-secondary">
                {photos.filter(p => p.status === 'done').length}/{photos.length} Done
              </span>
            </div>
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div className="flex-1 overflow-auto border border-border">
          <table className="w-full">
            <thead className="bg-bg-tertiary sticky top-0">
              <tr>
                <th className="w-20">Original</th>
                <th className="w-20">Processed</th>
                <th>Filename</th>
                <th>Status</th>
                <th className="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {photos.map(photo => (
                <tr key={photo.id}>
                  <td>
                    {photo.originalUrl && (
                      <img 
                        src={photo.originalUrl} 
                        alt={photo.originalName}
                        className="w-12 h-12 object-cover border border-border"
                      />
                    )}
                  </td>
                  <td>
                    {photo.processedUrl ? (
                      <img 
                        src={photo.processedUrl} 
                        alt="Processed"
                        className="w-12 h-12 object-cover border border-border bg-white"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-bg-tertiary border border-border flex items-center justify-center">
                        {photo.status === 'processing' && (
                          <span className="w-4 h-4 border border-accent-warning border-t-transparent animate-spin"></span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="font-mono text-xs">{photo.originalName}</td>
                  <td>
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 ${getStatusColor(photo.status)}`}></span>
                      <span className="font-mono text-xs uppercase">{photo.status}</span>
                    </span>
                  </td>
                  <td>
                    {photo.status === 'done' && photo.processedUrl && (
                      <button
                        onClick={() => handleDownload(photo)}
                        className="btn-outline text-xs py-1 px-3"
                      >
                        DOWNLOAD
                      </button>
                    )}
                    {photo.status === 'error' && (
                      <button
                        onClick={() => handleProcess(photo)}
                        className="btn-outline text-xs py-1 px-3 border-accent text-accent"
                      >
                        RETRY
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
