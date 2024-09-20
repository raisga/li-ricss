import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Message } from 'ai/react';
import MarkdownParser from './MarkdownParser';

const CollapsibleMessages = ({ messages = [] }: { messages: Message[] }) => {
  const title = 'Past versions';
  const sortedMesages = messages.reverse();

  return (
    <>
      <h3 className='mb-4 text-xl font-medium'>
        {title}
      </h3>
      <Accordion.Root
        type="single"
        defaultValue="item-1"
        collapsible
      >
        {sortedMesages.map(({ id, content }) => (
          <Accordion.Item value={id} className='mb-6 bg-white p-5 border rounded-lg'>
            <Accordion.Header>
              <Accordion.Trigger>
                {`[${id}] ${content.split('\n')[0]}`}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className='text-sm m-4'>
              <MarkdownParser content={content} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
};

export default CollapsibleMessages;
