import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Message } from 'ai/react';
import MarkdownParser from './MarkdownParser';

const CollapsibleMessages = ({ messages }: { messages: Message[] }) => {
  const title = 'Past versions';

  // TODO: Sort message from last to first
  const sortedMesages = [];

  return (
    <>
      <h3 className='mb-4 text-xl font-medium'>
        {title}
      </h3>
      <Accordion.Root
        className="bg-mauve6"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        {messages.map(({ id, content }) => (
          <Accordion.Item value={id} className='mb-6'>
            <Accordion.Header>
              <Accordion.Trigger>
                {`[${id}] ${content.split('\n')[0]}`}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <div className='text-sm'>
                <MarkdownParser content={content} />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
};

export default CollapsibleMessages;
