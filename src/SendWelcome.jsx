import React from 'react';
import { LabelledTextArea } from './LabelledTextArea';
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
      staffAtClient: '',
      yourTeam: '',
      timeTracking: '',
      questions: '',
      recipients,
      currentTeamEmployees: []
    };

    this.labels = {
      introduction: 'Introduction',
      needToKnow: `Welcome to ${clientName} - Everything You Need to Know`,
      whenWhereToWork: 'When and Where Should I Work?',
      context: 'Context',
      staffAtClient: `Rocket Folks at ${clientName}`,
      yourTeam: 'Your Team',
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
    const currentTeamEmployees = searchNextOn.filter(emp => emp.currentProject === targetEmployee.currentProject);
    const teamText = currentTeamEmployees.reduce((text, member) => {
      const employmentData = employeesWithEmploymentData.find(emp => emp.name.toLowerCase() === member.name.toLowerCase());
      text += `${member.name}`;
      text = employmentData ? text + `(${employmentData["full_time"] ? 'Full Time' : 'Part Time'} ${employmentData.role})` : text;
      return text + '\n';
    }, '');

    this.setState({
      staffAtClient: clientText,
      yourTeam: teamText,
      currentTeamEmployees
    });
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
        <h1>Send Welcome Email</h1>
        {Object.keys(this.labels).map(fieldName => 
            <LabelledTextArea
              key={fieldName}
              label={this.labels[fieldName]}
              value={this.state[fieldName]}
              onChange={newValue => this.handleFieldUpdate(fieldName, newValue)}/>
        )}
        <button onClick={() => this.submit()}>Send</button>
      </div>
    );
  }
}