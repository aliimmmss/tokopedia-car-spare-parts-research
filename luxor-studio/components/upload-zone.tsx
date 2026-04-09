'use client'

import { useState, useCallback } from 'react'

interface UploadZoneProps {
  onUpload: (files: FileList) => void
  isProcessing: boolean
}

export default function UploadZone({ onUpload, isProcessing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onUpload(files)
    }
  }, [onUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onUpload(files)
    }
  }, [onUpload])

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`drag-zone h-64 flex flex-col items-center justify-center cursor-pointer ${
        isDragging ? 'drag-over' : ''
      }`}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
        disabled={isProcessing}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        <svg className="w-12 h-12 text-text-tertiary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-display text-sm text-text-secondary mb-2">
          DRAG & DROP PHOTOS HERE
        </p>
        <p className="font-mono text-xs text-text-tertiary">
          OR CLICK TO BROWSE
        </p>
        <p className="font-mono text-xs text-text-tertiary mt-2">
          Supports: JPG, PNG, WEBP
        </p>
      </label>
    </div>
  )
}
