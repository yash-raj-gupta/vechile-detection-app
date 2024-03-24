import {useState} from 'react'
import axios from 'axios';
function UploadPage() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageUrl(null); 
        setIsButtonDisabled(false);
      };
    
      const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
        setIsButtonDisabled(true);
        try {
          const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setImageUrl(`data:image/jpeg;base64,${response.data.image}`);
          
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      };

  return (
    <div className="bg-gray-100 min-h-screen">
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-2xl font-bold">Vehicle Detection app </h1>
      </div>
    </nav>
    <div className="mx-auto border-black flex flex-row justify-center items-center">
    <div className="shadow-2xl mt-10 min-w-[50%] rounded-xl flex flex-col justify-center items-center bg-gray-300 p-4">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      <input type="file"
      accept='image/*'
       onChange={handleFileChange} className='text-lg font-medium border-2 border-gray-500 rounded-lg p-2 hover:bg-gray-200 focus:outline-none focus:border-gray-700'/>
 
      {(selectedFile && !imageUrl) && (
          <div className="mt-8 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Selected Image</h2>
            <div className='w-[100%] h-[75%] items-center'>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-1/2 mx-auto h-[50%] transform transition-transform hover:scale-110" />
            </div>
         
          </div>
        )}
             <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={handleUpload}
               disabled={isButtonDisabled} >
        Upload
      </button>
      {imageUrl && (<div className='flex flex-row justify-center items-center '>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 items-center flex justify-center">Uploaded Image</h2>
          <div className='w-[100%] h-[100%] items-center'>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-[75%] mx-auto h-[75%] transform transition-transform hover:scale-110" />
            </div>
        </div>
         <div className="mt-8">
         <h2 className="text-2xl font-bold mb-4 justify-center flex">Processed Image</h2>
         <div className='w-[100%] h-[100%] items-center'>
            <img src={imageUrl} alt="Processed" className="w-[75%] mx-auto h-[75%] transform transition-transform hover:scale-110" />
            </div>
       </div>
      </div>
        
      )}
    </div>
    </div>
    
  </div>
  )
}

export default UploadPage
