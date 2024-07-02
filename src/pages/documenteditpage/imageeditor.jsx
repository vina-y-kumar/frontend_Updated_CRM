import React, { useRef } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import ImgLogo from '../../assets/logo1.png'; // Adjust the path as per your project structure

const myTheme = {
  // Customize your theme here
  'common.bi.image': `url(${ImgLogo})`, // Use backticks for URL formatting in CSS
  'common.backgroundColor': '#f5f5f5', // Example background color
  'header.backgroundImage': 'none', // Remove default header background image if not needed
  // Add more customizations as needed
};

const ImageEditorComponent = () => {
  const editorRef = useRef(null);

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

  return (
    <div>
      <ImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: 'img/sampleImage.jpg',
            name: 'SampleImage',
          },
          theme: myTheme,
          menu: ['shape', 'filter', 'text'], // Include shape and filter in the menu options
          initMenu: 'text', // Initial menu to be shown (text editor)
          uiSize: {
            width: '1000px',
            height: '700px',
          },
          menuBarPosition: 'bottom',
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
