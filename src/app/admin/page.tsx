import { Col, Container, Row } from 'react-bootstrap';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { Contact } from '@/lib/validationSchemas';
import { Note } from '@prisma/client';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const owner = session?.user!.email ? session.user.email : '';
  const contacts: Contact[] = await prisma.contact.findMany({});
  const notes: Note[] = await prisma.note.findMany({
      where: {
        owner,
      }
    });
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
          <Col>
          <h2 className='text-center'>Contacts (Admin)</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact) => (
              <Col key={contact.firstName + contact.lastName}>
                <ContactCardAdmin contact={contact} 
                notes={notes.filter(note => (note.contactId === contact.id))}/>
              </Col>
            ))}
          </Row>
          </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default AdminPage;
