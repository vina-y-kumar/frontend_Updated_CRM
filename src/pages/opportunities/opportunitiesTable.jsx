import React from 'react';
 // Adjust the path to your CSS file as needed

const OpportunitiesTable = ({ opportunities , handleOpportunityClick }) => {
  const renderStageCellStyle = (stage) => {
    // Implement your logic for cell styling based on stage
    // For example, return different class names based on stage
    switch (stage) {
      case 'QUALIFICATION':
        return 'stage-qualification';
      case 'NEEDS ANALYSIS':
        return 'stage-needs-analysis';
      case 'VALUE PROPOSITION':
        return 'stage-value-proposition';
      // Add more cases for other stages
      default:
        return '';
    }
  };

  return (
    <div className="opportunities-table">
      <table>
        <thead className="oppo_table_row">
          <tr>
            <th>Contact Name</th>
            <th>Account</th>
            <th>Stage</th>
            <th>Created By</th>
            <th>Contacts</th>
            <th>Closed on</th>
            <th>Closed by</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => (
               <tr key={opportunity.id} onClick={() => handleOpportunityClick(opportunity.id)}>
              <td className="row_oppo_name">{opportunity.name}</td>
              <td className="row_oppo_account">{opportunity.account}</td>
              <td className={renderStageCellStyle(opportunity.stage)}>
                {opportunity.stage}
              </td>
              <td className="row_oppo_created">{opportunity.createdBy}</td>
              <td className="row_oppo_contact">{opportunity.contacts}</td>
              <td className="row_oopo_closedon">{opportunity.closedOn}</td>
              <td className="row_oopo_cloesd">{opportunity.closedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunitiesTable;
