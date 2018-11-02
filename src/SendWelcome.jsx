import React from 'react';
import { LabelledTextArea } from './LabelledTextArea';
import { ProjectRoster } from './ProjectRoster';
import { fetchJSON } from './utilities';

export class SendWelcome extends React.Component {
  constructor(props) {
    super(props);

    const clientName = props.match.params.client;
    const recipients = props.match.params.recipients.split(',');

    this.state = {
      introduction: '',
      needToKnow: '',
      whenWhereToWork: '',
      context: '',
      staffAtClient: [],
      yourTeam: '',
      timeTracking: '',
      questions: '',
      recipients,
      currentTeamEmployees: [],
      projectName: ''
    };

    this.labels = {
      introduction: 'Greeting',
      whenWhereToWork: 'Where/when should I work?',
      context: 'Context',
      staffAtClient: `Rocket Folks at ${clientName}`,
      yourTeam: `Your team at ${clientName}`,
      timeTracking: 'Time Tracking',
      question: 'Questions?'
    };
  }

  async componentWillMount() {
    const employeesWithProjectData = await fetchJSON('https://rocket-rostr.herokuapp.com/clients');
    const employeesWithEmploymentData = await fetchJSON('https://rocket-rostr.herokuapp.com/employees');

    const targetEmployee = employeesWithProjectData.find(emp => emp.name.toLowerCase() === this.state.recipients[0].toLowerCase());

    let currentClientEmployees;
    let clientText = '';
    if (targetEmployee.currentClient) {
      currentClientEmployees = employeesWithProjectData.filter(emp => emp.currentClient === targetEmployee.currentClient);
      clientText = currentClientEmployees.reduce((text, clientEmp) => {
        const employmentData = employeesWithEmploymentData.find(emp => emp.name.toLowerCase() === clientEmp.name.toLowerCase());
        text += `${clientEmp.name}`;
        text = employmentData ? text + `(${clientEmp.currentProject}, ${employmentData["full_time"] ? 'Full Time' : 'Part Time'} ${employmentData.role})` : text;
        return text + '\n';
      }, '');
    }

    const searchNextOn = currentClientEmployees || employeesWithProjectData;
    let currentTeamEmployees = searchNextOn.filter(emp => emp.currentProject === targetEmployee.currentProject);
    currentTeamEmployees = currentTeamEmployees.map(emp => {
      const employmentData = employeesWithEmploymentData.find(data => data.name.toLowerCase() === emp.name.toLowerCase());
      emp.role = employmentData ? employmentData.role : '';
      return emp;
    });
    console.log(currentTeamEmployees);
    const teamText = currentTeamEmployees.reduce((text, member) => {
      const employmentData = employeesWithEmploymentData.find(emp => emp.name.toLowerCase() === member.name.toLowerCase());
      text += `${member.name}`;
      text = employmentData ? text + `(${employmentData["full_time"] ? 'Full Time' : 'Part Time'} ${employmentData.role})` : text;
      return text + '\n';
    }, '');

    this.setState({
      staffAtClient: clientText,
      yourTeam: teamText,
      currentTeamEmployees,
      projectName: targetEmployee.currentProject
    });
  }

  getRecipientNames() {
    const recipients = this.state.recipients;
    return recipients.reduce((text, recipient, i) => {
      const firstName = recipient.split(' ')[0];
      if (recipients.length === 2 && i === 0) {
        text += `${firstName} `;
      } else {
        text += i === recipients.length - 1 ? `and ${firstName}` : `${firstName}, `;
      }
      return text;
    }, '');
  }

  handleFieldUpdate(fieldName, value) {
    this.setState({
      [fieldName]: value
    });
  }

  submit() {
    const emails = this.state.recipients.reduce((current, recipName) => {
      const employee = this.state.currentTeamEmployees.find(emp => emp.name.toLowerCase() === recipName.toLowerCase());
      if (employee && employee.email) {
        current.push(employee.email);
      }

      return current;
    }, []);
  }

  render() {
    return (
      <div>
        <div className="send-email-roster">
          <ProjectRoster members={this.state.currentTeamEmployees} projectName={this.state.projectName}/>
        </div>
        <div className="send-email-content">
          <h1 className="send-email-header">Project Intro</h1>
          <p className="send-email-help-text">Fill out the fields below to craft an introductory email for {this.getRecipientNames()}</p>
          {Object.keys(this.labels).map(fieldName => 
              <LabelledTextArea
                key={fieldName}
                label={this.labels[fieldName]}
                value={this.state[fieldName]}
                onChange={newValue => this.handleFieldUpdate(fieldName, newValue)}/>
          )}
          <button className="button-action" onClick={() => this.submit()}>Next - Review</button>
        </div>
      </div>
    );
  }
}