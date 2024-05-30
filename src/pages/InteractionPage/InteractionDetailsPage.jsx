import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api";
import './AddInteractionForm.css';

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

const InteractionDetailsPage = () => {
  const { id } = useParams();
  const tenantId = getTenantIdFromUrl(); // Assuming you have a function to get tenantId from URL
  console.log("ID from Params:", id);
  const [interaction, setInteraction] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await axiosInstance.get(`/interaction/`);
        const data = response.data;
        console.log("Fetched Data:", data);

        if (!data) {
          throw new Error(`Interaction with ID ${id} not found`);
        }
       
        setInteraction(data);
      } catch (error) {
        console.error("Error fetching interaction:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, [id]);
  const handleAddNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: new Date().getTime(),
      text: contactinfo.Notes,
    };
  }
  const handleChange = (event) => {
    // Assuming you want to update the interaction's notes
    const { name, value } = event.target;
    setInteraction(prevInteraction => ({
      ...prevInteraction,
      [name]: value
    }));
  };
  

  return (
    <div>
      <div className="inter">      
        <div className='interaction_back'>
          <Link to={`../${tenantId}/interaction`}  id='back-inter' >
            Back
          </Link>
        </div>
       
        <div className="combine_inter" >
          <div>
            <h2 className="Interaction_head">Interaction Details</h2>
          </div>
          <div className="first_inter">
  <ul className='first_inter_data'>
    <li className='first_inter_data1'>Entry ID  : {interaction && interaction.entity_id}</li>
    <li className='first_inter_data1'>Entity Type  : {interaction && interaction.entity_type}</li>
    <li className='first_inter_data1'>Interaction Type  : {interaction && interaction.interaction_type}</li>
    <li className='first_inter_data1'>Interaction Date Time  : {interaction && interaction.interaction_datetime}</li>
  </ul>
</div>

          <div className="second_inter">
            <div className="note_combine">
              <div>
                <h1 className="note_head">Notes</h1>
              </div>
<div>
<form  className="note_inter"   onSubmit={handleAddNote}>
                <textarea
                  name="Notes"
                  value={interaction ? interaction.notes : ''}
                  onChange={handleChange}
                  className="notes-textarea"
                  placeholder="Add Notes........"
                ></textarea>
              </form>
</div>

             
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
  
};

export default InteractionDetailsPage;
