//home.js
import React, { useState,useEffect } from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { getFileList } from './../util/api';
import { Upload, message,Image,Tooltip } from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import wenjianjia from '../access/icon/wenjianjia.png'
import png from '../access/icon/png.png'
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:7080/upload-a?method=tool&path=add',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(this)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function getLsit  (setData) {
  getFileList('').then((res)=>{
    setData(res.fileList);
    console.log(res.fileList)
  })
}
function File() {
  function inToFile(re) {
    if(!re.isFile){
      console.log(url)
      setUrl(url + '/' +re.fileName)
      console.log(url)
      
      getFileList(url).then((res)=>{
        
        setData(res.fileList);
        console.log(res.fileList)
      })
    } else {
      alert('wernj')
    }
  }
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');
  useEffect(() => {
    getLsit(setData)
  },[]);
    return ( <div>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
            </p>
        </Dragger> 
        <div className="container">
          {
            data.map((itm,index) =>
              (
                <Tooltip placement="top" title={itm.fileName}>
                  <div onClick={()=>{inToFile(itm)}}  key={itm.fileName} className='item' >
                    <Image
                      width={80}
                      src={itm.isFile?png:wenjianjia}
                      preview={false}
                      />
                    <p className="itemTitle">{itm.fileName}</p>
                  </div>
                </Tooltip>
              
              ))
          }
            
        </div>
        
  </div >
    );
}
export default File;