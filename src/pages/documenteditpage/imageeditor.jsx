import React, { useRef, useState } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import ImgLogo from '../../assets/logo1.png'; // Adjust the path as per your project structure
import axios from "axios";

const myTheme = {
  'common.bi.image': `url(${ImgLogo})`, // Use backticks for URL formatting in CSS
  'common.backgroundColor': '#f5f5f5', // Example background color
  'header.backgroundImage': 'none', // Remove default header background image if not needed
  // Add more customizations as needed
};

const ImageEditorComponent = () => {
  const editorRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showPromptInput, setShowPromptInput] = useState(false);

  const handleClickButton = () => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.addText('Sample Text', {
      styles: {
        fill: '#ff0000',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center',
      },
      position: {
        x: 100,
        y: 100,
      },
    });
  };

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer `,  // Replace with your actual API key
          },
        }
      );
      
      const generatedImageUrl = response.data.data[0].url;
      setImageUrl(generatedImageUrl);
      const editorInstance = editorRef.current.getInstance();
      editorInstance.loadImageFromURL(generatedImageUrl, 'GeneratedImage').then(() => {
        console.log('Image loaded successfully');
      });
    } catch (error) {
      console.error("Error generating image:", error);
    }     
  };

  return (
    <div>
       {showPromptInput && (
        <div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt"
          />
          <button onClick={handleGenerateImage}>Generate Image</button>
        </div>
      )}
     {imageUrl && (
        <div>
          <h2>Generated Image</h2>
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
      <ImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: '',
            name: 'EmptyImage',
          },
          theme: myTheme,
          menu: ['shape', 'filter', 'text'], // Include shape and filter in the menu options
          initMenu: 'text', // Initial menu to be shown (text editor)
          uiSize: {
            width: '1000px',
            height: '700px',
          },
          menuBarPosition: 'bottom',
          loadButton: {
            title: 'Load',
            handler: () => setShowPromptInput(!showPromptInput)
          }
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false} // Disable Google Analytics
      />
      
      <button onClick={handleClickButton}>Add Text</button>
     
    </div>
  );
};

export default ImageEditorComponent;
