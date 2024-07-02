import React, { useRef,useEffect } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import ImgLogo from '../../assets/Nuren.png'; // Adjust the path as per your project structure
import './style.css';
import { Sidebar } from '../../components/Sidebar';
const myTheme = {
  // Customize your theme here
  'common.bi.image': `${ImgLogo}`, // Use backticks for URL formatting in CSS
  'common.backgroundColor': '#f5f5f5', // Example background color
  'header.backgroundImage': 'none', // Remove default header background image if not needed
  // Add more customizations as needed
};

const ImageEditorComponent = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    const logoImg = document.querySelector('.tui-image-editor-header-logo img');
    if (logoImg) {
      logoImg.style.height = '50px'; // Set the desired height
      logoImg.style.width = 'auto'; // Maintain aspect ratio
    }
   /* const bottomcontainer = document.querySelector('.upper-canvas ');
    if (bottomcontainer) {
        bottomcontainer.style.height = '10px'; // Set the desired height
       
      }*/
  }, []);


  return (
    <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
        <div><Sidebar/></div>
      <ImageEditor
        ref={editorRef}
        includeUI={{
          
          theme: myTheme,
          menu: ['shape', 'filter', 'text'], // Include shape and filter in the menu options
          initMenu: 'text', // Initial menu to be shown (text editor)
          uiSize: {
            width: '100%',
            height: '100vh',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={5000}
        cssMaxWidth={7000}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false} // Disable Google Analytics
      />
    
    </div>
  );
};

export default ImageEditorComponent;
