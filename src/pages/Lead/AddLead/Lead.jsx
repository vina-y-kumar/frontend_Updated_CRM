import React from 'react'
import AddLead from '../../../components/AddLead/AddLead'
import { Sidebar } from '../../../components/Sidebar'
import { Header } from '../../../components/Header'


import "./lead.css"
function Lead() {
  return (
    <>
      <div className="lead">
      <div className="container">
        <div className="lead_inner">
          <div className="lead_left_box">
            <Sidebar />
          </div>
          <div className="lead_right_box">
            <Header name="Create Lead" />
            
            <div className="lead_right_box_inner">
              <AddLead/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Lead