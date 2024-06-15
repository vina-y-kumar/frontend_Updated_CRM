import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TicketPage.css';
import { Sidebar } from "../../components/Sidebar";
import TopNavbar from "../TopNavbar/TopNavbar.jsx";
import { MdCheckCircle, MdClose, MdArchive } from 'react-icons/md';

const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
        return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; 
};

const sampleTickets = [
    { id: 1321, heading: 'Login Issue', description: 'Unable to login with correct credentials.', status: 'notSolved' },
    { id: 2145, heading: 'Page not loading', description: 'The dashboard page is not loading properly.', status: 'solved' },
    { id: 3678, heading: 'Error in payment gateway', description: 'Receiving error while processing payment.', status: 'archived' },
    { id: 4353, heading: 'Feature request', description: 'Request to add a new feature for reports.', status: 'notSolved' },
    { id: 5345, heading: 'Bug in profile section', description: 'The profile section is not saving changes.', status: 'solved' },
];

const Ticket = () => {
    const tenantId = getTenantIdFromUrl();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('all');
    const [filteredTickets, setFilteredTickets] = useState(sampleTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        filterTickets(selectedOption);
    }, [selectedOption]);

    const filterTickets = (option) => {
        if (option === 'all') {
            setFilteredTickets(sampleTickets);
        } else {
            setFilteredTickets(sampleTickets.filter(ticket => ticket.status === option));
        }
    };

    const getTicketCount = (status) => {
        return sampleTickets.filter(ticket => status === 'all' ? true : ticket.status === status).length;
    };

    const handleMarkAsSolved = (ticket) => {
        const updatedTickets = sampleTickets.map(t => 
            t.id === ticket.id ? { ...t, status: 'solved' } : t
        );
        setFilteredTickets(updatedTickets);
    };

    const handleMarkAsUnsolved = (ticket) => {
        const updatedTickets = sampleTickets.map(t => 
            t.id === ticket.id ? { ...t, status: 'notSolved' } : t
        );
        setFilteredTickets(updatedTickets);
    };

    const handleArchive = (ticket) => {
        const updatedTickets = sampleTickets.map(t => 
            t.id === ticket.id ? { ...t, status: 'archived' } : t
        );
        setFilteredTickets(updatedTickets);
    };

    const handleDragStart = (e, ticket) => {
        e.dataTransfer.setData("ticketId", ticket.id);
    };

    const handleDrop = (e, newStatus) => {
        const ticketId = e.dataTransfer.getData("ticketId");
        const updatedTickets = sampleTickets.map(t => 
            t.id === parseInt(ticketId) ? { ...t, status: newStatus } : t
        );
        setFilteredTickets(updatedTickets);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        filterTickets(selectedOption);
    }, [selectedOption]);


    return (
        <div className="ticket-page">
            <div className="ticket_nav">
                <TopNavbar />
            </div>
            <div className="ticket-display">
                <div className="ticket_sidebar">
                    <Sidebar />
                </div>
                <div className="ticket_main_content">
                    <div className="ticket-show">
                        <h1>Generated Tickets</h1>
                        <div className="ticket_toolbar">
                            <span className="search_icon">🔍</span> <input type="text" placeholder="Search..." className="ticket-search_input" />
                            <select className="filter_dropdown" onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="all">Filter by</option>
                                <option value="notSolved">Not Solved</option>
                                <option value="solved">Solved</option>
                                <option value="archived">Archived</option>
                            </select>
                            <button className="ticket-create_button">Create New</button>
                            <div className="ticket-dropdown">
                                <button className="dropbtn" onClick={toggleDropdown}>⋮</button>
                                {dropdownOpen && (
                                    <div className="ticket-dropdown_content">
                                        <a href="#">Option 1</a>
                                        <a href="#">Option 2</a>
                                        <a href="#">Option 3</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="ticket_heading">
                        <button onClick={() => setSelectedOption('all')}>
                            All Tickets <span className="ticket_count_badge">{getTicketCount('all')}</span>
                        </button>
                        <button onClick={() => setSelectedOption('notSolved')}>
                            Not Solved <span className="ticket_count_badge">{getTicketCount('notSolved')}</span>
                        </button>
                        <button onClick={() => setSelectedOption('solved')}>
                            Solved <span className="ticket_count_badge">{getTicketCount('solved')}</span>
                        </button>
                        <button onClick={() => setSelectedOption('archived')}>
                            Archived <span className="ticket_count_badge">{getTicketCount('archived')}</span>
                        </button>
                    </div>
                    <div className="ticket_list">
                        {filteredTickets.map(ticket => (
                            <div 
                                key={ticket.id} 
                                className="ticket_item"
                                draggable
                                onDragStart={(e) => handleDragStart(e, ticket)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, selectedOption)}
                                onClick={() => setSelectedTicket(ticket)}
                            >
                                <div className="ticket_heading_number">
                                    <span>{ticket.heading}</span>
                                    <span className="ticket-id-number">#{ticket.id}</span>
                                </div>
                                <div className="ticket_description">
                                    {ticket.description}
                                </div>
                                <button className="view_attachment_button">View Attachment</button>
                                <div className="ticket_hover_actions">
                                    {ticket.status === 'solved' && (
                                        <>
                                            <button 
                                                className="action_button green"
                                                onClick={(e) => { e.stopPropagation(); handleMarkAsUnsolved(ticket); }}
                                            >
                                                <MdClose style={{ color: '#62CD14FF' }} />
                                            </button>
                                            <button 
                                                className="action_button yellow"
                                                onClick={(e) => { e.stopPropagation(); handleArchive(ticket); }}
                                            >
                                                <MdArchive style={{ color: '#EFB034FF' }} />
                                            </button>
                                        </>
                                    )}
                                    {ticket.status === 'notSolved' && (
                                        <>
                                            <button 
                                                className="action_button green"
                                                onClick={(e) => { e.stopPropagation(); handleMarkAsSolved(ticket); }}
                                            >
                                                <MdCheckCircle style={{ color: '#62CD14FF' }} />
                                            </button>
                                            <button 
                                                className="action_button yellow"
                                                onClick={(e) => { e.stopPropagation(); handleArchive(ticket); }}
                                            >
                                                <MdArchive style={{ color: '#EFB034FF' }} />
                                            </button>
                                        </>
                                    )}
                                    {ticket.status === 'archived' && (
                                        <>
                                            <button 
                                                className="action_button green"
                                                onClick={(e) => { e.stopPropagation(); handleMarkAsSolved(ticket); }}
                                            >
                                                <MdCheckCircle style={{ color: '#62CD14FF' }} />
                                            </button>
                                            <button 
                                                className="action_button red"
                                                onClick={(e) => { e.stopPropagation(); handleMarkAsUnsolved(ticket); }}
                                            >
                                                <MdClose style={{ color: '#DE3B40FF' }} />
                                            </button>
                                        </>
                                    )}
                                    <Link to="#" onClick={(e) => e.stopPropagation()}>View Ticket Info</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedTicket && (
                        <div className="ticket_details">
                            <h2>{selectedTicket.heading}</h2>
                            <p>{selectedTicket.description}</p>
                            <button onClick={() => handleMarkAsSolved(selectedTicket)}><MdCheckCircle /> Mark as Solved</button>
                            <button onClick={() => handleMarkAsUnsolved(selectedTicket)}><MdClose /> Mark as Unsolved</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Ticket;
