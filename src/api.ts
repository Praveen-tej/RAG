
export async function sendMessage(question: string) {
  const response = await fetch('http://127.0.0.1:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question })
  })
  const data = await response.json()
  return data
} 

export async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('http://127.0.0.1:8000/upload', {
    method: 'POST',
    body: formData
  })
  const data = await response.json()
  return data
}