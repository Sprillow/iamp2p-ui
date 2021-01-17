import React from 'react'
import './ProgressExplainer.css'

export default function ProgressExplainer({ text, done }) {
  return <div className={`progress-explainer ${done ? 'progress-check-point' : ''}`}>
    <div className="progress-explainer-text">{text}</div>
    {done && <img src='img/valid-mark.svg' />}
  </div>
}