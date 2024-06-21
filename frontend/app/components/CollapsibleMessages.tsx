import React from 'react';
import Collapsible from 'react-collapsible';
import { Message } from 'ai/react';
import MarkdownParser from './MarkdownParser';

// TODO: Replace with Accordion component in the future
// https://www.radix-ui.com/primitives/docs/components/accordion
const CollapsibleMessages = ({ messages }: { messages: Message[] }) => {
  const title = 'Past versions';
  return (
    <div>
      <h3 style={{ fontSize: '1.5rem', color: '#222', marginBottom: '1rem' }}>{title}</h3>
      {messages.map(({ id, content }) => (
        <Collapsible 
          key={id} 
          trigger={id} 
          transitionTime={100} 
          style={{ marginBottom: '1rem', backgroundColor: '#f5f5f5', margin: '0.5rem' }}
        >
          <div style={{ backgroundColor: '#f5f5f5', margin: '0.5rem' }}>
            <MarkdownParser content={content} />
          </div>
        </Collapsible>
      ))}
    </div>
  );
};

export default CollapsibleMessages;
