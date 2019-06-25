import React from 'react';
import { Modal } from 'react-onsenui';

import Cropper from 'react-easy-crop';
import {Button} from "react-onsenui";

export default class ImageUpdater extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...props,
      image_src: '',
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: props.width / props.height,
      userIcon: null,
      croppedAreaPixels: null,
      isLoading: false,
    };
  }

  handleChangeFile = (e) => {
    const files = e.target.files;
    const image_url = files.length === 0 ? "" : URL.createObjectURL(files[0]);
    if (image_url) {
      this.setState({
        isLoading: this.state.image_src !== image_url,
        image_src: image_url,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: this.props.width / this.props.height,
      });
    }
  };

  onCropChange = crop => {
    this.setState({ crop })
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({ croppedAreaPixels });
  };

  onZoomChange = zoom => {
    this.setState({ zoom })
  };

  setCroppedImage = async () => {
    const userIcon = await this.getCroppedImg(
      this.state.image_src,
      this.state.croppedAreaPixels,
    );
    this.setState({ userIcon, isLoading: false });
    this.props.updatePhoto(userIcon);
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid black',
            textAlign: 'center',
            padding: '10px',
            lineHeight: '30px',
            width: '20vmax',
            height: '20vmax',
            cursor: 'pointer',
          }}
        >
          {(
            () => {
              if (this.state.userIcon !== null || this.props.photoUrl !== undefined) {
                return (
                  <img
                    src={this.state.userIcon !== null ? this.state.userIcon : this.state.photoUrl}
                    alt="user icon"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                  />
                );
              } else {
                return (
                  <div style={{
                    position: 'absolute',
                    top: '9vmax',
                    left: 0,
                    fontSize: '2vmax',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  >no image</div>
                );
              }
            }
          )()}
          <input
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              opacity: 0,
            }}
            type="file"
            ref="file"
            onChange={this.handleChangeFile}
          />
        </div>
        <Modal isOpen={this.state.isLoading} animation="fade">
          <div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: '80px',
              }}
            >
              <Cropper
                image={this.state.image_src}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
                showGrid={false}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                width: '50%',
                transform: 'translateX(-50 %)',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button onClick={this.setCroppedImage}>決定</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // 画像の下準備
  createImage = url => new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

  // トリミングした画像を生成
  async getCroppedImg(imageSrc, pixelCrop) {
    const image = await this.createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // As Base64 string 
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        resolve(URL.createObjectURL(file));
      }, 'image/jpeg');
    });
  }
}
