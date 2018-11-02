import React from 'react';

export class EmployeeAtClient {
  handleChange(field, newValue) {
    const updatedModel = {
      ...this.props.model,
      [field]: newValue
    };

    this.props.onChange(updatedModel);
  }

  render() {
    return (
      <div>
        <span className="EmployeeAtClient-name">{this.props.model.name}</span>
        <span className="EmployeeAtClient-project">{this.props.model.project}</span>
        <span className="EmployeeAtClient-role">{this.props.model.role}</span>
        <input
          className="EmployeeAtClient-info-input"
          placeholder="Additional Notes"
          value={this.props.model.role}
          onChange={event => this.props.onChange('role', event.target.value)}></input>
      </div>
    );
  }
}