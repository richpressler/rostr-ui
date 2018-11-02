import React from 'react';

export function ProjectRoster(props) {
  return (
    <div>
      <h4 className="roster-header">{props.projectName}</h4>
      <div>
      {props.members.map((member, i) => {
        return (
          <div className="roster-member-container" key={i}>
            <div className="roster-member-inner-container">
              <div className="roster-avatar-container">
                <img className="roster-avatar" src="https://via.placeholder.com/60"></img>
              </div>
              <div className="roster-info-container">
                <div className="roster-name">{member.name}</div>
                <div className="roster-role">{member.role}</div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}