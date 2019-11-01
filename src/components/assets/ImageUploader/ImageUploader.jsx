import React from 'react';
import Cropper from 'react-easy-crop';
import { Button, Col, Modal, Range } from "react-onsenui";

import cssModule from './ImageUploader.module.css';

class ImageUpdater extends React.Component {
  constructor(props) {
    super();
    this.state = {
      alt: props.alt,
      updatePhoto: props.updatePhoto,
      photoURL: props.photoURL,
      width: props.width,
      height: props.height,
      image_src: '',
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: props.width / props.height,
      userIcon: null,
      newPhotoUrl: '',
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

    this.setState({
      userIcon,
      newPhotoUrl: URL.createObjectURL(userIcon),
      isLoading: false
    });
    this.state.updatePhoto(userIcon);
  };

  render() {
    return (
      <div
        className={cssModule.area}
      >
        <div>
          {(
            () => {
              if (!!this.state.newPhotoUrl || this.props.photoURL !== undefined) {
                return (
                  <img
                    src={!!this.state.newPhotoUrl ? this.state.newPhotoUrl : this.state.photoURL}
                    alt={this.state.alt}
                    className={cssModule.areaImg}
                  />
                );
              }
            }
          )()}
          <div className={cssModule.areaOverlayBG}/>
          <div className={`${cssModule.areaOverlay} ${cssModule.areaSelect}`}>
            <div
              className={cssModule.areaOverlayText}
            >
              変更
            </div>
            <input
              accept="image/png,image/jpeg,image/webp"
              className={cssModule.areaInput}
              type="file"
              ref="file"
              onChange={this.handleChangeFile}
              onClick={e => e.target.value = ''}
            />
          </div>
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
                zoomSpeed={1}
                maxZoom={5}
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
                left: '0',
                width: '100%',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Col width={'70%'}>
                <Range
                  style={{width: '80%', margin: '0 10%'}}
                  value={(this.state.zoom - 1) * 25}
                  onChange={(event) => this.setState({zoom: (parseInt(event.target.value) / 25) + 1})}
                />
              </Col>
              <Col width={'30%'}>
                <Button onClick={this.setCroppedImage}>決定</Button>
              </Col>
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
        resolve(file);
      }, 'image/jpeg');
    });
  }
}

export default ImageUpdater;