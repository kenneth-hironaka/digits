'use client';
import { Contact } from '@/lib/validationSchemas';
import { Card, Image } from 'react-bootstrap';

/* Renders a contact card. See list/page.tsx. */
const ContactCardAdmin = ({ contact }: { contact: Contact }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} alt="Contact Image" width={75} />
      <Card.Title>
        {contact.firstName}
        &nbsp;
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <p className='blockquote-footer'>{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
