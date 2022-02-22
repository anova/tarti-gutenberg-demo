import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

function CustomMediaUploadRev2(props){
    return  (
        <>
            {
                props.label &&
                <div>
                    <label>{props.label}</label>
                </div>
            }
            <MediaUpload
            onSelect={ media => { props.onMediaSelected(media) } }
            type="image"
            value={ props.mediaUrl === 'none' ? null : props.mediaUrl }
            render={
                ({open}) => {
                    if(props.mediaUrl && props.mediaUrl !== 'none') {
                        return <>
                            <img src={props.mediaUrl} />
                            <hr/>
                            <Button onClick={ () => { props.onMediaSelected('none') } }>Görseli Kaldır</Button>
                        </>;
                    }
                    return <Button onClick={open}>Görsel ekle</Button>;
                }
            }/>
        </>
    );
}

export { CustomMediaUploadRev2 };

/*
Usage:
import { CustomMediaUpload } from 'custom-media-upload'

<CustomMediaUpload
    value={attributes.mediaUrl}
    onMediaSelected={ ( value ) => { setAttributes({'mediaUrl': value}) } }
/>
*/
