import React from 'react';

export function LabelledTextArea(props) {
  return (
    <div>
      <h4 className="text-area-label">{props.label}</h4>
      <textarea className="text-area" placeholder="Enter here..." rows="6" value={props.value} onChange={event => props.onChange(event.target.value)}></textarea>
    </div>
  );
}