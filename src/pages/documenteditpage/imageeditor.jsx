import React, { useRef, useEffect, useState } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import ImgLogo from '../../assets/Nuren.png'; // Adjust the path as per your project structure
import './style.css';
import { Sidebar } from '../../components/Sidebar';

const myTheme = {
  'common.bi.image': `${ImgLogo}`,
  'common.backgroundColor': '#f5f5f5',
  'header.backgroundImage': 'none',
  // Add more customizations as needed
};

const ImageEditorComponent = () => {
  const editorRef = useRef(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const logoImg = document.querySelector('.tui-image-editor-header-logo img');
    if (logoImg) {
      logoImg.style.height = '50px';
      logoImg.style.width = 'auto';
    }
  }, []);

  useEffect(() => {
    if (imageURL) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.loadImageFromURL(imageURL, 'New Image').then((sizeValue) => {
        editorInstance.ui.activeMenuEvent();
        editorInstance.ui.resizeEditor({ imageSize: sizeValue });
        console.log("Image allegedly loaded.");
      }).catch((err) => {
        console.error("Failed to load image", err);
      });
    }
  }, [imageURL]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
      <div>
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            style={{ width: '80%', padding: '5px', marginRight: '10px' }}
          />
          <button onClick={() => setImageURL(imageURL)} style={{ padding: '5px 10px' }}>
            Load Image
          </button>
        </div>
        <ImageEditor
          ref={editorRef}
          includeUI={{
            theme: myTheme,
            menu: ['shape', 'filter', 'text'],
            initMenu: 'text',
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
          usageStatistics={false}
        />
      </div>
    </div>
  );
};

export default ImageEditorComponent;
