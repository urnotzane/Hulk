import React from 'react';
import logo from './logo.svg';
import './App.css';
import xlsx from 'xlsx'

const read = e => {
  const file = e.target.files[0]
  const reader = new FileReader()

  reader.onload = e => {
    const data = new Uint8Array(e.target.result)
    const workbook = xlsx.read(data, {type: 'array'})
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const array = xlsx.utils.sheet_to_json(sheet)
    const newKeys = {
      '用户ID': 'userId',
      '联系人': 'contact',
      '用户昵称': 'nickName',
      '孩子姓名': 'childName',
      '孩子年龄': 'childAge',
      '手机号': 'tel',
      '商户订单号': 'orderNo',
      '订单状态': 'orderStatus',
      '班级': 'class'
    }
    array.forEach(item => {
      const keys = Object.keys(item)
      keys.forEach(key => {
        const newKey = newKeys[key]
        if(newKey) {
          item[newKey] = item[key]
          delete item[key]
        }
      })
    })

    console.log(array)
  }
  reader.readAsArrayBuffer(file)
}

function App() {
  console.log(xlsx)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>EXCEL文件导入</h1>
        <div className='btn-wrap'>
          <input
          className='uploader'
          type='file'
          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          onChange={read}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
