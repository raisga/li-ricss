import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Message } from 'ai/react';
import MarkdownParser from './MarkdownParser';

const CollapsibleMessages = ({ messages }: { messages: Message[] }) => {
  const title = 'Past versions';
  return (
    <div>
      <h3 style={{ fontSize: '1.5rem', color: '#222', marginBottom: '1rem' }}>{title}</h3>
      <Accordion.Root
        className="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        {messages.map(({ id, content }) => (
          <Accordion.Item value={id}>
            <Accordion.Header>
              <Accordion.Trigger>
                <p>{id}</p>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
            <div style={{ backgroundColor: '#f5f5f5', margin: '0.5rem' }}>
                      <MarkdownParser content={content} />
                    </div>
              </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default CollapsibleMessages;
