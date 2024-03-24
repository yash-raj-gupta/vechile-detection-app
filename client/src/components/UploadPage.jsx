import {useState} from 'react'
import axios from 'axios';
function UploadPage() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageUrl(null); // Reset imageUrl when a new file is selected
      };
    
      const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        try {
          const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setImageUrl(`data:image/jpeg;base64,${response.data.image}`);
          console.log(response);
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      };

  return (
    <div className="bg-gray-100 min-h-screen">
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-2xl font-bold">Image Upload App</h1>
      </div>
    </nav>
    <div className="container mx-auto mt-10 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
 
      {selectedFile && (
          <div className="mt-8 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Selected Image</h2>
            <div className='w-[100%] h-[75%] items-center'>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-1/2 mx-auto h-[50%]" />
            </div>
         
          </div>
        )}
             <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={handleUpload}
               disabled={!selectedFile} >
        Upload
      </button>
      {imageUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Processed Image</h2>
      
          <img src={imageUrl} alt="Processed" className="max-w-lg" />
        </div>
      )}
    </div>
  </div>
  )
}

export default UploadPage
