import React from 'react';
import { LabelledTextArea } from './LabelledTextArea';

export class SendWelcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      introduction: '',
      needToKnow: '',
      whenWhereToWork: '',
      context: '',
      timeTracking: '',
      questions: ''
    };

    const params = props.match.params;
    this.labels = {
      introduction: 'Introduction',
      needToKnow: `Welcome to ${params.client} - Everything You Need to Know`,
      whenWhereToWork: 'When and Where Should I Work?',
      context: 'Context',
      timeTracking: 'Time Tracking',
      question: 'Questions?'
    };
  }

  updateSimple(fieldName, value) {
    this.setState({
      [fieldName]: value
    });
  }

  submit() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Send Welcome Email</h1>
        <LabelledTextArea label={this.labels.introduction} onChange={newValue => this.updateSimple('introduction', newValue)}/>
        <LabelledTextArea label={this.labels.needToKnow} onChange={newValue => this.updateSimple('needToKnow', newValue)}/>
        <LabelledTextArea label={this.labels.whenWhereToWork} onChange={newValue => this.updateSimple('whenWhereToWork', newValue)}/>
        <LabelledTextArea label={this.labels.context} onChange={newValue => this.updateSimple('context', newValue)}/>
        <LabelledTextArea label={this.labels.timeTracking} onChange={newValue => this.updateSimple('timeTracking', newValue)}/>
        <LabelledTextArea label={this.labels.question} onChange={newValue => this.updateSimple('question', newValue)}/>
        <button onClick={() => this.submit()}>Send</button>
      </div>
    );
  }
}