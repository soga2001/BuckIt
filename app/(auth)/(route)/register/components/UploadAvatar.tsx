'use client'
import styles from './styles.module.scss'
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions,} from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import ImageIcon from '@mui/icons-material/Image';
import { Close, Upload } from '@mui/icons-material';
import { Tag } from 'primereact/tag';
import { useEffect, useRef, useState } from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function TemplateDemo() {

    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState<string | null>(null);

    const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    
    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(0);
        setFile(null);
        setFileURL(null);
        fileUploadRef.current?.clear();
        callback();
    };


    const uploadImg = (e: FileUploadUploadEvent) => {
        const tempFile = e.files[0];
        if (tempFile) {
            setTotalSize(tempFile.size);
            setFile(tempFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileURL(e.target?.result as string);
            };
            reader.readAsDataURL(tempFile);
        }

    }

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const tempFile = inFile as File;
        return (
            <div className="flex flex-col items-center gap-3 flex-wrap">
                <div className="flex flex-col gap-5 items-center" style={{ width: '40%' }}>
                    <img alt={file?.name} role="presentation" src={fileURL as string} width={400} />
                    <span className="flex flex-column text-left ">
                        {file?.name}
                    </span>
                </div>
                {props.formatSize}
                <Close className="border border-red-500 rounded-full w-8 h-8 text-red-500" onClick={() => onTemplateRemove(inFile as File, props.onRemove)} />
            
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex flex-col items-center !bg-black">
                <Upload className='border rounded-full h-32 w-32 p-3' />
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: <ImageIcon />, iconOnly: true, className:  `${styles['image-button']} custom-choose-btn p-button-rounded p-button-outlined` };

    return (
        <form className='flex flex-col gap-2'>
            {/* <Toast ref={toast}></Toast> */}
            <div>
                <h1 className="text-4xl font-bold text-center">Login Information</h1>
            </div>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />

            <FileUpload className='!bg-black' onUpload={uploadImg} ref={fileUploadRef} name="demo[]" multiple accept="image/*" maxFileSize={1000000}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} auto />
        </form>
    )
}