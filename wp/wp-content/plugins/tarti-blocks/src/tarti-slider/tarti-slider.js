import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { PanelBody } from '@wordpress/components';
import { CustomMediaUploadRev2 } from '../custom-media-upload/custom-media-upload-rev2';

import './tarti-slider.scss';

registerBlockType('tarti/slider', {
  category: 'tarti',
  title: 'Tartı Slider',
  edit() {
    return (
      <div className="editor-tarti-slider" data-component="tarti-slider">
        <InnerBlocks allowedBlocks={['tarti/slider-item']} />
      </div>
    )
  },
  save({attributes}) {
    return (
      <div className={`p-slidebox ${attributes.className}`}>
        <div className="container">
          <div className="p-slidebox__dots"></div>
          <div className="p-slidebox__slider">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    )
  }
});

function editorOnMediaSelected(media, setAttributes) {
  if(media === 'none') {
    setAttributes({sliderImage: null, sliderImageAlt: null, sliderImageHeight: null, sliderImageWidth: null});
    return;
  }
  setAttributes({sliderImage: media.url, sliderImageAlt: media.alt, sliderImageWidth: media.sizes.full.width, sliderImageHeight: media.sizes.full.height});
}

registerBlockType('tarti/slider-item', {
  category: 'tarti',
  title: 'Tartı Slider Item',
  attributes: {
    sliderTitle: {
      type: 'string',
      source: 'html',
      selector: 'h6'
    },
    sliderText: {
      type: 'string',
      source: 'html',
      selector: 'p'
    },
    sliderImage: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'data-lazy'
    },
    sliderImageAlt: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'alt'
    },
    sliderImageWidth: {
      type: 'number',
      source: 'attribute',
      selector: 'img',
      attribute: 'width'
    },
    sliderImageHeight: {
      type: 'number',
      source: 'attribute',
      selector: 'img',
      attribute: 'height'
    }
  },
  parent: [
    'tarti/slider'
  ],
  edit({attributes, setAttributes}) {
    return (
      <>
        <InspectorControls>
          <PanelBody>
            <TextControl value={attributes.sliderTitle} label="Slider Title" onChange={value => { setAttributes({sliderTitle: value}) }}/>
            <TextControl value={attributes.sliderText} label="Slider Text" onChange={value=>{ setAttributes({sliderText: value}) }}/>
            <CustomMediaUploadRev2 mediaUrl={attributes.sliderImage} label="Slider Image" 
            onMediaSelected={media => {editorOnMediaSelected(media, setAttributes)} } />
          </PanelBody>
        </InspectorControls>
        <div className="editor-tarti-slider-slide" data-component="tarti-slider/slide">
          <div className="editor-tarti-slider-slide-text">
            <h6><RichText placeholder='Slider Title' value={attributes.sliderTitle} onChange={ value => { setAttributes({sliderTitle: value}) } }/></h6>
            <p><RichText placeholder='Slider Text' value={attributes.sliderText} onChange={ value => { setAttributes({sliderText: value}) } }/></p>
          </div>
          <div className="editor-tarti-slider-slide-img">
            <CustomMediaUploadRev2 mediaUrl={attributes.sliderImage} onMediaSelected={media => {editorOnMediaSelected(media, setAttributes)} } />
          </div>
        </div>
      </>
    )
  },
  save({attributes}) {
    return (
      <div class={`p-slidebox__slide ${attributes.className}`}>
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="col-12 p-slidebox__text">
              <h6><RichText.Content value={attributes.sliderTitle}/></h6>
              <p><RichText.Content value={attributes.sliderText}/></p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <img data-lazy={attributes.sliderImage} alt={attributes.sliderImageAlt} width={attributes.sliderImageWidth} height={attributes.sliderImageHeight}/>
          </div>
        </div>
      </div>
    )
  }
});
