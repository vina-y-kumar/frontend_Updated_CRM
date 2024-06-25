import React, { useState } from 'react';
import axios from 'axios';

const InstaCards = () => {
  const [formData, setFormData] = useState({
    nodes: [],
    pers_menu: [],
    ice_breakers: [],
    reply: {},
  });

  const nodeTypes = ["button", "generic", "quick_replies", "string", "input"];

  const handleChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    newFormData[arrayName][index][name] = value;
    setFormData(newFormData);
  };

  const addNode = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nodes: [...prevFormData.nodes, { id: Math.random().toString(), type: '', body: '' }],
    }));
  };

  const addIceBreaker = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ice_breakers: [...prevFormData.ice_breakers, { id: Math.random().toString(), body: '' }],
    }));
  };

  const addPersMenu = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pers_menu: [...prevFormData.pers_menu, { body: '', type: '', reply: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://9f1479d397d763c7a78c347d0c8f41c3.serveo.net/ig-flowdata', formData);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const renderTypeSpecificFields = (node, index) => {
    switch (node.type) {
      case 'generic':
        return (
          <>
            <input
              type="text"
              name="title"
              value={node.title || ''}
              onChange={(e) => handleChange(e, index, 'nodes')}
              placeholder="Title"
            />
            <input
              type="text"
              name="subtitle"
              value={node.subtitle || ''}
              onChange={(e) => handleChange(e, index, 'nodes')}
              placeholder="Subtitle"
            />
            <input
              type="url"
              name="url"
              value={node.url || ''}
              onChange={(e) => handleChange(e, index, 'nodes')}
              placeholder="URL"
            />
            <input
              type="url"
              name="image_url"
              value={node.image_url || ''}
              onChange={(e) => handleChange(e, index, 'nodes')}
              placeholder="Image URL"
            />
          </>
        );
      case 'button':
      case 'quick_replies':
        return (
          <>
            <input
              type="text"
              name="body"
              value={node.body || ''}
              onChange={(e) => handleChange(e, index, 'nodes')}
              placeholder="Body"
            />
            {node.type === 'link' && (
              <input
                type="url"
                name="url"
                value={node.url || ''}
                onChange={(e) => handleChange(e, index, 'nodes')}
                placeholder="URL"
              />
            )}
          </>
        );
      case 'string':
      case 'input':
        return (
          <input
            type="text"
            name="body"
            value={node.body || ''}
            onChange={(e) => handleChange(e, index, 'nodes')}
            placeholder="Body"
          />
        );
      default:
        return null;
    }
  };

  const renderPersMenuFields = (item, index) => {
    return (
      <>
        <input
          type="text"
          name="body"
          value={item.body || ''}
          onChange={(e) => handleChange(e, index, 'pers_menu')}
          placeholder="Body"
        />
        <select
          name="type"
          value={item.type || ''}
          onChange={(e) => handleChange(e, index, 'pers_menu')}
        >
          <option value="">Select Type</option>
          <option value="text">Text</option>
          <option value="link">Link</option>
        </select>
        {item.type === 'link' && (
          <input
            type="url"
            name="reply"
            value={item.reply || ''}
            onChange={(e) => handleChange(e, index, 'pers_menu')}
            placeholder="URL"
          />
        )}
      </>
    );
  };

  const renderIceBreakerFields = (item, index) => {
    return (
      <input
        type="text"
        name="body"
        value={item.body || ''}
        onChange={(e) => handleChange(e, index, 'ice_breakers')}
        placeholder="Body"
      />
    );
  };

  const renderReplyFields = () => {
    return (
      <>
        <input
          type="text"
          name="to_mentions"
          value={formData.reply.to_mentions || ''}
          onChange={(e) => setFormData({ ...formData, reply: { ...formData.reply, to_mentions: e.target.value } })}
          placeholder="To Mentions"
        />
        <input
          type="text"
          name="to_comments"
          value={formData.reply.to_comments || ''}
          onChange={(e) => setFormData({ ...formData, reply: { ...formData.reply, to_comments: e.target.value } })}
          placeholder="To Comments"
        />
        <input
          type="text"
          name="to_private"
          value={formData.reply.to_private || ''}
          onChange={(e) => setFormData({ ...formData, reply: { ...formData.reply, to_private: e.target.value } })}
          placeholder="To Private"
        />
      </>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formData.nodes.map((node, index) => (
          <div key={node.id}>
            <select
              name="type"
              value={node.type}
              onChange={(e) => handleChange(e, index, 'nodes')}
            >
              <option value="">Select Type</option>
              {nodeTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {renderTypeSpecificFields(node, index)}
          </div>
        ))}
        <button type="button" onClick={addNode}>
          Add Node
        </button>
        <hr />
        {formData.ice_breakers.map((item, index) => (
          <div key={item.id}>
            {renderIceBreakerFields(item, index)}
          </div>
        ))}
        <button type="button" onClick={addIceBreaker}>
          Add Ice Breaker
        </button>
        <hr />
        {formData.pers_menu.map((item, index) => (
          <div key={index}>
            {renderPersMenuFields(item, index)}
          </div>
        ))}
        <button type="button" onClick={addPersMenu}>
          Add Persistent Menu Item
        </button>
        <hr />
        {renderReplyFields()}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InstaCards;




