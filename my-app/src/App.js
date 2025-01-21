import React from 'react'
import './App.css';

const MEMOS = [
  {title: "メモ1", content: "メモの内容"},
  {title: "メモ2", content: "メモ2の内容"},
  {title: "メモ3", content: "メモ3の内容"}
]

export default function App(){
  return (
  <ul>
  {MEMOS.map((memo, index) => (
    <li key={index}>{memo.title}</li>))}
  </ul>)
}

