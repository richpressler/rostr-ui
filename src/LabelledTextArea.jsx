import React from 'react';

export function LabelledTextArea(props) {
  return (
    <div>
      <h4 className="text-area-label">{props.label}</h4>
      <textarea onChange={event => props.onChange(event.target.value)}></textarea>
    </div>
  );
}